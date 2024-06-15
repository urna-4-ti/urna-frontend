"use client";
import Voters from "@/components/lists/Voters";
import Return from "@/components/main/Return";
/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import filter from "@/img/filter.svg";

import logoIf from "@/img/logo-if.svg";
import { AuthStore } from "@/store/auth";
import { CirclePlus, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const pageListVoter = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState<string | undefined>(undefined);

	const {
		actions: { logout },
		state: { user },
	} = AuthStore();
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
								Listagem de Eleitores
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
						<Return />
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
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
					</div>
					{/* MAIN */}
					<div className="mplus 2xl:space-x-2 font-medium 2xl:text-lg grid grid-cols-party px-16 2xl:px-32 pt-8 2xl:pt-10 pb-4">
						<div className="grid grid-cols-nameparty text-[#8E8E8E]">
							<div />
							<div className="2xl:px-6 px-10">
								<span>Nome</span>
							</div>
						</div>
						<div className="flex justify-center">
							<span className="text-[#8E8E8E] pl-3">Matrícula</span>
						</div>
						<div className="flex justify-center">
							<span className="text-[#8E8E8E] pl-4">Turma</span>
						</div>
						<div className="grid grid-cols-2 px-6">
							<div>
								<span className="text-[#8E8E8E] pl-2">Email</span>
							</div>
							<div className="flex items-center justify-end">
								<Link href="/admin/create/voter">
									<CirclePlus className="h-[25px] w-[25px] 2xl:h-[32px] 2xl:w-[32px]" />
								</Link>
							</div>
						</div>
					</div>
					{/* Eleitores */}
					<Voters value={search} />
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
		</>
	);
};

export default pageListVoter;
