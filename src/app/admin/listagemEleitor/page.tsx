'use client'

import IFImg from "@/img/if.svg"
import searchIcon from "@/img/search-icon.svg"
import filterIcon from "@/img/filter-icon.svg"
import userIcon from "@/img/user-icon.svg"
import pencilIcon from "@/img/pencil.svg"
import iconBack from "@/img/icon-back.svg";
import Image from "next/image"
import { useRouter } from 'next/navigation'

export default function listVoter() {
	const router = useRouter()
	function redirectEdit() {
		router.push("/admin/editarEleitor")
	}


	return (
		<main id="listMain">
			<aside id="ifAside">
				<Image src={IFImg} alt={"ifimg"} />
			</aside>
			<div id="userDiv">
				<span><Image src={userIcon} alt="user" width={40} height={40} /> Júlio Cesar Alencar</span>
				<button>Sair</button>
			</div>

			<section className="listTemp">
					<button
						id="cancelButtonIcon"
						onClick={() => {
							router.back();
						}}
					>
						<Image src={iconBack} alt="Icone botão voltar"></Image>
					</button>
				<h2>Listagem de Eleitores</h2>

				<div id="searchInput">
					<Image src={filterIcon} alt={"filter"} width={42} height={42} id="filterIcon" />
					<Image src={searchIcon} alt={"search"} width={34} height={34} id="searchIcon" />
					<input type="search" name="searchGov" id="searchGov" placeholder="Pesquisar" />
				</div>
				<div className="tableTemp">
					<table>
						<tr>
							<th>Nome</th>
							<th>Matrícula</th>
							<th>Turma</th>
							<th>E-mail</th>
							<th></th>
						</tr>
						<tr>
							<td className="userRow">Júlio Cesar Alencar</td>
							<td>1234567890</td>
							<td>4TI</td>
							<td>juliocezaralencar@gmail.com</td>
							<td><button className="pencils" onClick={redirectEdit}><Image src={pencilIcon} alt={"pencilIcon"} /></button></td>
						</tr>
						<tr>
							<td className="userRow">Júlio Cesar Alencar</td>
							<td>1234567890</td>
							<td>4TI</td>
							<td>juliocezaralencar@gmail.com</td>
							<td><button className="pencils" onClick={redirectEdit}><Image src={pencilIcon} alt={"pencilIcon"} /></button></td>
						</tr>
						<tr>
							<td className="userRow">Júlio Cesar Alencar</td>
							<td>1234567890</td>
							<td>4TI</td>
							<td>juliocezaralencar@gmail.com</td>
							<td><button className="pencils" onClick={redirectEdit}><Image src={pencilIcon} alt={"pencilIcon"} /></button></td>
						</tr>
						<tr>
							<td className="userRow">Júlio Cesar Alencar</td>
							<td>1234567890</td>
							<td>4TI</td>
							<td>juliocezaralencar@gmail.com</td>
							<td><button className="pencils" onClick={redirectEdit}><Image src={pencilIcon} alt={"pencilIcon"} /></button></td>
						</tr>
						<tr>
							<td className="userRow">Júlio Cesar Alencar</td>
							<td>1234567890</td>
							<td>4TI</td>
							<td>juliocezaralencar@gmail.com</td>
							<td><button className="pencils" onClick={redirectEdit}><Image src={pencilIcon} alt={"pencilIcon"} /></button></td>
						</tr>
						<tr>
							<td className="userRow">Júlio Cesar Alencar</td>
							<td>1234567890</td>
							<td>4TI</td>
							<td>juliocezaralencar@gmail.com</td>
							<td><button className="pencils" onClick={redirectEdit}><Image src={pencilIcon} alt={"pencilIcon"} /></button></td>
						</tr>
						
					</table>
				</div>
			</section>
		</main>
	);
}
