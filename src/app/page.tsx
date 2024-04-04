"use client";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	return (
		<main id="main">
			<button
				onClick={() => {
					router.push("/admin/cadastrarEleitor");
				}}
			>
				Clique aqui
			</button>
		</main>
	);
}
