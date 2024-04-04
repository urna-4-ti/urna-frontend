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

import "./style.css";
import { stringify } from "querystring";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const schema = z.object({
	name: z
		.string()
		.min(3, "*O nome de usuário deve conter pelo menos 3 caracteres."),
	numbervote: z.number(),
	email: z.string().email("*O campo deve ser um email válido."),
	description: z.string(),
});

type formProps = z.infer<typeof schema>;

export default function Home() {
	const queryClient = new QueryClient();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<formProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
	});

	const [selectValue, setSelectValue] = useState<string>("");

	const [image, setImage] = useState<string | null>(null);

	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectValue(e.target.value);
	};

	const handleForm = () => {
		console.log("a");
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

					<Input label="Nome" type="text" {...register("name")} />
					{errors.name?.message ? (
						<p id="err" className="text-red-600 text-sm">
							{errors.name.message}
						</p>
					) : (
						""
					)}

					<Input label="Número" type="number" {...register("numbervote")} />
					{errors.name?.message ? (
						<p id="err" className="text-red-600 text-sm">
							{errors.numbervote?.message}
						</p>
					) : (
						""
					)}

					<label htmlFor="">
						<p>Turma</p>
						<select onChange={handleChange} value={selectValue}>
							<option value="1" />
						</select>
					</label>

					<Input
						label="Descrição"
						type="textarea"
						{...register("description")}
					/>

					<label htmlFor="inputImg" id="labelImg">
						<input
							type="file"
							name=""
							id="inputImg"
							accept="image/*"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const file = event.target.files?.[0];
								if (file) {
									setImage(URL.createObjectURL(file));
								}
							}}
						/>
						{!image ? (
							<Image
								src={JSON.parse(stringify(inputImage))}
								alt="Imagem Input"
								id="uploading"
							/>
						) : (
							""
						)}
						{image && (
							<Image
								src={image}
								alt="teste"
								id="newImage"
								width={1}
								height={1}
							/>
						)}
					</label>
					<div id="divButton">
						<button type="submit" onClick={() => {}}>
							Cadastrar
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}
