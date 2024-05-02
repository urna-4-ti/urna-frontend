"use client";
import { Input } from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import bottomCircle from "@/img/bottom-circle.svg";
import bottomCloud from "@/img/bottom-cloud.svg";
import iconBack from "@/img/icon-back.svg";
import logoUrna from "@/img/logo.svg";
import topCloud from "@/img/top-cloud.svg";
import { getCandidateId } from "@/requests/candidate/findAll";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type formProps, schema } from "./page";

export default function Home({ params }: { params: { id: string } }) {
	const { data: candidate } = useQuery({
		queryKey: ["get-candidate-id", params.id],
		queryFn: () => getCandidateId(params.id),
	});

	const {
		handleSubmit,
		register,
		watch,
		setValue,
		formState: { errors },
	} = useForm<formProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
		defaultValues: {
			name: candidate?.name,
			photo: [],
			politicalPartyId: "",
			description: "",
		},
	});

	const [selectValue, setSelectValue] = useState<string>(
		candidate?.name as string,
	);

	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

	const [value, setValueLength] = useState<string>();

	const router = useRouter();

	const image = watch("photo")[0];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		if (newValue.length > 5) {
			setValueLength(newValue.substring(0, 5));
		} else {
			setValueLength(newValue);
		}
	};

	const handleForm = () => {
		console.log("teste");
	};

	return (
		<main id="main">
			<div id="leftDiv">
				<Image src={logoUrna} alt="" id="logo" />
			</div>
			<div id="rightDiv">
				<Image id="topCloud" src={topCloud} alt="" />
				<Image id="bottomCloud" src={bottomCloud} alt=""></Image>
				<Image id="bottomCircle" src={bottomCircle} alt=""></Image>

				<button
					id="cancelButtonIcon"
					onClick={() => {
						router.back();
					}}
				>
					<Image src={iconBack} alt="Icone botão voltar"></Image>
				</button>

				<form
					action=""
					id="registerEleitor"
					onSubmit={handleSubmit(handleForm)}
				>
					<h1>Editar Candidato</h1>

					<button
						type="button"
						id="cancelButtonIcon"
						onClick={() => {
							router.back();
						}}
					>
						<Image src={iconBack} alt="Icone botão voltar" />
					</button>

					<Input label="Nome" type="text" {...register("name")} required />
					{errors.name?.message ? (
						<p id="err" className="text-red-600 text-sm relative">
							{errors.name.message}
						</p>
					) : (
						""
					)}

					<Input
						label="Número"
						defaultValue={candidate?.cod}
						type="number"
						value={value}
						{...register("codNum", { valueAsNumber: true })}
						onChange={handleChange}
					/>
					{errors.codNum?.message ? (
						<p id="err" className="text-red-600 text-sm">
							{errors.codNum?.message}
						</p>
					) : (
						""
					)}

					<Input
						label="Descrição"
						type="textarea"
						{...register("description")}
						required
					/>

					<label htmlFor="inputImg" id="labelImg">
						<>
							<input
								id="inputImg"
								type="file"
								{...register("photo")}
								accept="image/*"
							/>
							<Image
								id="newImage"
								src={`http://localhost:4000/public/${candidate?.picPath}`}
								alt="new preview"
								fill
							/>
						</>
					</label>
					<div id="divButton">
						<button type="submit">Cadastrar</button>

						<button
							type="button"
							id="cancelButton"
							onClick={() => setModalIsOpen(!modalIsOpen)}
						>
							Desvincular
						</button>

						<Modal
							isOpen={modalIsOpen}
							onClose={() => setModalIsOpen(!modalIsOpen)}
							text="Deseja realmente desvincular este candidato?"
						/>
					</div>
				</form>
			</div>
		</main>
	);
}
