/* eslint-disable react-hooks/rules-of-hooks */
"use client";
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
import input from "@/img/input.svg";
import logo from "@/img/logo-name.svg";
import { classes } from "@/lib/Classes";
import { createCandidate } from "@/requests/candidate/create";
import { getPoliticalParty } from "@/requests/politicalPart/findAll";
import { AuthStore } from "@/store/auth";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
	codNum: z.number({ message: "*Este campo ainda não foi preenchido." }),
	name: z
		.string({ message: "*Este campo ainda não foi preenchido." })
		.min(3, "*O nome de usuário deve conter pelo menos 3 caracteres."),
	photo: z.any().optional(),
	politicalPartyId: z
		.string({
			message: "*Este campo ainda não foi preenchido.",
		})
		.refine((value) => value.length > 0, {
			message: "*Este campo ainda não foi preenchido.",
		}),
	description: z
		.string({ message: "*Este campo ainda não foi preenchido." })
		.min(3, "*A sua descrição é muito curta."),
	classParty: z
		.string({
			message: "*Este campo ainda não foi preenchido.",
		})
		.refine((value) => value.length > 0, {
			message: "*Este campo ainda não foi preenchido.",
		}),
});

type formProps = z.infer<typeof schema>;

const addCandidate = () => {
	const [parent] = useAutoAnimate();
	const [selectValue, setSelectValue] = useState("");
	const [valueInput, setValueInput] = useState("");
	const [selectClassValue, setSelectClassValue] = useState("");
	const router = useRouter();

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
			name: "",
			photo: [],
			description: "",
			classParty: "",
			politicalPartyId: "",
		},
	});

	const { data: politicalParty, refetch } = useQuery({
		queryKey: ["get-politicalParty", selectValue],
		queryFn: () => getPoliticalParty(selectValue),
		enabled: !!selectValue,
	});

	const hasNewImage = watch("photo").length > 0;

	const image = watch("photo")[0];

	const { mutateAsync, isError } = useMutation({
		mutationKey: ["createCandidate"],
		mutationFn: createCandidate,
	});

	const handleForm = async (data: formProps) => {
		const inviteForm = async () => {
			const { response } = await mutateAsync({
				cod: Number(data.codNum),
				name: data.name,
				picPath: data.photo,
				politicalPartyId: data.politicalPartyId,
				description: data.description,
			});
			if (response) {
				return true;
			}
		};

		toast.promise(inviteForm(), {
			loading: "Carregando...",
			duration: 4000,

			success: () => {
				router.back();
				return "Candidato Registrado";
			},

			error: (error) => {
				let result = "";
				switch (error.response.status) {
					case 500:
						result = "Algum campo não foi preenchido.";
						return result;
					case 403:
						result = "O número de código inserido é inválido.";
						return result;
					default:
						result = "Erro ao registrar o candidato.";
						return result;
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

				<div className="flex items-center px-5 absolute 2xl:top-28 top-14 left-24 2xl:left-52">
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
							Cadastrar Candidato
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form
							className="space-y-2 2xl:space-y-4 mplus"
							onSubmit={handleSubmit(handleForm)}
						>
							<div className="space-y-1" ref={parent}>
								<Label
									className="text-base 2xl:text-lg font-normal text-muted-foreground"
									htmlFor="name"
								>
									Nome
								</Label>
								<Input
									className="2xl:h-[48px] h-[40px] 2xl:text-xl border-black focus:border-primary"
									id="name"
									type="text"
									{...register("name")}
									placeholder="Digite..."
								/>
								{errors.name && (
									<p className="text-red-500 text-sm">{errors.name.message}</p>
								)}
							</div>
							<div className="space-y-1.5" ref={parent}>
								<Label
									className="text-base 2xl:text-lg font-normal text-muted-foreground"
									htmlFor="number"
								>
									Número
								</Label>
								<Input
									className="2xl:h-[48px] 2xl:text-xl h-[40px] border-black focus:border-primary"
									id="number"
									type="number"
									placeholder="Digite um número..."
									value={valueInput}
									{...register("codNum", {
										valueAsNumber: true,
									})}
									onChange={(e) => {
										const maxLength = 4;
										const newValue = e.target.value.replace(/\D+/g, ""); // remove non-numeric characters
										if (newValue.length <= maxLength) {
											setValueInput(newValue);
										}
									}}
								/>
								{errors.codNum && (
									<p className="text-red-500 text-sm">
										{errors.codNum.message}
									</p>
								)}
							</div>
							<div className="space-y-1.5" ref={parent}>
								<Label
									className="text-base 2xl:text-lg font-normal text-muted-foreground"
									htmlFor="select1"
								>
									Turma
								</Label>
								<Select
									onValueChange={(value) => {
										setValue("classParty", value);
										setSelectValue(value);
									}}
									value={selectValue}
									{...register("classParty")}
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
								{errors.classParty && (
									<p className="text-red-500 text-sm">
										{errors.classParty.message}
									</p>
								)}
							</div>
							<div className="space-y-1.5" ref={parent}>
								<Label
									className="text-base 2xl:text-lg font-normal text-muted-foreground"
									htmlFor="select2"
								>
									Partido
								</Label>
								<Select
									onValueChange={(value) => {
										setValue("politicalPartyId", value);
										setSelectClassValue(value);
									}}
									value={selectClassValue}
									{...register("politicalPartyId")}
								>
									<SelectTrigger
										className="h-[40px] 2xl:h-[48px] 2xl:text-xl border-black focus:border-primary text-base text-muted-foreground"
										id="select2"
									>
										<SelectValue
											className="2xl:placeholder:text-lg"
											placeholder="Selecione um Partido"
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectGroup className="h-28 text-sm 2xl:h-32">
											<SelectLabel className="2xl:text-xl">
												Partidos
											</SelectLabel>
											{politicalParty?.map((item) => (
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
								{errors.politicalPartyId && (
									<p className="text-red-500 text-sm">
										{errors.politicalPartyId.message}
									</p>
								)}
							</div>
							<div className="space-y-1.5" ref={parent}>
								<Label
									className="text-base 2xl:text-lg font-normal text-muted-foreground"
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
									<p className="text-red-500 text-sm	">
										{errors.description.message}
									</p>
								)}
							</div>

							<div className="absolute bottom-48 2xl:right-[810px] right-[580px]">
								<Label className="2xl:w-[280px] 2xl:h-[280px] w-[230px] h-[230px] bg-[#D9D9D9] cursor-pointer flex items-center justify-center border rounded-xl">
									{hasNewImage ? (
										<>
											<Input
												id=""
												className="hidden"
												type="file"
												accept="image/*"
												{...register("photo")}
											/>
											<div className="w-full h-full flex justify-center items-center relative rounded-lg">
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

export default addCandidate;
