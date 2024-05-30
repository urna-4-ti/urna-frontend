"use client";
/* eslint-disable react-hooks/rules-of-hooks */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import cloudBottomMid from "@/img/cloud-bottom-mid.svg";
import cloudBottomRight from "@/img/cloud-bottom-right.svg";
import cloudTopRight from "@/img/cloud-top-right.svg";
import iconBack from "@/img/icon-back.svg";
import logo from "@/img/logo-name.svg";
import { createGovernment } from "@/requests/government/create";
import { AuthStore } from "@/store/auth";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
	name: z.string().min(3, "*Informe um nome de sistema válido."),
	cod: z
		.number({ message: "*O campo deve ser um número." })
		.min(2, "*O campo deve conter 2 digitos."),
	description: z
		.string({ message: "*Este campo ainda não foi preenchido." })
		.min(3, "*A sua descrição é muito curta."),
});

type formProps = z.infer<typeof schema>;

const pageCreateGovernment = () => {
	const [parent] = useAutoAnimate();
	const [valueInput, setValueInput] = useState("");

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

	const { mutateAsync, isError } = useMutation({
		mutationKey: ["createGovernment"],
		mutationFn: createGovernment,
	});

	const handleForm = async (data: formProps) => {
		// console.log(data);
		const inviteForm = async () => {
			try {
				await mutateAsync({
					name: data.name,
					cod: data.cod,
					description: data.description,
				});
			} catch (error) {
				console.log(error);
			}
		};

		toast.promise(inviteForm, {
			loading: "Carregando...",
			duration: 4000,

			success: () => {
				router.back();
				return "Sistema de Governo Registrado";
			},

			error: "Erro ao registrar o Sistema de Governo",

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});
	};

	const router = useRouter();
	return (
		<main className="grid grid-cols-3 mx-auto min-h-screen">
			<div className="bg-primary py-16 p-16">
				<Image src={logo} alt="Logo da IFUrna" />
			</div>
			<div className="col-span-2 relative flex justify-center items-center">
				<Image
					className="absolute top-0 right-0 select-none"
					src={cloudTopRight}
					alt="Nuvem direita-cima"
				/>
				<Image
					className="absolute bottom-0 right-0 select-none"
					src={cloudBottomRight}
					alt="Nuvem direita-baixo"
				/>
				<Image
					className="absolute bottom-0 left-28 select-none"
					src={cloudBottomMid}
					alt="Nuvem direita-baixo"
				/>

				<div className="flex items-center px-5 absolute 2xl:top-28 top-14 left-24 2xl:left-52 select-none">
					<Button
						className="hover:bg-transparent"
						variant="ghost"
						onClick={() => router.back()}
					>
						<Image
							className="h-12 2xl:h-14 2xl:w-14 w-12"
							src={iconBack}
							alt="Ícone voltar"
						/>
					</Button>
				</div>

				<Card className="2xl:w-[38rem] w-[30rem]  shadow-xl fixed">
					<CardHeader>
						<CardTitle className="text-4xl 2xl:text-5xl px-2 2xl:pt-10 2xl:pb-6 pt-6 font-normal">
							Cadastrar Sistema de Governo
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form
							className="space-y-2 2xl:space-y-4 mplus"
							onSubmit={handleSubmit(handleForm)}
						>
							<div className="space-y-2.5" ref={parent}>
								<Label
									className="text-base 2xl:text-lg font-normal text-muted-foreground"
									htmlFor="name"
								>
									Nome
								</Label>
								<Input
									className="2xl:h-[48px] h-[40px] 2xl:text-xl border-black focus:border-primary 2xl:placeholder:text-lg"
									id="name"
									type="text"
									placeholder="Digite o nome do sistema de governo..."
									{...register("name")}
								/>
								{errors.name && (
									<p className="text-red-500 text-sm">{errors.name.message}</p>
								)}
							</div>

							<div className="space-y-1.5" ref={parent}>
								<Label
									className="text-base 2xl:text-lg font-normal text-muted-foreground"
									htmlFor="cod"
								>
									Código
								</Label>
								<Input
									className="2xl:h-[48px] h-[40px] 2xl:text-xl border-black focus:border-primary 2xl:placeholder:text-lg"
									id="cod"
									type="number"
									placeholder="Digite o código do sistema de governo..."
									value={valueInput}
									{...register("cod", { valueAsNumber: true })}
									onChange={(e) => {
										const maxLength = 2;
										const newValue = e.target.value.replace(/\D+/g, ""); // remove non-numeric characters
										if (newValue.length <= maxLength) {
											setValueInput(newValue);
										}
									}}
								/>
								{errors.cod && (
									<p className="text-red-500 text-sm">{errors.cod.message}</p>
								)}
							</div>

							<div className="space-y-1.5" ref={parent}>
								<Label
									className="text-base font-normal 2xl:text-lg text-muted-foreground"
									htmlFor="description"
								>
									Descrição
								</Label>
								<Textarea
									id="description"
									{...register("description")}
									placeholder="Digite a descrição do candidato..."
									className="border-black 2xl:text-xl 2xl:h-24 focus:border-primary resize-none text-base font-base 2xl:placeholder:text-lg"
								/>
								{errors.description && (
									<p className="text-red-500 text-sm">
										{errors.description.message}
									</p>
								)}
							</div>
							<div className="flex justify-center 2xl:py-8 py-4">
								<Button className="w-full 2xl:h-[48px] h-[42px] rounded-2xl text-lg font-bold bg-primary">
									Criar
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</main>
	);
};

export default pageCreateGovernment;
