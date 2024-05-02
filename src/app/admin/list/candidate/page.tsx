"use client";

import filterIcon from "@/img/filter.svg";
import iconBack from "@/img/icon-back.svg";
import IFImg from "@/img/if.svg";
import pencilIcon from "@/img/pencil.svg";
import searchIcon from "@/img/search.svg";
import userIcon from "@/img/user-icon.svg";
import { getCandidate } from "@/requests/candidate/findAll";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./style.css";

export default function listCandidate() {
	const router = useRouter();
	function redirectEdit() {
		router.push("/admin/editarCandidato");
	}

	const { data: candidates } = useQuery({
		queryKey: ["get candidate"],
		queryFn: getCandidate,
	});

	return (
		<main id="admin">
			<div id="left-column">
				<Image src={IFImg} alt="" />
			</div>
			<div id="right-column">
				<div id="nav-admin">
					<div id="info">
						<Image src={userIcon} alt="" />
						<span id="nome">Adm. Produção</span>
					</div>
					{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
					<a href="" id="logout">
						Sair
					</a>
				</div>
				<div id="head-bar">
					<h1>Listagem de Candidatos</h1>
					<div id="bar-buttons">
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							id="goBackPage"
							onClick={() => {
								router.back();
							}}
						>
							<Image src={iconBack} alt="Icone botão voltar" width={45} />
						</button>
						<form id="searchPage" action="">
							{/* biome-ignore lint/a11y/noPositiveTabindex: <explanation> */}
							<button tabIndex={2} type="submit">
								{/* biome-ignore lint/a11y/noAriaHiddenOnFocusable: <explanation> */}
								<i id="search-button" aria-hidden={true} />
								<Image src={searchIcon} alt="" />
							</button>
							<input
								// biome-ignore lint/a11y/noPositiveTabindex: <explanation>
								tabIndex={1}
								type="text"
								name="Pesquisar"
								id="pesquisar"
								placeholder="Pesquisar..."
							/>
						</form>
						<div />
					</div>
				</div>
				<div id="box">
					<table id="table-content">
						<tbody>
							<tr>
								<th id="table-header-logo-partido" />
								<th>Nome</th>
								<th>Número</th>
								<th>Turma</th>
								<th>Partido</th>
								<th />
							</tr>
							{candidates?.map((item) => (
								<tr>
									<td id="th-logo-partido">
										<div className="box-image">
											<Image
												id="imageParty"
												src={`http://localhost:4000/public/${item.picPath}`}
												width={1}
												height={1}
												alt=""
											/>
										</div>
									</td>
									<td>{item.name}</td>
									<td>{item.cod}</td>
									<td>{item.PoliticalParty.class}</td>
									<td>Partido</td>
									<td>
										{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
										<button
											style={{ border: "none" }}
											onClick={() =>
												router.push(`/admin/edit/${item.id}/candidate`)
											}
										>
											<i className="bg-transparent">
												<Image src={pencilIcon} alt="" />
											</i>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
}
