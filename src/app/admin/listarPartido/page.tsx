"use client";
import logoUrna from "@/img/logo_list.svg";
import iconUser from "@/img/icon-user.svg";
import iconBack from "@/img/icon-back.svg";
import iconFilter from "@/img/filter.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	return (
		<main id="mainList">
			<div id="leftDiv">
				<Image src={logoUrna} alt="" id="logo"></Image>
			</div>
			<div id="rightDiv">
				<div id="divTop">
					<div id="left">
						<h1>Listagem de Partidos</h1>
					</div>
					<div id="right">
						<label htmlFor="">
							<Image
								src={iconUser}
								alt="Ícone Usúario"
								width={40}
								height={40}
							/>
							<div>
								<p>Júlio Cesar Alencar</p>
								<a href="">
									<span>Sair</span>
								</a>
							</div>
						</label>
					</div>
				</div>
				<div id="search">
					<button
						id="routeBtn"
						onClick={() => {
							router.push("/");
						}}
					>
						<Image src={iconBack} alt="Icone botão voltar"></Image>
					</button>

					<label id="" htmlFor="">
						<button type="button">
							<Image src={iconFilter} alt="Filtro"></Image>
						</button>
						<input id="inputSearch" type="text" placeholder="Pesquisar" />
					</label>
				</div>

				<div id="list"></div>
			</div>
		</main>
	);
}
