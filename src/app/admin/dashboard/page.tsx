"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import urnaIf from "@/img/urnaif.svg";
import plusCross from "@/img/cross.svg";
import hambList from "@/img/hamburger.svg";
import userIcon from "@/img/user-icon.svg";

import "./style.css";
import { AuthStore } from "@/store/auth";
import { useAuthStore } from "@/hooks/useAuthStore";
import { z } from "zod";

const schema = z.object({
	email: z.string().email("*O campo deve ser um email"),
	password: z.string().min(6, "*Senha inválida."),
});

type formProps = z.infer<typeof schema>;

export default function Home() {
	const router = useRouter();

	const user = useAuthStore(AuthStore, (store) => store.state.user);

	if (user?.id === "") {
		return router.push('/login')
	}

	if (user?.id !== "") {
		return (
			<main id="dashboard">
				<div className="left-panel">
					<Image id="urnaIf" src={urnaIf} alt="Urna"></Image>
				</div>
	
				<div className="right-panel">
					<div className="info-admin">
						<div className="adm">
							<Image id="userIcon" src={userIcon} alt=""></Image>
							<span id="adminName">{user?.id !== "" ? user?.name : ""}</span>
						</div>
						<button
							id="sair"
							onClick={() => {
								router.push("/");
							}}
						>
							Sair
						</button>
					</div>
	
					<div className="box-actions">
						<div
							className="action"
							onClick={() => {
								router.push("/admin/cadastrarPartido");
							}}
						>
							<div className="name">
								<Image id="plusCross" src={plusCross} alt="Icon add"></Image>
								<span>Cadastrar</span>
							</div>
							<div className="what-for">Partido</div>
						</div>
	
						<div
							className="action"
							onClick={() => {
								router.push("/admin/cadastrarEleitor");
							}}
						>
							<div className="name">
								<Image id="plusCross" src={plusCross} alt="Icon add"></Image>
								<span>Cadastrar</span>
							</div>
							<div className="what-for">Eleitor</div>
						</div>
	
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
								></Image>
								<span>Cadastrar</span>
							</div>
							<div className="what-for">Candidato</div>
						</div>
	
						<div
							className="action"
							onClick={() => {
								router.push("/admin/cadastrarPartido");
							}}
						>
							<div className="name">
								<Image id="plusCross" src={hambList} alt="Icon add"></Image>
								<span>Listar</span>
							</div>
							<div className="what-for">Partido</div>
						</div>
	
						<div
							className="action"
							onClick={() => {
								router.push("/admin/cadastrarEleitor");
							}}
						>
							<div className="name">
								<Image id="plusCross" src={hambList} alt="Icon add"></Image>
								<span>Listar</span>
							</div>
							<div className="what-for">Eleitor</div>
						</div>
	
						<div className="action">
							<div className="name">
								<Image id="plusCross" src={hambList} alt="Icon add"></Image>
								<span>Listar</span>
							</div>
							<div className="what-for">Candidato</div>
						</div>
					</div>
				</div>
			</main>
		);
	}
}
