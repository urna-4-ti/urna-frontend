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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteVoter } from "@/requests/voter/delete";
import { getVoters } from "@/requests/voter/findAll";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Spinner from "../Spinner";

const Voters = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const [isAlert, setIsAlert] = useState(false);
	const [id, setId] = useState("");

	const { data: voters } = useQuery({
		queryKey: ["get voter"],
		queryFn: getVoters,
	});

	const { mutateAsync: voterDelete } = useMutation({
		mutationKey: ["delete-voter", id],
		mutationFn: () => deleteVoter(id),
	});

	const handleClick = (id: string) => {
		setId(id);
		setIsAlert(true);
	};

	const handleDelete = async () => {
		const inviteForm = async () => {
			const { response } = await voterDelete();
			if (response) {
				return true;
			}
		};

		toast.promise(inviteForm, {
			loading: "Carregando...",
			duration: 4000,

			success: () => {
				setIsAlert(false);
				queryClient.invalidateQueries({ queryKey: ["get voter"] });
				return "Partido Removido";
			},

			error: "Erro ao remover o partido",

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});
	};
	return (
		<>
			{voters && voters.length > 0 ? (
				<>
					{voters?.map((item) => (
						<div key={item.id} className="py-4">
							<div className="mplus 2xl:space-x-2 2xl:text-lg 2xl:font-medium grid grid-cols-party px-20 2xl:px-32 h-[75px] 2xl:h-[80px] items-center">
								<div className="grid grid-cols-nameparty items-center">
									<div className="flex justify-center" />

									<div className="px-6 2xl:px-7">
										<span className="truncate text-[#121212]">{item.name}</span>
									</div>
								</div>
								<div className="px-11 2xl:px-14">
									<span className="">{item.enrollment}</span>
								</div>
								<div className="px-16 2xl:px-[4.55rem]">
									<span className="truncate">{item.class}</span>
								</div>
								<div className="grid grid-cols-2">
									<div className="px-5 2xl:px-9">
										<span className="truncate">{item.email}</span>
									</div>
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
															router.push(`/admin/edit/${item.id}/voter`)
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
					{voters !== undefined ? (
						<div className="w-full py-32 flex justify-center">
							<p className="text-2xl">
								Infelizmente não foi encontrado nenhum resultado para a sua
								busca!
							</p>
						</div>
					) : (
						<Spinner />
					)}
				</>
			)}
			<AlertDialog open={isAlert} onOpenChange={setIsAlert}>
				<AlertDialogContent className="bg-white">
					<AlertDialogHeader>
						<AlertDialogTitle>
							Você realmente tem certeza disso?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Você está prestes a remover um Eleitor. Deseja realmente
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

export default Voters;
