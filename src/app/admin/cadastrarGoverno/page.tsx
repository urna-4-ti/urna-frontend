"use client";
import Image from "next/image";
import topCloud from "@/img/top-cloud.svg";
import bottomCloud from "@/img/bottom-cloud.svg";
import bottomCircle from "@/img/bottom-circle.svg";
import logoUrna from "@/img/logo.svg";
import iconBack from "@/img/icon-back.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Input/Input";

import "./style.css";

const schema = z.object({
	name: z
		.string()
		.refine((value) => value !== "", { message: "Selecione uma opção." }),
	number: z.number(),
	code: z.number(),
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
					id="registerGoverno"
					onSubmit={handleSubmit(handleForm)}
				>
					<h1>Cadastrar Governo</h1>

					<label htmlFor="">
						<p>Nome</p>

						<select value={selectValue} {...register("name")}>
							<option value="">Selecione</option>

						<select name="name">
							<option value="" disabled>
								Selecione
							</option>

							<option value="Absolutista">Monarquia Absolutista</option>
							<option value="Constitucional">Monarquia Constitucional</option>
							<option value="Repúblicas">República</option>
						</select>
					</label>
					{errors.name?.message ? (
						<p className="text-red-600 text-sm">{errors.name.message}</p>
					) : (
						""
					)}

					<Input label="Número" type="text" {...register("number")} />
					{errors.name?.message ? (
						<p className="text-red-600 text-sm">{errors.number?.message}</p>
					) : (
						""
					)}

					<Input label="Código" type="text" {...register("code")} />
					{errors.name?.message ? (
						<p className="text-red-600 text-sm">{errors.code?.message}</p>
					) : (
						""
					)}

					<div id="divButton">
						<button>Cadastrar</button>
					</div>
				</form>
			</div>
		</main>
	);
}
