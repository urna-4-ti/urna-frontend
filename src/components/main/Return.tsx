"use client";
import iconBack from "@/img/icon-back.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Return = () => {
	const router = useRouter();
	return (
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
	);
};

export default Return;
