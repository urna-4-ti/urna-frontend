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
import { createGovernment } from "@/requests/government/create";
import { useMutation } from "@tanstack/react-query";

const schema = z.object({
	name: z.string(),
	cod: z.number().min(3),
});

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
	});

	const [selectValue, setSelectValue] = useState<string>("");

	const router = useRouter();

	const { mutateAsync, isError } = useMutation({
		mutationKey: ["createGovernment"],
		mutationFn: createGovernment,
	});

	const handleForm = async (data: formProps) => {
		// Check if the name property is set
		if (!data.name) {
			console.error("Name property is required");
			return;
		}

		// Check if the cod property is a valid number
		if (typeof data.cod !== "number" || isNaN(data.cod)) {
			console.error("Cod property must be a valid number");
			return;
		}

		try {
			await mutateAsync({
				name: data.name,
				cod: data.cod,
			});
		} catch (error) {
			console.log(error);
		}
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
						<select value={watch("name")} {...register("name")} name="name">
							<option value="" id="placeholderSelect">
								Selecione
							</option>
							<option value="Absolutista">Monarquia Absolutista</option>
							<option value="Constitucional">Monarquia Constitucional</option>
							<option value="Repúblicas">República</option>
						</select>
					</label>
					{errors.name?.message ? (
						<p id="err" className="text-red-600 text-sm">
							{errors.name.message}
						</p>
					) : (
						""
					)}

					<Input
						label="Número"
						type="number"
						{...register("cod", { valueAsNumber: true })}
					/>
					{errors.name?.message ? (
						<p id="err" className="text-red-600 text-sm">
							{errors.cod?.message}
						</p>
					) : (
						""
					)}

					<div id="divButton">
						<button type="submit">Cadastrar</button>
					</div>
				</form>
			</div>
		</main>
	);
}
