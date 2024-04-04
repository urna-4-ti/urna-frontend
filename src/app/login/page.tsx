"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import topCloud from "@/img/top-cloud.svg";
import bottomCircle from "@/img/bottom-circle.svg";
import urnaIf from "@/img/urnaif.svg";
import iconBack from "@/img/icon-back.svg";
import { Input } from "@/components/Input/Input";

export default function Home() {
	const router = useRouter();
	return (
		<main id="login">
			<div className="left-panel">
				<Image id="topLeftCloud" src={topCloud} alt=""></Image>
				<Image id="bottomLeftCircle" src={bottomCircle} alt=""></Image>

				<form action="" id="loginForm">
					<button
						id="goBackLoginToHome"
						onClick={(e) => {
							e.preventDefault();
							router.back();
						}}
					>
						<Image id="iconBack" src={iconBack} alt="Voltar"></Image>
					</button>
					<h1>Login</h1>
					<Input label="Email" type="email" />
					<Input label="Senha" type="password" />

					<button
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							router.push("/admin/dashboard");
						}}
					>
						Entrar
					</button>
				</form>
			</div>

			<div className="right-panel">
				<Image id="urnaIf" src={urnaIf} alt=""></Image>
			</div>
		</main>
	);
}
