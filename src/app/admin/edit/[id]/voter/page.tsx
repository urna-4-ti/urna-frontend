"use client";
import Image from "next/image";
import topCloud from "@/img/top-cloud.svg";
import bottomCloud from "@/img/bottom-cloud.svg";
import bottomCircle from "@/img/bottom-circle.svg";
import logoUrna from "@/img/logo.svg";
import iconBack from "@/img/icon-back.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import inputImage from "@/img/uploading-icon.svg";
import { Input } from "@/components/Input/Input";
import "./style.css"

export default function Home() {

	const [selectValue, setSelectValue] = useState<string>("");

	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

	const [image, setImage] = useState<string | null>(null);

	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectValue(e.target.value);
	};
	return (
		<main id="main">
			<div id="leftDiv">
				<Image src={logoUrna} alt="" id="logo"></Image>
			</div>
			<div id="rightDiv">
				<Image id="topCloud" src={topCloud} alt=""></Image>
				<Image id="bottomCloud" src={bottomCloud} alt=""></Image>
				<Image id="bottomCircle" src={bottomCircle} alt=""></Image>

				<button
					id="cancelButtonIcon"
					onClick={() => {
						router.back();
					}}
				>
					<Image src={iconBack} alt="Icone botão voltar"></Image>
				</button>

				<form action="" id="registerEleitor">
					<h1>Editar Eleitor</h1>

					<Input label="Nome" type="text" />

					<Input label="Matricula" type="text" />

					<Input label="Email" type="email" />

					<label htmlFor="">
						<p>Turma</p>
						<select onChange={handleChange} value={selectValue}>
							<option value="1"></option>
						</select>
					</label>

					<label htmlFor="inputImg" id="labelImg" tabIndex={0}>
						<input
							type="file"
							name=""
							id="inputImg"
							accept="image/*"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const file = event.target.files?.[0]; // Optional chaining for potential absence of files
								if (file) {
									setImage(URL.createObjectURL(file));
								}
							}}
						/>
						{!image ? (
							<Image src={inputImage} alt="Imagem Input" id="uploading" />
						) : (
							""
						)}
						{image && (
							<Image
								src={image}
								alt="teste"
								id="newImage"
								width={1}
								height={1}
							></Image>
						)}
					</label>

					<div id="divButton">
						<button type="submit">Editar</button>

						<button
							type="button"
							id="cancelButton"
							onClick={() => setModalIsOpen(!modalIsOpen)}
						>
							Desvincular
						</button>

						<Modal
							isOpen={modalIsOpen}
							onClose={() => setModalIsOpen(!modalIsOpen)}
						/>
					</div>
				</form>
			</div>
		</main>
	);
}
