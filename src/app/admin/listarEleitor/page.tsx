"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ifLogo from "@/img/if.svg";
import userIcon from "@/img/user-icon.svg";
import iconBack from "@/img/icon-back.svg";
import iconFilter from "@/img/filter.svg";
import iconSearch from "@/img/search.svg";

import "./style.css";

export default function Home() {
	const router = useRouter();

	return (
		<main id="list">
			<div className="left-panel">
				<Image id="urnaIf" src={ifLogo} alt="Urna"></Image>
			</div>

            <div className="right-panel">
                <nav>
                    <h1>Listagem de Eleitores</h1>

                    <div className="info-admin">
                        <div className="adm">
                            <Image id="userIcon" src={userIcon} alt=""></Image>
                            <span id="adminName">Administrador</span>
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
                </nav>
                
                <div className="filter-search">
                    <button
                        id="cancelButtonIcon"
                        onClick={() => {
                            router.back();
                        }}
                    >
                        <Image src={iconBack} alt="Icone botão voltar"></Image>
                    </button>

                    <div className="act">
                        <button id="filter">
                            <Image src={iconFilter} alt="Icon filtragem"></Image>
                        </button>

                        <div className="search">
                            <Image src={iconSearch} alt="Icon busca"></Image>
                            <input placeholder="Pesquisar..." type="text" id="busca" />
                        </div>
                    </div>

                    <div className="pontomorto"></div>
                </div>

                <div className="table-contents">
                    <div className="head">
                        <p>Nome</p> <p>Matrícula</p> <p>Turma</p> <p>Email</p>
                    </div>
                    
                    <div className="body-table">
                        <div
                            className="element"
                            onClick={() => {
                                router.push("/admin/editarEleitor");
                            }}
                        >
                            <p>Luis Felipe Assmann</p>
                            <p>2020304562</p>
                            <p>4TI</p>
                            <p>luis.assmannnnn@aluno.feliz.ifrs.edu.br</p>
                            
                            {/* Elemento armazenando a uuid do usuário para ancorar a tela de edição */}
                            <span id="UUID" style={{ display: "none" }}></span>
                        </div>   
                    </div>
                </div>
            </div>
		</main>
	);
}
