"use client";
import { Input } from "@/components/Input/Input";
import bottomCircle from "@/img/bottom-circle.svg";
import bottomCloud from "@/img/bottom-cloud.svg";
import iconBack from "@/img/icon-back.svg";
import logoUrna from "@/img/logo.svg";
import topCloud from "@/img/top-cloud.svg";
import inputImage from "@/img/uploading-icon.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { classes } from "@/lib/Classes";
import { createCandidate } from "@/requests/candidate/create";
import { getPoliticalParty } from "@/requests/politicalPart/findAll";
import { useMutation, useQuery } from "@tanstack/react-query";
import "./style.css";
import { useState } from "react";
import { toast } from "sonner";

const schema = z.object({
	codNum: z.number(),
	name: z
		.string()
		.min(3, "*O nome de usuário deve conter pelo menos 3 caracteres."),
	photo: z.any(),
	politicalPartyId: z.string(),
	description: z.string().min(3, "*A sua descrição é muito curta."),
	classParty: z.string(),
});

type formProps = z.infer<typeof schema>;

export default function Home() {

	const [valueClass, setValueSelectedClass] = useState<string>("");

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
			name: "",
			photo: [],
			politicalPartyId: "",
			description: "",
		},
	});

	const classParty = watch("classParty");

	const { data: politicalParty, refetch } = useQuery({
		queryKey: ["get-politicalParty", classParty],
		queryFn: () => getPoliticalParty(classParty),
		// enabled: false,
	});

	const { mutateAsync, isError } = useMutation({
		mutationKey: ["createCandidate"],
		mutationFn: createCandidate,
	});

	const hasNewImage = watch("photo").length > 0;

	const image = watch("photo")[0];

	const router = useRouter();

	const [value, setValueLength] = useState<string>()

	const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		if (newValue.length > 5) {
			setValueLength(newValue.substring(0, 5))
		} else {
			setValueLength(newValue)
		}
	}

	const handleForm = async (data: formProps) => {
		const inviteForm = async () => {
			try {
				await mutateAsync({
					cod: data.codNum,
					name: data.name,
					picPath: data.photo,
					politicalPartyId: data.politicalPartyId,
					description: data.description,
				});
			} catch (error) {
				console.error(error);
			}
		}

		toast.promise(inviteForm, {
			loading: "Carregando...",
			duration: 4000,

			success: () => {
				router.back()
				return "Candidato Registrado"
			},

			error: "Erro ao registrar o candidato",

			style: {
				boxShadow: "1px 2px 20px 6px #555"
			}
		})
	};
	return (
		<main id="main">
			<div id="leftDiv">
				<Image src={logoUrna} alt="" id="logo" />
			</div>
			<div id="rightDiv">
				<Image id="topCloud" src={topCloud} alt="" />
				<Image id="bottomCloud" src={bottomCloud} alt="" />
				<Image id="bottomCircle" src={bottomCircle} alt="" />

				<button
					type="button"
					id="cancelButtonIcon"
					onClick={() => {
						router.back();
					}}
				>
					<Image src={iconBack} alt="Icone botão voltar" />
				</button>

				<form
					action=""
					id="registerEleitor"
					onSubmit={handleSubmit(handleForm)}
				>
					<h1>Cadastrar Candidato</h1>

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

					<label htmlFor="">
						<p>Turma</p>
						<select 
						value={watch("classParty")} 
						{...register("classParty")} 
						required>
							<option defaultValue={""}>
								Selecione uma turma
							</option>
							{classes.map((item) => (
								<option value={item.class}>{item.name}</option>
							))}
						</select>
					</label>

					<label htmlFor="">
						<p>Partido</p>
						<select {...register("politicalPartyId")} required>
							<option value="" disabled>
								Selecione um partido
							</option>
							{politicalParty &&
								politicalParty.length > 0 &&
								politicalParty?.map((item) => (
									<option value={item.id}>{item.name}</option>
								))}
						</select>
					</label>

					<Input
						label="Descrição"
						type="textarea"
						{...register("description")}
						required
					/>

					<label htmlFor="inputImg" id="labelImg">
						{hasNewImage ? (
							<>
								<input
									id="inputImg"
									type="file"
									{...register("photo")}
									accept="image/*"
								/>
								<Image
									id="newImage"
									src={URL.createObjectURL(image)}
									alt="new preview"
									width={1}
									height={1}
								/>
							</>
						) : (
							<>
								<input
									id="inputImg"
									type="file"
									{...register("photo")}
									accept="image/*"
								/>
								<Image id="uploading" src={inputImage} alt="Image Input" />
							</>
						)}
					</label>
					<div id="divButton">
						<button type="submit">Cadastrar</button>
					</div>
				</form>
			</div>
		</main>
	);
}
