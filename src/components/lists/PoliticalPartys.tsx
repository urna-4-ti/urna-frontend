"use client";
import { deletePoliticalParty } from "@/requests/politicalPart/delete";
import { getAllPoliticalParty } from "@/requests/politicalPart/findAll";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Spinner from "../Spinner";
import LimitedParagraph from "../limited-paragraph";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Search = {
	value: string | undefined;
};

const PoliticalPartys = ({ value }: Search) => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const [isAlert, setIsAlert] = useState(false);
	const [id, setId] = useState("");
	const { data: politicalParty, isLoading } = useQuery({
		queryKey: ["get-politicalParty"],
		queryFn: () => getAllPoliticalParty(),
		// enabled: false,
	});

	const { mutateAsync: politicalPartyDelete } = useMutation({
		mutationKey: ["delete-political", id],
		mutationFn: () => deletePoliticalParty(id),
	});

	const filteredPolitical = politicalParty?.filter((item) => {
		if (value) {
			return item.name.toLowerCase().includes(value.toLowerCase());
		}
	});

	const handleDelete = async () => {
		const inviteForm = async () => {
			const { response } = await politicalPartyDelete();
			if (response) {
				return true;
			}
		};

		toast.promise(inviteForm, {
			loading: "Carregando...",
			duration: 4000,

			success: () => {
				queryClient.invalidateQueries({ queryKey: ["get-politicalParty"] });
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
			{!isLoading ? (
				<>
					{filteredPolitical !== undefined && filteredPolitical.length > 0 ? (
						<>
							{filteredPolitical.map((item) => (
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
											<LimitedParagraph
												text={item.government.name}
												characterLimit={14}
											/>
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
						<>
							{politicalParty && politicalParty.length > 0 ? (
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
													<LimitedParagraph
														text={item.government.name}
														characterLimit={14}
													/>
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
						</>
					)}
				</>
			) : (
				<Spinner />
			)}
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

export default PoliticalPartys;
