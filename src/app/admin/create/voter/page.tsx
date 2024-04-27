"use client";
import { Input } from "@/components/Input/Input";
import bottomCircle from "@/img/bottom-circle.svg";
import bottomCloud from "@/img/bottom-cloud.svg";
import iconBack from "@/img/icon-back.svg";
import logoUrna from "@/img/logo.svg";
import topCloud from "@/img/top-cloud.svg";
import inputImage from "@/img/uploading-icon.svg";
import { classes } from "@/lib/Classes";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createVoter } from "@/requests/voter/create";
import { useMutation } from "@tanstack/react-query";
import "./style.css";
import { toast } from "sonner";
import { AuthStore } from "@/store/auth";

const schema = z.object({
	name: z
		.string()
		.min(3, "*O nome de usuário deve conter pelo menos 3 caracteres."),
	enrollment: z.string().refine((value) => value.length === 10, {
		message: "*Matrícula inválida.",
	}),
	email: z.string().email("*O campo deve ser um email válido."),
	class: z.enum([
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
		"ADMIN",
	]),
});

type formProps = z.infer<typeof schema>;

export default function Home() {
	const [valueClass, setValueSelectedClass] = useState<string>("");

	const {
		handleSubmit,
		register,
		formState: { errors },
		watch,
	} = useForm<formProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
			enrollment: "",
			name: "",
		},
	});

	const router = useRouter();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["create voter"],
		mutationFn: createVoter,
		onSuccess: () => {
			console.log("!!!!!!!!!!!success!!!!!!!!");
		},
	});
	const handleForm = async (data: formProps) => {
		const inviteForm = async () => {
			try {
				await mutateAsync({
					name: data.name,
					email: data.email,
					password: data.enrollment,
					role: "VOTER",
					enrollment: data.enrollment,
					class: data.class,
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
				return "Eleitor Registrado";
			},

			error: "Erro ao registrar o eleitor",

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
						router.push("/admin/dashboard");
					}}
				>
					<Image src={iconBack} alt="Icone botão voltar" />
				</button>

				<form id="registerEleitor" onSubmit={handleSubmit(handleForm)}>
					<h1>Cadastrar Eleitor</h1>

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
					<Input label="Email" type="email" {...register("email")} />
					{errors.name?.message ? (
						<p id="err" className="text-red-600 text-sm">
							{errors.email?.message}
						</p>
					) : (
						""
					)}

					<Input
						label="Matrícula"
						type="text"
						{...register("enrollment")}
						maxLength={10}
						min={10}
					/>
					{errors.name?.message ? (
						<p id="err" className="text-red-600 text-sm">
							{errors.enrollment?.message}
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

					<div id="divButton">
						<button type="submit">
							{isPending ? "Cadastrando..." : "Cadastrar"}
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}
