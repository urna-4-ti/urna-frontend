"use client";
import Image from "next/image";
import topCloud from "@/img/top-cloud.svg";
import bottomCloud from "@/img/bottom-cloud.svg";
import bottomCircle from "@/img/bottom-circle.svg";
import logoUrna from "@/img/logo.svg";
import inputImage from "@/img/image-input.svg";
import { useState } from "react";

export default function Home() {
	const [selectValue, setSelectValue] = useState<string>("");

	const [image, setImage] = useState<string | null>(null);

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

				<form action="" id="registerEleitor">
					<h1>Cadastrar Eleitor</h1>
					<label htmlFor="">
						<p>Nome</p>
						<input type="text" />
					</label>

					<label htmlFor="">
						<p>Matricula</p>
						<input type="text" />
					</label>

					<label htmlFor="">
						<p>Email</p>
						<input type="text" />
					</label>

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
						{!image ? <Image src={inputImage} alt="Imagem Input"></Image> : ""}
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
						<button>Cadastrar</button>

						<button id="cancelButton">Cancelar</button>
					</div>
				</form>
			</div>
		</main>
	);
}
