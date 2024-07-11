"use client";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import logo from "@/img/logo-name.svg";
import landingCloud from "@/img/landing-cloud.svg";
import conceptArt from "@/img/landing-concept-art.png";

const About = () => {
	const [parent] = useAutoAnimate();
	const router = useRouter();

  const handleClick = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/login");
  }

	return (
		<main className="flex">
      <div className="leftPanel p-8 flex flex-col gap-8 max-w-[80%] h-screen justify-center">
        <Image src={logo} alt="Logo da IFUrna" className="invert w-[150px]" />

        <div>
          <h1 className="text-4xl max-w-[800px] font-extrabold py-4">
            Urna interativa: a plataforma ideal para votação simples e eficiente</h1>
          <p className="text-xl max-w-[550px] font-thin">
            Bem-vindos à apresentação do nosso projeto de turma: criar e implementar uma urna eletrônica para as eleições escolares, modernizando o processo com maior rapidez, segurança e transparência.</p>
        </div>

        <button onClick={handleClick} className="bg-primary text-white py-2 px-4 rounded-xl font-extrabold w-fit text-xl mb-[50px]">
          Entrar
        </button>
      </div>
      <div className="rightPanel max-w-[50%]">
        {/* IMAGENS */}
        <Image src={landingCloud} alt="Ícone arte verde" className="w-[40%] z-0 bottom-0 right-0 absolute" />
        <Image src={conceptArt} alt="Ícone arte verde" className="w-[18%] z-0 bottom-[22%] right-[15%] absolute" />
      </div>
		</main>
	);
};

export default About;
