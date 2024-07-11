"use client";
/* eslint-disable react-hooks/rules-of-hooks */
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
import cloudBottomMid from "@/img/cloud-bottom-mid.svg";
import cloudBottomRight from "@/img/cloud-bottom-right.svg";
import cloudTopRight from "@/img/cloud-top-right.svg";
import iconBack from "@/img/icon-back.svg";
import logo from "@/img/logo-name.svg";
import { getFromLocalStorage } from "@/requests/api";
import { deleteGovernment } from "@/requests/government/delete";
import { editGovernment } from "@/requests/government/edit";
import { getGovernmentFormId } from "@/requests/government/findAll";
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
	name: z.string(),
	cod: z.number().min(3),
});

type formProps = z.infer<typeof schema>;

const pageEditGovernment = ({ params }: { params: { id: string } }) => {
	const [isAlert, setIsAlert] = useState(false);
	const router = useRouter();

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
		mutationKey: ["edit-government"],
		mutationFn: editGovernment,
	});
	const storage = JSON.parse(getFromLocalStorage() as string);
	const token = storage?.state?.state?.user?.token;

	if (!token) {
		console.error("Authorization token not found in local storage");
		return null;
	}

	const { data: government } = useQuery({
		queryKey: ["get-government", params.id],
		queryFn: () => getGovernmentFormId(params.id, token),
	});

	const { mutateAsync: governmentDelete } = useMutation({
		mutationKey: ["delete-government", params.id],
		mutationFn: () => deleteGovernment(params.id),
	});

	const handleDelete = async () => {
		const inviteForm = async () => {
			try {
				await governmentDelete();
			} catch (error) {}
		};

		toast.promise(inviteForm, {
			loading: "Carregando...",
			duration: 4000,

			success: () => {
				router.back();
				return "Sistema de Governo Removido";
			},

			error: "Erro ao remover o sistema de governo",

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});
	};

	const handleForm = async (data: formProps) => {
		const inviteForm = async () => {
			try {
				await mutateAsync({
					id: params.id,
					name: data.name,
					cod: Number(data.cod),
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
				return "Sistema de governo Editado";
			},

			error: "Erro ao editar o sistema de governo",

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});
	};

	useEffect(() => {
		if (government?.cod) {
			setValueInput(government.cod.toString());
		}
	}, [government]);
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
							<CardTitle className="text-4xl 2xl:text-5xl px-2 2xl:pt-10 2xl:pb-6 pt-6 font-normal flex justify-between">
								<div>
									<h1>Editar</h1>
									<span>Sistema de Governo</span>
								</div>
								<Button variant="ghost" onClick={() => setIsAlert(true)}>
									<Trash2 className="text-red-500" />
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form
								className="space-y-2 2xl:space-y-4 mplus"
								onSubmit={handleSubmit(handleForm)}
							>
								<div className="space-y-1.5">
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
										defaultValue={government?.name}
										{...register("name")}
										required
									/>
								</div>

								<div className="space-y-1.5">
									<Label
										className="text-base 2xl:text-lg font-normal text-muted-foreground"
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
											const maxLength = 3;
											const newValue = e.target.value.replace(/\D+/g, ""); // remove non-numeric characters
											if (newValue.length <= maxLength) {
												setValueInput(newValue);
											}
										}}
										required
									/>
								</div>

								<div className="flex justify-center 2xl:py-8 py-4">
									<Button className="w-full 2xl:h-[48px] h-[42px] rounded-2xl text-lg font-bold bg-primary">
										Salvar
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</main>
			<AlertDialog open={isAlert} onOpenChange={setIsAlert}>
				<AlertDialogContent className="bg-white">
					<AlertDialogHeader>
						<AlertDialogTitle>
							Você realmente tem certeza disso?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Você está prestes a remover um Sistema de Governo. Deseja
							realmente continuar?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								setIsAlert(false);
								handleDelete();
							}}
						>
							Continuar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default pageEditGovernment;
