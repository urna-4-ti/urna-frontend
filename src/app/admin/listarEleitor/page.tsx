"use client";
import iconFilter from "@/img/filter.svg";
import iconBack from "@/img/icon-back.svg";
import ifLogo from "@/img/if.svg";
import iconSearch from "@/img/search.svg";
import userIcon from "@/img/user-icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { getVoters } from "@/requests/voter/findAll";
import { useQuery } from "@tanstack/react-query";
import "./style.css";

export default function Home() {
	const router = useRouter();

	const { data: getAllVoter } = useQuery({
		queryKey: ["get-all-voter"],
		queryFn: getVoters,
	});

	return (
		<main id="list">
			<div className="left-panel">
				<Image id="urnaIf" src={ifLogo} alt="Urna" />
			</div>

			<div className="right-panel">
				<nav>
					<h1>Listagem de Eleitores</h1>

					<div className="info-admin">
						<div className="adm">
							<Image id="userIcon" src={userIcon} alt="" />
							<span id="adminName">Administrador</span>
						</div>
						<button
							type="button"
							id="sair"
							onClick={() => {
								router.push("/");
							}}
						>
							Sair
						</button>
					</div>
				</nav>

				<div className="filter-search">
					<button
						type="button"
						id="cancelButtonIcon"
						onClick={() => {
							router.back();
						}}
					>
						<Image src={iconBack} alt="Icone botão voltar" />
					</button>

					<div className="act">
						<button type="button" id="filter">
							<Image src={iconFilter} alt="Icon filtragem" />
						</button>

						<div className="search">
							<Image src={iconSearch} alt="Icon busca" />
							<input placeholder="Pesquisar..." type="text" id="busca" />
						</div>
					</div>

					<div className="pontomorto" />
				</div>

				<div className="table-contents">
					<div className="head">
						<p>Nome</p> <p>Matrícula</p> <p>Turma</p> <p>Email</p>
					</div>

					<div className="body-table">
						{getAllVoter?.map((item) => (
							// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
							<div
								className="element"
								onClick={() => {
									router.push("");
								}}
							>
								<p>{item.name}</p>
								<p>{item.enrollment}</p>
								<p>{item.class}</p>
								<p>{item.email}</p>

								{/* Elemento armazenando a uuid do usuário para ancorar a tela de edição */}
								<span id="UUID" style={{ display: "none" }} />
							</div>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
