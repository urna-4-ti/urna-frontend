"use client";
import Image from "next/image";
import topCloud from "@/img/top-cloud.svg";
import bottomCloud from "@/img/bottom-cloud.svg";
import bottomCircle from "@/img/bottom-circle.svg";
import logoUrna from "@/img/logo.svg";
import iconBack from "@/img/icon-back.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import inputImage from "@/img/uploading-icon.svg";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Input/Input";

import "./style.css";

const schema = z.object({
	name: z
		.string()
		.min(3, "*O nome de usuário deve conter pelo menos 3 caracteres."),
	matricrulation: z.string().refine((value) => value.length === 10, {
		message: "*Matrícula inválida.",
	}),
	email: z.string().email("*O campo deve ser um email válido."),
});

type formProps = z.infer<typeof schema>;

export default function Home() {
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
				<Image src={logoUrna} alt="" id="logo"></Image>
			</div>
			<div id="rightDiv">
				<Image id="topCloud" src={topCloud} alt=""></Image>
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
					<h1>Cadastrar Eleitor</h1>

					<button
						id="cancelButtonIcon"
						onClick={() => {
							router.back();
						}}
					>
						<Image src={iconBack} alt="Icone botão voltar"></Image>
					</button>

					<Input label="Nome" type="text" {...register("name")} />
					{errors.name?.message ? (
						<p id="err" className="text-red-600 text-sm">
							{errors.name.message}
						</p>
					) : (
						""
					)}

					<Input
						label="Matrícula"
						type="text"
						{...register("matricrulation")}
					/>
					{errors.name?.message ? (
						<p id="err" className="text-red-600 text-sm">
							{errors.matricrulation?.message}
						</p>
					) : (
						""
					)}

					<Input label="Email" type="email" {...register("email")} />
					{errors.name?.message ? (
						<p id="err" className="text-red-600 text-sm">
							{errors.email?.message}
						</p>
					) : (
						""
					)}

					<label htmlFor="">
						<p>Turma</p>
						<select onChange={handleChange} value={selectValue}>
							<option value="1"></option>
						</select>
					</label>

					<div id="divButton">
						<button>Cadastrar</button>
					</div>
				</form>
			</div>
		</main>
	);
}
