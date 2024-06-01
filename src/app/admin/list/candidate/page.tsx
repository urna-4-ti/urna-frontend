"use client";
import Spinner from "@/components/Spinner";
import Candidates from "@/components/lists/Candidates";
import { Button } from "@/components/ui/button";
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
import { AuthStore } from "@/store/auth";
import { CirclePlus, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

const Candidate = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isAlert, setIsAlert] = useState(false);
	const [id, setId] = useState("");

	const {
		actions: { logout },
		state: { user },
	} = AuthStore();

	const handleClick = (id: string) => {
		setId(id);
		setIsAlert(true);
	};

	const router = useRouter();

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
					{/* CANDIDATES */}
					<Suspense fallback={<Spinner />}>
						<Candidates />
					</Suspense>
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

export default Candidate;
