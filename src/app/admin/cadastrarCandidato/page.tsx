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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/requests/api"

import "./style.css";
import { classes } from "@/lib/Classes";
import { useQuery } from "@tanstack/react-query";
import { getPoliticalParty } from "@/requests/politicalPart/findAll";

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


interface SelectValue {
  value: string;
}

type formProps = z.infer<typeof schema>;

export default function Home() {

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
			photo: [],
			politicalPartyId: "",
			description: "",
		}
	});

	const partysClass = watch("classParty")

	const {data: politicalParty, refetch} = useQuery({
		queryKey: ["get-politicalParty", partysClass],
		queryFn: () => getPoliticalParty(partysClass),
		enabled: false,	
	})


	const hasNewImage = watch('photo').length > 0

	const image = watch('photo')[0]

	const router = useRouter();

	const handleChange = () => {
		refetch()
		console.log(partysClass)
	}

	const handleForm = async (data: formProps) => {
		console.log(classes);
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

					<Input label="Número" type="number" {...register("codNum", {valueAsNumber: true})} />
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
						value={""}
						{...register('classParty')}
						onChange={handleChange}
						required>
							<option value="" disabled>Selecione uma turma</option>
							{classes.map(item => (
								<option value={item.class}>{item.name}</option>
							))}
						</select>
					</label>

					<label htmlFor="">
						<p>Partido</p>
						<select>
							<option value="" disabled>Selecione um partido</option>
							{politicalParty?.map(item => (
								<option value={item.politicalTypeId}>{item.name}</option>
							))}

						</select>
					</label>

					<Input
						label="Descrição"
						type="textarea"
						{...register("description")}
					/>

					<label htmlFor="inputImg" id="labelImg" tabIndex={0}>
						{hasNewImage ? (
							<>
								<input id="inputImg" type="file" {...register('photo')} accept="image/*" />
								<Image id="newImage" src={URL.createObjectURL(image)} alt="new preview" width={1} height={1} />
							</>
						) : (
							<>
								<input id="inputImg" type="file" {...register('photo')} accept="image/*"/>
								<Image id="uploading" src={inputImage} alt="Image Input"  />
							</>
						)}
						
					</label>
					<div id="divButton">
						<button type="submit">
							Cadastrar
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}
