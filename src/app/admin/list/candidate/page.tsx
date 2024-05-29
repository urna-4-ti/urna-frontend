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
import { deleteCandidate } from "@/requests/candidate/delete";
import { getCandidate } from "@/requests/candidate/findAll";
import { AuthStore } from "@/store/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CirclePlus, EllipsisVertical, Plus, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Candidates = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isAlert, setIsAlert] = useState(false);
	const [isDropOpen, setIsDropOpen] = useState(false);
	const [id, setId] = useState("");

	const { data: candidates } = useQuery({
		queryKey: ["get candidate"],
		queryFn: getCandidate,
	});

	const { mutateAsync: candidateDel } = useMutation({
		mutationKey: ["delete-candidate", id],
		mutationFn: () => deleteCandidate(id),
	});

	const {
		actions: { logout },
		state: { user },
	} = AuthStore();

	const handleClick = (id: string) => {
		setId(id);
		setIsAlert(true);
	};

	const router = useRouter();

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
				setIsAlert(false);
				router.back();
				return "Candidato Removido";
			},

			error: "Erro ao remover o candidato",

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});
	};

	return (
		<>
			<main className="grid grid-cols-10 mx-auto min-h-screen">
				<div className="bg-primary">
					<div className="w-full flex justify-center mt-12">
						<Image src={logoIf} alt="Logo do IFRS" />
					</div>
				</div>
				<div className="col-span-9 bg-white 2xl:mx-10">
					<div className="flex justify-between px-4 2xl:px-2">
						<div className="px-6 py-12">
							<h1 className="text-3xl font-medium 2xl:text-4xl">
								Listagem de Candidatos
							</h1>
						</div>
						<div className="mt-6">
							<Button
								className="hover:bg-transparent"
								variant="ghost"
								onClick={() => setIsOpen(true)}
							>
								<UserRound className=" hover:opacity-80 h-[30px] w-[30px] 2xl:w-[45px] 2xl:h-[45px]" />
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
					<div className="mplus text-base font-medium 2xl:font-medium grid grid-cols-party 2xl:space-x-2 px-10 2xl:px-32 pt-8 2xl:pt-10 pb-4 2xl:text-lg">
						<div className="col-span-1 grid grid-cols-2 text-[#8E8E8E]">
							<div className="col-span-1" />
							<div className="flex 2xl:px-6 px-4 col-span-1">
								<span className="2xl:text-lg">Nome</span>
							</div>
						</div>
						<div className="px-4 2xl:px-3">
							<span className="text-[#8E8E8E] 2xl:text-lg">Número</span>
						</div>
						<div className="">
							<span className="text-[#8E8E8E] 2xl:text-lg">Turma</span>
						</div>
						<div className="col-span-1  flex items-center justify-between px-6">
							<span className="text-[#8E8E8E] 2xl:text-lg">Descrição</span>
							<Link href="/admin/create/candidate">
								<CirclePlus className="h-[25px] w-[25px] 2xl:h-[32px] 2xl:w-[32px]" />
							</Link>
						</div>
					</div>
					{candidates?.length ? (
						<>
							{candidates?.map((item) => (
								<div key={item.id} className="py-4">
									<div className="mplus 2xl:font-medium 2xl:text-lg grid grid-cols-party px-10 2xl:px-32 h-[75px] 2xl:h-[80px] items-center">
										<div className="grid grid-cols-nameparty">
											<div className="flex items-center justify-end px-4">
												<div className="w-14 2xl:w-16 2xl:h-16 h-14 relative">
													<Image
														className="object-cover rounded-xl select-none"
														src={`http://localhost:4000/public/${item.picPath}`}
														alt="Foto candidato"
														fill
													/>
												</div>
											</div>
											<div className="flex items-center px-8 2xl:px-10">
												<span className="truncate">{item.name}</span>
											</div>
										</div>
										<div className="px-5 2xl:px-7">
											<span className="">{item.cod}</span>
										</div>
										<div className="px-2 2xl:px-4">
											<span className="">{item.PoliticalParty.class}</span>
										</div>
										<div className="grid grid-cols-3">
											<div className="col-span-2 flex items-center px-7 2xl:px-9">
												<span className="truncate">{item.description}</span>
											</div>
											<div className="flex justify-end">
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
																		`/admin/edit/${item.id}/candidate`,
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

export default Candidates;
