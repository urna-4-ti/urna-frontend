"use client";
import { deleteCandidate } from "@/requests/candidate/delete";
import { getCandidate } from "@/requests/candidate/findAll";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Spinner from "../Spinner";
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
	value: string;
};

const Candidate = ({ value }: Search) => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const [id, setId] = useState("");
	const [isAlert, setIsAlert] = useState(false);
	const { data: candidates, isLoading } = useQuery({
		queryKey: ["get candidate"],
		queryFn: getCandidate,
	});

	const { mutateAsync: candidateDel } = useMutation({
		mutationKey: ["delete-candidate", id],
		mutationFn: () => deleteCandidate(id),
	});

	const handleClick = (id: string) => {
		setId(id);
		setIsAlert(true);
	};

	const filteredCandidates = () => {
		if (candidates) {
			candidates.filter((candidate) => {
				const name = candidate.name.toLowerCase();
				const searchQuery = value.toLowerCase();
				return name.includes(searchQuery);
			});
		}
	};

	const handleDelete = async () => {
		const inviteForm = async () => {
			const { response } = await candidateDel();
			if (response) {
				return true;
			}
		};

		toast.promise(inviteForm, {
			loading: "Carregando...",
			duration: 4000,

			success: () => {
				setIsAlert(false);
				queryClient.invalidateQueries({ queryKey: ["get candidate"] });
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
			{!isLoading ? (
				<>
					{candidates && candidates.length > 0 ? (
						<>
							{candidates?.map((item) => (
								<div key={item.id} className="py-4">
									<div className="mplus 2xl:font-medium 2xl:text-lg grid grid-cols-party px-10 2xl:px-32 h-[75px] 2xl:h-[80px] items-center">
										<div className="grid grid-cols-nameparty">
											<div className="flex items-center justify-end px-4">
												<div className="w-14 2xl:w-16 2xl:h-16 h-14 relative">
													<Image
														className="object-cover rounded-xl select-none"
														src={`${process.env.NEXT_PUBLIC_URL}/public/${item.picPath}`}
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

export default Candidate;
