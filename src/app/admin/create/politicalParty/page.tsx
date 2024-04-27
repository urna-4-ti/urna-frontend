"use client";
import { Input } from "@/components/Input/Input";
import bottomCircle from "@/img/bottom-circle.svg";
import bottomCloud from "@/img/bottom-cloud.svg";
import iconBack from "@/img/icon-back.svg";
import logoUrna from "@/img/logo.svg";
import topCloud from "@/img/top-cloud.svg";
import inputImage from "@/img/uploading-icon.svg";
import { classes } from "@/lib/Classes";
import { getGovernmentForm } from "@/requests/government/findAll";
import { createPoliticalParty } from "@/requests/politicalPart/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./style.css";
import { toast } from "sonner";

const schema = z.object({
	name: z
		.string()
		.min(3, "*O nome de partido deve conter pelo menos 3 caracteres."),
	description: z.string(),
	class: z.enum([
		"",
		"TI_1",
		"TI_2",
		"TI_3",
		"TI_4",
		"TQ_1",
		"TQ_2",
		"TQ_3",
		"TQ_4",
		"TMA_1",
		"TMA_2",
		"TMA_3",
		"TMA_4",
		"TA_1",
		"TA_2",
		"TA_3",
		"TA_4",
	]),
	politicalTypeId: z.string(),
	photo: z.any(),
});

type formProps = z.infer<typeof schema>;

export default function Home() {
	const { data: governmentsForms } = useQuery({
		queryKey: ["get-government-form"],
		queryFn: getGovernmentForm,
	});

	const { mutateAsync, isError } = useMutation({
		mutationKey: ["createPoliticalParty"],
		mutationFn: createPoliticalParty,
	});

	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<formProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
		defaultValues: {
			name: "",
			description: "",
			class: "",
			politicalTypeId: "",
			photo: [],
		},
	});

	const [valueClass, setValueSelectedClass] = useState<string>("");
	const [valueGovernmentType, setValueGovernmentType] = useState<string>("");

	const hasNewImage = watch("photo").length > 0;
	const image = watch("photo")[0];

	const router = useRouter();

	const handleForm = async (data: formProps) => {
		const inviteForm = async () => {
			try {
				await mutateAsync({
					name: data.name,
					partyClass: data.class,
					photo: data.photo,
					politicalTypeId: data.politicalTypeId,
				});
			} catch (error) {
				console.error(error);
			}
		};

		toast.promise(inviteForm, {
			loading: "Carregando...",
			duration: 4000,

			success: () => {
				router.back();
				return "Partido Registrado";
			},

			error: "Erro ao registrar o partido",

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});
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
					<h1>Cadastrar Partido</h1>

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
						<p id="err" className="text-red-600 text-sm">
							{errors.name.message}
						</p>
					) : (
						""
					)}

					<label htmlFor="">
						<p>Turma</p>
						<select
							value={valueClass}
							{...register("class")}
							onChange={(e) => setValueSelectedClass(e.target.value)}
							required
						>
							<option value="" disabled>
								Selecione uma turma
							</option>
							{classes.map((item) => (
								<option value={item.class}>{item.name}</option>
							))}
						</select>
					</label>
					<label htmlFor="">
						<p>Forma de Governo</p>
						<select
							value={valueGovernmentType}
							id=""
							{...register("politicalTypeId")}
							onChange={(e) => setValueGovernmentType(e.target.value)}
							required
						>
							<option value="" disabled>
								Selecione uma forma de governo
							</option>
							{governmentsForms?.map((item) => (
								<option value={item.id}>{item.name}</option>
							))}
						</select>
					</label>

					<Input label="Descrição" type="text" {...register("description")} />

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
									required
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
