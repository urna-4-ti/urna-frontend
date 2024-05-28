/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { deletePoliticalParty } from "@/requests/politicalPart/delete";
import { editPoliticalParty } from "@/requests/politicalPart/edit";
import { getPoliticalPartyId } from "@/requests/politicalPart/findAll";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import image from "next/image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import react, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
	name: z
		.string()
		.min(3, "*O nome de partido deve conter pelo menos 3 caracteres."),
	class: z.string(),
	politicalTypeId: z.string(),
	photoUrl: z.any(),
});

type formProps = z.infer<typeof schema>;

const pageEditPoliticalParty = ({ params }: { params: { id: string } }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectValue, setSelectValue] = useState("");
	const [selectTypeValue, setSelectTypeValue] = useState("");
	const { data: politicalParty, refetch } = useQuery({
		queryKey: ["get-politicalParty", params.id],
		queryFn: () => getPoliticalPartyId(params.id),
		// enabled: !!params.id,
	});

	const { mutateAsync, isError } = useMutation({
		mutationKey: ["edit-politicalParty"],
		mutationFn: editPoliticalParty,
	});
	const router = useRouter();

	const { data: governmentsForms } = useQuery({
		queryKey: ["get-government-form"],
		queryFn: getGovernmentForm,
	});

	const { mutateAsync: politicalPartyDelete } = useMutation({
		mutationKey: ["delete-candidate", params.id],
		mutationFn: () => deletePoliticalParty(params.id),
	});

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
			photoUrl: [],
		},
	});

	const image = watch("photoUrl")[0];
	const hasNewImage = watch("photoUrl").length > 0;

	const handleForm = (data: formProps) => {
		const inviteForm = async () => {
			try {
				if (image) {
					await mutateAsync({
						id: params.id,
						name: data.name,
						partyClass: data.class,
						politicalTypeId: data.politicalTypeId,
						photoUrl: data.photoUrl,
					});
				} else {
					await mutateAsync({
						id: params.id,
						name: data.name,
						partyClass: data.class,
						politicalTypeId: data.politicalTypeId,
					});
				}
			} catch (error) {
				console.error(error);
			}
		};

		toast.promise(inviteForm, {
			loading: "Carregando...",
			duration: 4000,

			success: () => {
				router.back();
				return "Partido Editado";
			},

			error: "Erro ao editar o partido",

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});
	};

	const handleDelete = async () => {
		const inviteForm = async () => {
			try {
				await politicalPartyDelete();
			} catch (error) {}
		};

		toast.promise(inviteForm, {
			loading: "Carregando...",
			duration: 4000,

			success: () => {
				router.back();
				return "Candidato Removido";
			},

			error: "Erro ao remover o candidato",

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});
	};

	useEffect(() => {
		if (politicalParty?.class && politicalParty?.politicalTypeId) {
			setSelectValue(politicalParty.class);
			setSelectTypeValue(politicalParty.politicalTypeId);
		}
	}, [politicalParty]);

	useEffect(() => {
		if (politicalParty) {
			setValue("name", politicalParty.name);
			setValue("class", politicalParty.class);
			setValue("politicalTypeId", politicalParty.politicalTypeId);
		}
	}, [politicalParty, setValue]);
	return (
		<>
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
							<CardTitle className="text-4xl 2xl:text-5xl px-2 2xl:pt-10 2xl:pb-6 flex justify-between pt-6 font-normal">
								Editar Partido
								<Button variant="ghost" onClick={() => setIsOpen(true)}>
									<Trash2 className="text-red-500" />
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form
								className="space-y-2 2xl:space-y-4"
								onSubmit={handleSubmit(handleForm)}
							>
								<div className="space-y-1">
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
										defaultValue={politicalParty?.name}
										{...register("name")}
										required
									/>
								</div>

								<div className="space-y-1.5">
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
										defaultValue={politicalParty?.class}
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
												<SelectLabel className="2xl:text-xl">
													Turmas
												</SelectLabel>
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
								</div>

								<div className="space-y-1.5">
									<Label
										className="text-lg 2xl:text-xl font-normal text-muted-foreground"
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
										required
									>
										<SelectTrigger
											className="h-[40px] 2xl:h-[48px] 2xl:text-xl border-black focus:border-primary text-base text-muted-foreground"
											id="select1"
										>
											<SelectValue placeholder="Selecione uma Forma de Governo" />
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
													{...register("photoUrl")}
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
													{...register("photoUrl")}
												/>
												<div className="w-full h-full flex justify-center items-center">
													<Image
														src={`http://localhost:4000/public/${politicalParty?.photoUrl}`}
														alt="Imagem input"
														className="rounded-lg object-cover"
														fill
													/>
												</div>
											</>
										)}
									</Label>
								</div>

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
			<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
				<AlertDialogContent className="bg-white">
					<AlertDialogHeader>
						<AlertDialogTitle>
							Você realmente tem certeza disso?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Você está prestes a remover um Partido. Deseja realmente
							continuar?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction onClick={handleDelete}>
							Continuar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default pageEditPoliticalParty;
