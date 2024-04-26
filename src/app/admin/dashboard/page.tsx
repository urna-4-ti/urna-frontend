"use client";
import plusCross from "@/img/cross.svg";
import hambList from "@/img/hamburger.svg";
import urnaIf from "@/img/urnaif.svg";
import userIcon from "@/img/user-icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/hooks/useAuthStore";
import { AuthStore } from "@/store/auth";
import { z } from "zod";
import "./style.css";

const schema = z.object({
	email: z.string().email("*O campo deve ser um email"),
	password: z.string().min(6, "*Senha inválida."),
});

type formProps = z.infer<typeof schema>;

export default function Home() {
	const router = useRouter();

	const {
		actions: { logout, login },
		state: { user },
	} = AuthStore();

	// const getCookie = async (data : formProps) => {
	// 	const cookie = await login({...data})
	// 	return cookie
	// }
	return (
		<main id="dashboard">
			<div className="left-panel">
				<Image id="urnaIf" src={urnaIf} alt="Urna" />
			</div>

			<div className="right-panel">
				<div className="info-admin">
					<div className="adm">
						<Image id="userIcon" src={userIcon} alt="" />
						<span id="adminName">{user?.name}</span>
					</div>
					<button
						type="button"
						id="sair"
						onClick={async () => {
							await logout();
							router.push("/auth/logout");
						}}
					>
						Sair
					</button>
				</div>

				<div className="box-actions">
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						className="action"
						onClick={() => {
							router.push("/admin/cadastrarPartido");
						}}
					>
						<div className="name">
							<Image id="plusCross" src={plusCross} alt="Icon add" />
							<span>Cadastrar</span>
						</div>
						<div className="what-for">Partido</div>
					</div>

					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						className="action"
						onClick={() => {
							router.push("/admin/cadastrarEleitor");
						}}
					>
						<div className="name">
							<Image id="plusCross" src={plusCross} alt="Icon add" />
							<span>Cadastrar</span>
						</div>
						<div className="what-for">Eleitor</div>
					</div>

					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						className="action"
						onClick={() => {
							router.push("/admin/cadastrarCandidato");
						}}
					>
						<div className="name">
							<Image
								id="plusCross"
								src={plusCross}
								alt="Icon add"
								width={27}
								height={27}
							/>
							<span>Cadastrar</span>
						</div>
						<div className="what-for">Candidato</div>
					</div>

					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						className="action"
						onClick={() => {
							router.push("/admin/cadastrarPartido");
						}}
					>
						<div className="name">
							<Image id="plusCross" src={hambList} alt="Icon add" />
							<span>Listar</span>
						</div>
						<div className="what-for">Partido</div>
					</div>

					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						className="action"
						onClick={() => {
							router.push(`/admin/listarEleitor?`);
						}}
					>
						<div className="name">
							<Image id="plusCross" src={hambList} alt="Icon add" />
							<span>Listar</span>
						</div>
						<div className="what-for">Eleitor</div>
					</div>

					<div
						className="action"
						onClick={() => {
							router.push("/admin/listarCandidato");
						}}
					>
						<div className="name">
							<Image id="plusCross" src={hambList} alt="Icon add" />
							<span>Listar</span>
						</div>
						<div className="what-for">Candidato</div>
					</div>
				</div>
			</div>
		</main>
	);
}
