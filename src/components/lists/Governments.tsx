"use client";

import { deleteGovernment } from "@/requests/government/delete";
import { getGovernmentForm } from "@/requests/government/findAll";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
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

const Government = ({ value }: Search) => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const [isAlert, setIsAlert] = useState(false);
	const [id, setId] = useState("");

	const { data: government, isLoading } = useQuery({
		queryKey: ["get-government"],
		queryFn: () => getGovernmentForm(),
		// enabled: false,
	});

	const { mutateAsync: governmentDelete } = useMutation({
		mutationKey: ["delete-government", id],
		mutationFn: () => deleteGovernment(id),
	});

	const filteredGovernment = government?.filter((item) => {
		if (value) {
			return item.name.toLowerCase().includes(value.toLowerCase());
		}
	});

	const handleDelete = async () => {
		const inviteForm = async () => {
			const { response } = await governmentDelete();
			if (response) {
				return true;
			}
		};

		toast.promise(inviteForm, {
			loading: "Carregando...",
			duration: 4000,

			success: () => {
				queryClient.invalidateQueries({ queryKey: ["get-government"] });
				return "Sistema de Governo Removido";
			},

			error: "Erro ao remover o sistema de governo",

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
					{filteredGovernment !== undefined && filteredGovernment.length > 0 ? (
						<>
							{filteredGovernment.map((item) => (
								<div key={item.id} className="py-4">
									<div className="grid grid-cols-party px-20 2xl:px-32 h-[75px] 2xl:h-[80px] items-center 2xl:text-xl mplus">
										<div className="grid grid-cols-nameparty items-center">
											<div className="flex justify-center" />

											<div className="flex px-6">
												<span className="truncate 2xl:font-medium text-lg">
													{item.name}
												</span>
											</div>
										</div>
										<div className="flex justify-center">
											<span className="pr-8 2xl:pr-2 2xl:font-medium text-lg">
												{item.cod}
											</span>
										</div>
										<div className="2xl:px-14">
											<LimitedParagraph
												text={item.description}
												characterLimit={40}
											/>
										</div>
										<div className="flex justify-end">
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
																		`/admin/edit/${item.id}/government`,
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
							{government && government.length > 0 ? (
								<>
									{government?.map((item) => (
										<div key={item.id} className="py-4">
											<div className="grid grid-cols-party px-20 2xl:px-32 h-[75px] 2xl:h-[80px] items-center 2xl:text-xl mplus">
												<div className="grid grid-cols-nameparty items-center">
													<div className="flex justify-center" />

													<div className="flex px-6">
														<span className="truncate 2xl:font-medium text-lg">
															{item.name}
														</span>
													</div>
												</div>
												<div className="flex justify-center">
													<span className="pr-8 2xl:pr-2 2xl:font-medium text-lg">
														{item.cod}
													</span>
												</div>
												<div className="2xl:px-14">
													<LimitedParagraph
														text={item.description}
														characterLimit={40}
													/>
												</div>
												<div className="flex justify-end">
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
																				`/admin/edit/${item.id}/government`,
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
							Você está prestes a remover um sistema de governo. Deseja
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

export default Government;
