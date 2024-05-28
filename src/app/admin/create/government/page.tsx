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
import cloudBottomMid from "@/img/cloud-bottom-mid.svg";
import cloudBottomRight from "@/img/cloud-bottom-right.svg";
import cloudTopRight from "@/img/cloud-top-right.svg";
import iconBack from "@/img/icon-back.svg";
import logo from "@/img/logo-name.svg";
import { createGovernment } from "@/requests/government/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
	name: z.string(),
	cod: z.number().min(3),
});

type formProps = z.infer<typeof schema>;

const pageCreateGovernment = () => {
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
		const inviteForm = async () => {
			try {
				await mutateAsync({
					name: data.name,
					cod: data.cod,
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
							className="space-y-2 2xl:space-y-4"
							onSubmit={handleSubmit(handleForm)}
						>
							<div className="space-y-1.5">
								<Label
									className="text-lg 2xl:text-xl font-normal text-muted-foreground"
									htmlFor="name"
								>
									Nome
								</Label>
								<Input
									className="2xl:h-[48px] h-[40px] 2xl:text-xl border-black focus:border-primary"
									id="name"
									type="text"
									{...register("name")}
									required
								/>
							</div>

							<div className="space-y-1.5">
								<Label
									className="text-lg 2xl:text-xl font-normal text-muted-foreground"
									htmlFor="cod"
								>
									Código
								</Label>
								<Input
									className="2xl:h-[48px] h-[40px] 2xl:text-xl border-black focus:border-primary"
									id="cod"
									type="number"
									value={valueInput}
									{...register("cod", { valueAsNumber: true })}
									onChange={(e) => {
										const maxLength = 2;
										const newValue = e.target.value.replace(/\D+/g, ""); // remove non-numeric characters
										if (newValue.length <= maxLength) {
											setValueInput(newValue);
										}
									}}
									required
								/>
							</div>

							{/* <div className="space-y-1.5">
								<Label
									className="text-lg 2xl:text-xl font-normal text-muted-foreground"
									htmlFor="select1"
								>
									Turma
								</Label>
								<Select
									onValueChange={(value) => {
										setValue("class", value);
										setSelectValue(value);
									}}
									value={selectValue}
									{...register("class")}
									required
								>
									<SelectTrigger
										className="h-[40px] 2xl:h-[48px] 2xl:text-xl border-black focus:border-primary text-base text-muted-foreground"
										id="select1"
									>
										<SelectValue placeholder="Selecione uma Turma" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup className="h-28 text-sm 2xl:h-32">
											<SelectLabel className="2xl:text-xl">Turmas</SelectLabel>
											<SelectItem className="2xl:text-lg" value="Absolutista">
												Monarquia Absolutista
											</SelectItem>
                      <SelectItem className="2xl:text-lg" value="Constitucional">
												Monarquia Constitucional
											</SelectItem>
                      <SelectItem className="2xl:text-lg" value="República">
												República
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div> */}
							<div className="flex justify-center 2xl:py-8 py-4">
								<Button className="w-full 2xl:h-[48px] h-[42px] rounded-2xl text-lg font-bold bg-primary">
									Entrar
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
