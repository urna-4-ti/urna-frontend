"use client";
import SettingsTabs from "@/components/SettingsTabs";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import logoIf from "@/img/logo-if.svg";
import { AuthStore } from "@/store/auth";
import { UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";

const DashBoard = () => {
	const [isOpen, setIsOpen] = useState(false);

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

				<div className="col-span-9 bg-white overflow-auto">
					{/* HEADER */}
					<div className="flex justify-end mt-6 px-4 2xl:px-2">
						<Button
							className="hover:bg-transparent"
							variant="ghost"
							onClick={() => setIsOpen(true)}
						>
							<UserRound className="opacity-65 hover:opacity-60 h-[30px] w-[30px] 2xl:w-[45px] 2xl:h-[45px] " />
						</Button>
					</div>
					<Suspense>
						<SettingsTabs />
					</Suspense>
				</div>
			</main>
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetContent className="bg-white w-[334px] 2xl:w-[384px]">
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
									onClick={logout}
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

export default DashBoard;
