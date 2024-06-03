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
import input from "@/img/input.svg";
import logo from "@/img/logo-name.svg";
import { classes } from "@/lib/Classes";
import { getGovernmentForm } from "@/requests/government/findAll";
import { createPoliticalParty } from "@/requests/politicalPart/create";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
	name: z
		.string({ message: "*Este campo ainda não foi preenchido." })
		.min(3, "*O nome de partido deve conter pelo menos 3 caracteres."),
	class: z
		.string({ message: "*Este campo ainda não foi preenchido." })
		.refine((value) => value.length > 0, {
			message: "*Este campo ainda não foi preenchido.",
		}),
	politicalTypeId: z
		.string({
			message: "*Este campo ainda não foi preenchido.",
		})
		.refine((item) => item.length > 0, {
			message: "*Este campo ainda não foi preenchido.",
		}),
	photo: z.any().optional(),
});

type formProps = z.infer<typeof schema>;

const pageCreatePoliticalParty = () => {
	const [parent] = useAutoAnimate();
	const router = useRouter();
	const [selectValue, setSelectValue] = useState("");
	const [selectTypeValue, setSelectTypeValue] = useState("");

	const {
		handleSubmit,
		register,
		watch,
		setValue,
		formState: { errors },
	} = useForm<formProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
		defaultValues: {
			photo: [],
		},
	});

	const hasNewImage = watch("photo").length > 0;
	const image = watch("photo")[0];

	const { data: governmentsForms } = useQuery({
		queryKey: ["get-government-form"],
		queryFn: getGovernmentForm,
	});

	const { mutateAsync, isError } = useMutation({
		mutationKey: ["createPoliticalParty"],
		mutationFn: createPoliticalParty,
	});

	const handleForm = (data: formProps) => {
		const inviteForm = async () => {
			const { response } = await mutateAsync({
				name: data.name,
				partyClass: data.class,
				photo: data.photo,
				politicalTypeId: data.politicalTypeId,
			});
			if (response) {
				return true;
			}
		};

		toast.promise(inviteForm, {
			loading: "Carregando...",
			duration: 4000,

			success: () => {
				router.back();
				return "Partido Registrado";
			},

			error: (error) => {
				switch (error.response.status) {
					case 500:
						return "Algum campo não foi preenchido.";
					default:
						return "Erro ao registrar o partido.";
				}
			},

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});
	};
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
							Cadastrar Partido
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
									placeholder="Digite..."
									id="name"
									type="text"
									{...register("name")}
								/>
								{errors.name && (
									<p className="text-red-500 text-sm">{errors.name.message}</p>
								)}
							</div>

							<div className="space-y-2.5" ref={parent}>
								<Label
									className="text-base 2xl:text-lg font-normal text-muted-foreground"
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
								>
									<SelectTrigger
										className="h-[40px] 2xl:h-[48px] 2xl:text-xl border-black focus:border-primary text-base text-muted-foreground"
										id="select1"
									>
										<SelectValue
											className="2xl:placeholder:text-lg"
											placeholder="Selecione uma Turma"
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectGroup className="h-28 text-sm 2xl:h-32">
											<SelectLabel className="2xl:text-xl">Turmas</SelectLabel>
											{classes.map((item) => (
												<SelectItem
													className="2xl:text-lg"
													key={item.class}
													value={item.class}
												>
													{item.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								{errors.class && (
									<p className="text-red-500 text-sm">{errors.class.message}</p>
								)}
							</div>

							<div className="space-y-2.5" ref={parent}>
								<Label
									className="text-base 2xl:text-lg font-normal text-muted-foreground"
									htmlFor="select1"
								>
									Forma de Governo
								</Label>
								<Select
									onValueChange={(value) => {
										setValue("politicalTypeId", value);
										setSelectTypeValue(value);
									}}
									value={selectTypeValue}
									{...register("politicalTypeId")}
								>
									<SelectTrigger
										className="h-[40px] 2xl:h-[48px] 2xl:text-xl border-black focus:border-primary text-base text-muted-foreground"
										id="select1"
									>
										<SelectValue
											className="2xl:placeholder:text-lg"
											placeholder="Selecione uma Forma de Governo"
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectGroup className="h-28 text-sm 2xl:h-32">
											<SelectLabel className="2xl:text-xl">
												Formas de Governo
											</SelectLabel>
											{governmentsForms?.map((item) => (
												<SelectItem
													className="2xl:text-lg"
													key={item.id}
													value={item.id}
												>
													{item.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								{errors.politicalTypeId && (
									<p className="text-red-500 text-sm">
										{errors.politicalTypeId.message}
									</p>
								)}
							</div>
							<div className="absolute bottom-20 right-[590px] 2xl:right-[800px] rounded-xl">
								<Label className=" w-[220px] h-[220px] 2xl:w-[280px] 2xl:h-[280px] bg-[#D9D9D9] cursor-pointer flex items-center justify-center rounded-xl">
									{hasNewImage ? (
										<>
											<Input
												id=""
												className="hidden"
												type="file"
												accept="image/*"
												{...register("photo")}
											/>
											<div className="w-full h-full flex justify-center items-center relative rounded-xl">
												<Image
													className="object-cover rounded-lg"
													src={URL.createObjectURL(image)}
													alt="Imagem carregada"
													fill
												/>
											</div>
										</>
									) : (
										<>
											<Input
												className="hidden"
												type="file"
												accept="image/*"
												{...register("photo")}
											/>
											<div className="w-full h-full flex justify-center items-center">
												<Image src={input} alt="Imagem input" />
											</div>
										</>
									)}
								</Label>
							</div>

							<div className="flex justify-center 2xl:py-8 py-4">
								<Button className="w-full 2xl:h-[48px] h-[42px] rounded-2xl text-lg font-bold bg-primary">
									Cadastrar
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</main>
	);
};

export default pageCreatePoliticalParty;
