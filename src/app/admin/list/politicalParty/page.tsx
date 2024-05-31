"use client";
import LimitedParagraph from "@/components/limited-paragraph";
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
/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import filter from "@/img/filter.svg";
import iconBack from "@/img/icon-back.svg";
import logoIf from "@/img/logo-if.svg";
import { deletePoliticalParty } from "@/requests/politicalPart/delete";
import { getAllPoliticalParty } from "@/requests/politicalPart/findAll";
import { AuthStore } from "@/store/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CirclePlus, EllipsisVertical, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const pageListPoliticalParty = () => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [isAlert, setIsAlert] = useState(false);
	const [id, setId] = useState("");

	const {
		actions: { logout },
		state: { user },
	} = AuthStore();

	const { data: politicalParty, refetch } = useQuery({
		queryKey: ["get-politicalParty"],
		queryFn: () => getAllPoliticalParty(),
		// enabled: false,
	});

	const { mutateAsync: politicalPartyDelete } = useMutation({
		mutationKey: ["delete-political", id],
		mutationFn: () => deletePoliticalParty(id),
	});

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
				return "Partido Removido";
			},

			error: "Erro ao remover o partido",

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});
	};

	const handleClick = (id: string) => {
		setId(id);
		setIsAlert(true);
	};

	return (
		<>
			<main className="grid grid-cols-10 mx-auto min-h-screen">
				<div className="bg-primary">
					<div className="w-full flex justify-center mt-12">
						<Image src={logoIf} alt="Logo do IFRS" />
					</div>
				</div>
				<div className="col-span-9 bg-white 2xl:mx-6">
					<div className="flex justify-between px-4 2xl:px-2">
						<div className="px-6 py-12">
							<h1 className="text-3xl font-medium 2xl:text-4xl">
								Listagem de Partidos
							</h1>
						</div>
						<div className="mt-6">
							<Button
								className="hover:bg-transparent"
								variant="ghost"
								onClick={() => setIsOpen(true)}
							>
								<UserRound className=" hover:opacity-80 h-6 w-6 2xl:w-10 2xl:h-10" />
							</Button>
						</div>
					</div>
					{/* NAVBAR */}
					<div className="grid grid-cols-4 2xl:px-6">
						<div className="flex items-center px-5">
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
						<div className="col-span-3 flex items-center px-4 2xl:px-14">
							<Button className="hover:bg-transparent" variant="ghost">
								<Image
									className="h-10 w-10 2xl:h-12 2xl:w-12"
									src={filter}
									alt="Filtro"
								/>
							</Button>
							<Input
								className="w-[337px] bg-[#F0F0F0] text-[#747474] 2xl:h-10 border-transparent"
								type="text"
								placeholder="Pesquisar..."
							/>
						</div>
					</div>
					{/* MAIN */}
					<div className="mplus 2xl:text-lg font-medium grid 2xl:space-x-2 grid-cols-party px-16 2xl:px-32 pt-8 2xl:pt-10 pb-4">
						<div className="grid grid-cols-nameparty text-[#8E8E8E]">
							<div />
							<div className="2xl:px-6 px-10">
								<span>Nome</span>
							</div>
						</div>
						<div className="flex justify-center">
							<span className="text-[#8E8E8E] 2xl:pr-4">Tipo</span>
						</div>
						<div className="flex justify-center">
							<span className="text-[#8E8E8E] pl-4">Turma</span>
						</div>
						<div className=" flex items-center justify-end px-6">
							<Link href="/admin/create/politicalParty">
								<CirclePlus className="h-[25px] w-[25px] 2xl:h-[32px] 2xl:w-[32px]" />
							</Link>
						</div>
					</div>
					{politicalParty?.length ? (
						<>
							{politicalParty?.map((item) => (
								<div key={item.id} className="py-4">
									<div className="mplus 2xl:text-lg 2xl:font-medium grid grid-cols-party px-20 2xl:px-32 h-[75px] 2xl:h-[80px] items-center">
										<div className="grid grid-cols-nameparty items-center">
											<div className="flex justify-center">
												<div className="w-14 2xl:w-16 2xl:h-16 h-14 relative">
													<Image
														className="object-cover rounded-xl select-none"
														src={`${process.env.NEXT_PUBLIC_URL}/public/${item.photoUrl}`}
														alt="Foto candidato"
														fill
													/>
												</div>
											</div>
											<div className="flex px-6">
												<span className="truncate text-[#121212]">
													{item.name}
												</span>
											</div>
										</div>
										<div className="px-14">
											<span className="2xl:pl-4 truncate">
												{item.politicalType.name}
											</span>
										</div>
										<div className="px-16 2xl:px-20">
											<span className="truncate">{item.class}</span>
										</div>
										<div className=" items-center">
											<div className="flex justify-end items-center">
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost">
															<EllipsisVertical className="h-[25px] w-[25px]" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent className="w-20">
														<DropdownMenuGroup>
															<DropdownMenuItem
																onClick={() =>
																	router.push(
																		`/admin/edit/${item.id}/politicalParty`,
																	)
																}
															>
																Editar
															</DropdownMenuItem>
															<DropdownMenuItem
																className="text-red-500 focus:text-red-400"
																onClick={() => handleClick(item.id)}
															>
																Remover
															</DropdownMenuItem>
														</DropdownMenuGroup>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</div>
									</div>
								</div>
							))}
						</>
					) : (
						<div className="w-full py-32 flex justify-center">
							<p className="text-2xl">
								Infelizmente não foi encontrado nenhum resultado para a sua
								busca!
							</p>
						</div>
					)}
				</div>
			</main>
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetContent className="bg-white">
					<SheetHeader>
						<SheetTitle className="font-normal text-muted-foreground">
							Informações
						</SheetTitle>
					</SheetHeader>
					<div className="grid gap-4 py-4">
						<div className="flex flex-col items-center justify-center mt-6 space-y-6">
							<div className="h-[60px] w-[60px] border border-muted-foreground rounded-full flex items-center justify-center">
								<UserRound size={35} />
							</div>
							<div className="flex justify-between w-full">
								<span className="2xl:text-xl text-lg text-[#121212]">
									{user?.name}
								</span>
								<Link
									href="/auth/logout"
									className="text-[#EA0000] 2xl:text-xl text-lg cursor-pointer hover:border-b hover:border-b-[#EA0000]"
								>
									Sair
								</Link>
							</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>
			<AlertDialog open={isAlert} onOpenChange={setIsAlert}>
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

export default pageListPoliticalParty;
