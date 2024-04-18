'use client'

import IFImg from "@/img/if.svg"
import searchIcon from "@/img/search-icon.svg"
import filterIcon from "@/img/filter-icon.svg"
import userIcon from "@/img/user-icon.svg"
import pencilIcon from "@/img/pencil.svg"
import iconBack from "@/img/icon-back.svg";
import Image from "next/image"
import { useRouter } from 'next/navigation'

export default function listCandidate() {
	const router = useRouter()
	function redirectEdit() {
		router.push("/admin/editarCandidato")
	}


	return (
		<main id="listMain">
			<aside id="ifAside">
				<Image src={IFImg} alt={"ifimg"} />
			</aside>
			<div id="userDiv">
				<span><Image src={userIcon} alt="user" />Júlio Cesar Alencar</span>
				<button>Sair</button>
			</div>

			<section className="listTemp">
                <button
					id="cancelButtonIcon"
                    className="iconBack"
					onClick={() => {
						router.back();
					}}
				>
					<Image src={iconBack} alt="Icone botão voltar"></Image>
				</button>
				<h2>Listagem de Candidatos</h2>

				<div id="searchInput">
					<Image src={filterIcon} alt={"filter"} width={42} height={42} id="filterIcon" />
					<Image src={searchIcon} alt={"search"} width={34} height={34} id="searchIcon" />
					<input type="search" name="searchGov" id="searchGov" placeholder="Pesquisar" />
				</div>
				<div className="tableTemp">
					<table>
						<tr>
							<th>Nome</th>
							<th>Número</th>
							<th>Turma</th>
							<th>Descrição</th>
							<th></th>
						</tr>
						<tr>
							<td className="userRow"><Image src={userIcon} className="userIcon" alt="user" />Júlio Cesar Alencar</td>
							<td>1234</td>
							<td>4TI</td>
							<td>PPT</td>
							<td><button className="pencils" onClick={redirectEdit}><Image src={pencilIcon} alt={"pencilIcon"} /></button></td>
						</tr>
						<tr>
							<td className="userRow"><Image src={userIcon} className="userIcon" alt="user" />Júlio Cesar Alencar</td>
							<td>1234</td>
							<td>4TI</td>
							<td>PPT</td>
							<td><button className="pencils" onClick={redirectEdit}><Image src={pencilIcon} alt={"pencilIcon"} /></button></td>
						</tr>
						<tr>
							<td className="userRow"><Image src={userIcon} className="userIcon" alt="user" />Júlio Cesar Alencar</td>
							<td>1234</td>
							<td>4TI</td>
							<td>PPT</td>
							<td><button className="pencils" onClick={redirectEdit}><Image src={pencilIcon} alt={"pencilIcon"} /></button></td>
						</tr>
						<tr>
							<td className="userRow"><Image src={userIcon} className="userIcon" alt="user" />Júlio Cesar Alencar</td>
							<td>1234</td>
							<td>4TI</td>
							<td>PPT</td>
							<td><button className="pencils" onClick={redirectEdit}><Image src={pencilIcon} alt={"pencilIcon"} /></button></td>
						</tr>
						<tr>
							<td className="userRow"><Image src={userIcon} className="userIcon" alt="user" />Júlio Cesar Alencar</td>
							<td>1234</td>
							<td>4TI</td>
							<td>PPT</td>
							<td><button className="pencils" onClick={redirectEdit}><Image src={pencilIcon} alt={"pencilIcon"} /></button></td>
						</tr>
						<tr>
							<td className="userRow"><Image src={userIcon} className="userIcon" alt="user" />Júlio Cesar Alencar</td>
							<td>1234</td>
							<td>4TI</td>
							<td>PPT</td>
							<td><button className="pencils" onClick={redirectEdit}><Image src={pencilIcon} alt={"pencilIcon"} /></button></td>
						</tr>
						
					</table>
				</div>
			</section>
		</main>
	);
}
