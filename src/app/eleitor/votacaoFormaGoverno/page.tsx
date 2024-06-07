"use client"

import Image from "next/image"
import IFImage from "@/img/logo-if.svg"
import { UserRound } from "lucide-react";
import certifiedIcon from "@/img/certified.svg"

import './styles.css'
import React from "react"
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { createVoting } from "@/requests/voting/create";
import { createVote } from "@/requests/vote/create";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z
		.string({ message: "*Este campo ainda não foi preenchido." })
		.min(3, "*O nome de usuário deve conter pelo menos 3 caracteres."),
	class: z
		.string({ message: "*Este campo ainda não foi preenchido." })
		.refine((value) => value.length > 0, {
			message: "*Este campo ainda não foi preenchido.",
		}),
});



export default function voteGovFormPage () {
    const [ChosenNumbers, setChosenNumbers] = React.useState(0)
    const [showMessage, setShowMessage] = React.useState(0)

    function chooseNumbers(event: React.ChangeEvent<HTMLInputElement>) {
        const numberInputs : NodeListOf<HTMLInputElement> = document.querySelectorAll(".voterInput");
        if (ChosenNumbers !=2) {
            numberInputs[ChosenNumbers].value = event.target.value;
            setChosenNumbers(ChosenNumbers + 1);
        }else{
            alert("O número máximo de digitos foi atingido!")
        }
    }

    function clearChosenNumbers() {
        const numberInputs : NodeListOf<HTMLInputElement> = document.querySelectorAll(".voterInput");
        for (let i = 0; i < numberInputs.length; i++) {
            const input = numberInputs[i];
            input.value = "";
        }
        setChosenNumbers(0);
    }

    function confirmVote() {
        setShowMessage(1)
        const voterMain = document.querySelector(".voterMain");
        voterMain!.classList.add("hidden")
    }

    const spanArray = new Array(10).fill(1);
    
    return(
        <section className="voteSection">
            <div className="leftDiv leftDivVoter">
                <Image src={IFImage} alt="IF" width={90} height={90} />
            </div>

            <div id="userDiv">
                <UserRound className=" hover:opacity-80 h-[30px] w-[30px] 2xl:w-[45px] 2xl:h-[45px] absolute top-10 right-10" />
			</div>

            <main className="voterMain">
                <div>
                    <h2>Votação Forma de Governo</h2>

                    <div className="voterNumbers">
                        <input type="text" className="voterInput" disabled />
                        <input type="text" className="voterInput" disabled />
                    </div>
                </div>

                <div className="voterUrn">
                    <div className="voteNumbers">
                        {
                            spanArray.map((_, index) => {
                                if ((index+1) !=10) {
                                    return (
                                        <input type="button" key={index} value={index + 1} onClick={chooseNumbers}  />
                                    )
                                }else{
                                    return (
                                        <input type="button" key={index} value={0} onClick={chooseNumbers}  />
                                    )
                                }
                            })
                        }
                    </div>
                    <div className="voteButtons">
                        <button style={{background: "#EA0000"}} onClick={clearChosenNumbers}>Corrige</button>
                        <button id="whiteBtn">Branco</button>
                        <button style={{background: "#05B022"}} onClick={confirmVote}>Confirma</button>
                    </div>
                </div>
               
                
            </main>

            {
                showMessage==1 ? <span className="successSpan">Voto em {"{}"} com sucesso <Image src={certifiedIcon} alt="certified" /></span> : null
            }
        </section>
    )
}