'use client'

import IFImg from "@/img/if.svg"
import searchIcon from "@/img/search-icon.svg"
import filterIcon from "@/img/filter-icon.svg"
import userIcon from "@/img/user-icon.svg"
import Image from "next/image"

export default function listGov() {
	return (
		<main id="listMain">
			<aside id="ifAside">
				<Image src={IFImg} alt={"ifimg"} />
			</aside>
			<div id="userDiv">
				<span><Image src={userIcon} alt="user" width={40} height={40} /> Júlio Cesar Alencar</span>
				<button>Sair</button>
			</div>

			<section id="listGov">
				<h2>Listagem de Governos</h2>

				<div id="searchInput">
					<Image src={filterIcon} alt={"filter"} width={42} height={42} id="filterIcon" />
					<Image src={searchIcon} alt={"search"} width={34} height={34} id="searchIcon" />
					<input type="search" name="searchGov" id="searchGov" placeholder="Pesquisar" />
				</div>
				<div id="tableGov">
					<table>
						<tr>
							<th>Nome</th>
							<th>Matrícula</th>
							<th>Turma</th>
							<th>E-mail</th>
						</tr>
						<tr>
							<td className="userRow"><Image src={userIcon} alt={"user"} className="userRowIcon" /> Júlio Cesar Alencar</td>
							<td>1234567890</td>
							<td>4TI</td>
							<td>juliocezaralencar@gmail.com</td>
						</tr>
						<tr>
							<td className="userRow"><Image src={userIcon} alt={"user"} className="userRowIcon" /> Júlio Cesar Alencar</td>
							<td>1234567890</td>
							<td>4TI</td>
							<td>juliocezaralencar@gmail.com</td>
						</tr>
						<tr>
							<td className="userRow"><Image src={userIcon} alt={"user"} className="userRowIcon" /> Júlio Cesar Alencar</td>
							<td>1234567890</td>
							<td>4TI</td>
							<td>juliocezaralencar@gmail.com</td>
						</tr>
						<tr>
							<td className="userRow"><Image src={userIcon} alt={"user"} className="userRowIcon" /> Júlio Cesar Alencar</td>
							<td>1234567890</td>
							<td>4TI</td>
							<td>juliocezaralencar@gmail.com</td>
						</tr>
						<tr>
							<td className="userRow"><Image src={userIcon} alt={"user"} className="userRowIcon" /> Júlio Cesar Alencar</td>
							<td>1234567890</td>
							<td>4TI</td>
							<td>juliocezaralencar@gmail.com</td>
						</tr>
						<tr>
							<td className="userRow"><Image src={userIcon} alt={"user"} className="userRowIcon" /> Júlio Cesar Alencar</td>
							<td>1234567890</td>
							<td>4TI</td>
							<td>juliocezaralencar@gmail.com</td>
						</tr>
						
					</table>
				</div>
			</section>
		</main>
	);
}
