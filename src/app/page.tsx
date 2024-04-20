"use client";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	return (
		<main id="home-page">
			<h1>Hello World</h1>
			<button
				type="button"
				onClick={() => {
					router.push("/login");
				}}
			>
				Faça login por aqui
			</button>
		</main>
	);
}
