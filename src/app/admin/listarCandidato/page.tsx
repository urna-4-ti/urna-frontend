'use client'

import IFImg from "@/img/if.svg"
import searchIcon from "@/img/search.svg"
import filterIcon from "@/img/filter.svg"
import userIcon from "@/img/user-icon.svg"
import pencilIcon from "@/img/pencil.svg"
import iconBack from "@/img/icon-back.svg";
import Image from "next/image"
import { useRouter } from 'next/navigation'
import "./style.css"
import { useQuery } from "@tanstack/react-query"
import { getCandidate } from "@/requests/candidate/findAll"


export default function listCandidate() {
	const router = useRouter()
	function redirectEdit() {
		router.push("/admin/editarCandidato")
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
					<a href="" id="logout">Sair</a>
				</div>
				<div id="head-bar">
					<h1>Listagem de Candidatos</h1>
					<div id="bar-buttons">
					<button
					id="cancelButtonIcon"
					onClick={() => {
						router.back();
					}}
				>
					<Image src={iconBack} alt="Icone botão voltar"  width={45}/>
				</button>
						<form id="search" action="">
							<button tabIndex={2} type="submit">
								<i id="search-button" aria-hidden={true}></i>
								<Image src={searchIcon} alt="" />
							</button>
							<input tabIndex={1} type="text" name="Pesquisar" id="pesquisar" placeholder="Pesquisar..." />
						</form>
					</div>
				</div>
				<div id="box">
					<table id="table-content">
						<tbody>
							<tr>
								<th id="table-header-logo-partido"></th>
								<th>Nome</th>
								<th>Número</th>
								<th>Turma</th>
								<th>Partido</th>
								<th>
									<a href=""></a>
								</th>
							</tr>
							{candidates?.map((item) => (
								<tr>
								<td id="th-logo-partido">
									<Image src={`http://localhost:4000/public/${item.picPath}`} width={25} height={25} alt="" />
								</td>
								<td>{item.name}</td>
								<td>{item.cod}</td>
								<td>4 TI</td>
								<td>partido</td>
								<td>
									<a 
									href="">
										<Image src={pencilIcon} alt="" />
									</a>
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