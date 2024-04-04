"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import urnaIf from "@/img/urnaif.svg";

export default function Home() {
	const router = useRouter();
	return (
		<main id="home-page">
			<Image id="urnaIf" src={urnaIf} alt="Urna"></Image>
			<button
				onClick={() => {
					router.push("/login");
				}}
			>
				Faça login por aqui
			</button>
		</main>
	);
}
