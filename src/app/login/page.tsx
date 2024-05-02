"use client";
import { Input } from "@/components/Input/Input";
import bottomCircle from "@/img/bottom-circle.svg";
import iconBack from "@/img/icon-back.svg";
import topCloud from "@/img/top-cloud.svg";
import urnaIf from "@/img/urnaif.svg";
import { AuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
	email: z.string().email("*O campo deve ser um email"),
	password: z.string().min(6, "*Senha inválida."),
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

	const {
		actions: { login },
	} = AuthStore();

	const router = useRouter();

	const handleForm = async (data: formProps) => {
		const executeLogin = async () => {
			const cookie = await login({ ...data });

			if (cookie !== undefined) {
				return cookie;
			}
			throw new Error("Email e/ou senha incorretos!");
		};
		toast.promise(executeLogin, {
			loading: "Loading...",
			duration: 3000,

			success: (cookie) => {
				router.push(`/admin/dashboard?access_token=${cookie}`);
				return "Login efetuado";
			},
			error: "Email e/ou senha incorretos",

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});

		// console.log(data)
	};
	return (
		<main id="login">
			<div className="left-panel">
				<Image id="topLeftCloud" src={topCloud} alt="" />
				<Image id="bottomLeftCircle" src={bottomCircle} alt="" />

				<form action="POST" id="loginForm" onSubmit={handleSubmit(handleForm)}>
					<h1>Login</h1>
					<Input label="Email" type="email" {...register("email")} required />
					<Input
						label="Senha"
						type="password"
						{...register("password")}
						required
					/>

					<button type="submit">Entrar</button>
				</form>
			</div>

			<div className="right-panel">
				<Image id="urnaIf" src={urnaIf} alt="" />
			</div>
		</main>
	);
}
