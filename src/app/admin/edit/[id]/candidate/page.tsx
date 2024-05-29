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
import { Textarea } from "@/components/ui/textarea";
import cloudBottomMid from "@/img/cloud-bottom-mid.svg";
import cloudBottomRight from "@/img/cloud-bottom-right.svg";
import cloudTopRight from "@/img/cloud-top-right.svg";
import iconBack from "@/img/icon-back.svg";
import input from "@/img/input.svg";
import logo from "@/img/logo-name.svg";
import { classes } from "@/lib/Classes";
import { createCandidate } from "@/requests/candidate/create";
import { deleteCandidate } from "@/requests/candidate/delete";
import { editCandidate } from "@/requests/candidate/edit";
import { getCandidateId } from "@/requests/candidate/findAll";
import { getPoliticalParty } from "@/requests/politicalPart/findAll";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
	codNum: z.number(),
	name: z
		.string()
		.min(3, "*O nome de usuário deve conter pelo menos 3 caracteres."),
	photo: z.any(),
	politicalPartyId: z.string(),
	description: z.string().min(3, "*A sua descrição é muito curta."),
	classParty: z.string(),
});

type formProps = z.infer<typeof schema>;

const pageEditCandidate = ({ params }: { params: { id: string } }) => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const { data: candidate, isLoading } = useQuery({
		queryKey: ["get-candidate-id", params.id],
		queryFn: () => getCandidateId(params.id),
	});

	const [valueInput, setValueInput] = useState<string>("");
	const { mutateAsync, isError } = useMutation({
		mutationKey: ["edit-candidate"],
		mutationFn: editCandidate,
	});

	const { mutateAsync: candidateDel } = useMutation({
		mutationKey: ["delete-candidate", params.id],
		mutationFn: () => deleteCandidate(params.id),
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
			photo: [],
			codNum: Number(candidate?.cod),
		},
	});

	const image = watch("photo")[0];
	const hasNewImage = watch("photo").length > 0;

	const handleForm = async (data: formProps) => {
		const inviteForm = async () => {
			try {
				if (image) {
					await mutateAsync({
						id: params.id,
						name: data.name,
						cod: data.codNum,
						picPath: data.photo,
						politicalPartyId: data.politicalPartyId,
						description: data.description,
					});
				} else {
					await mutateAsync({
						id: params.id,
						name: data.name,
						cod: data.codNum,
						politicalPartyId: data.politicalPartyId,
						description: data.description,
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
				return "Candidato Editado";
			},

			error: "Erro ao editar o candidato",

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});
	};

	const handleDelete = async () => {
		const inviteForm = async () => {
			try {
				await candidateDel();
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
		if (candidate?.cod) {
			setValueInput(candidate.cod.toString());
		}
	}, [candidate]);

	useEffect(() => {
		if (candidate) {
			setValue("name", candidate.name);
			setValue("description", candidate.description);
			setValue("politicalPartyId", candidate.politicalPartyId);
			setValue("classParty", candidate.PoliticalParty.class);
		}
	}, [candidate, setValue]);
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
							<CardTitle className="text-4xl 2xl:text-5xl px-2 2xl:pt-10 2xl:pb-6 flex justify-between pt-6 font-normal">
								Editar Candidato
								<Button variant="ghost" onClick={() => setIsOpen(true)}>
									<Trash2 className="text-red-500" />
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form
								className="space-y-2 2xl:space-y-4 mplus"
								onSubmit={handleSubmit(handleForm)}
							>
								<div className="space-y-1">
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
										defaultValue={candidate?.name}
										{...register("name")}
									/>
								</div>
								<div className="space-y-1.5">
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
										defaultValue={candidate?.cod?.toString()}
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
										required
									/>
								</div>
								<div className="space-y-1.5">
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
										defaultValue={candidate?.description}
										className="border-black 2xl:text-xl 2xl:h-24 focus:border-primary resize-none text-base font-base"
									/>
								</div>

								<div className="absolute bottom-28 2xl:bottom-44 2xl:right-[810px] right-[580px]">
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
													{candidate?.picPath ? (
														<Image
															src={`http://localhost:4000/public/${candidate.picPath}`}
															alt="Imagem input"
															className="rounded-lg object-cover"
															fill
														/>
													) : (
														<Image
															src={input}
															alt="Imagem input"
															className="rounded-lg object-cover"
															fill
														/>
													)}
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
							Você está prestes a remover um candidato. Deseja realmente
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

export default pageEditCandidate;
