"use client"

import Image from "next/image"
import IFImage from "@/img/logo-if.svg"
import { UserRound } from "lucide-react";
import certifiedIcon from "@/img/certified.svg"

import '../votacaoFormaGoverno/styles.css'
import React from "react"
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { createVoting } from "@/requests/voting/create";
import { getPoliticalRegimeId } from "@/requests/politicalRegime/findAll";
import { getVoterId } from "@/requests/voter/findAll";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const schema = z.object({
	class: z.string({ message: "*Este campo ainda não foi preenchido." }),
    name: z.string({ message: "*Este campo ainda não foi preenchido." }),
});

type votingProps = z.infer<typeof schema>;

export default function votePolRegPage () {
    const [ChosenNumbers, setChosenNumbers] = React.useState(0)
    const [votingNumbers, setVotingNumbers] = React.useState<string[]>([])
    const [showMessageType, setShowMessageType] = React.useState(0)
    const [politicalRegime, setPoliticalRegime] = React.useState("")
    const [voterName, setVoterName] = React.useState("")

    const router = useRouter()

    const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm<votingProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
		defaultValues: {
			name: "",
			class: "",
		},
	});


    const { data: politicalRegimeId, refetch } = useQuery({
		queryKey: ["get-politicalRegimeId", politicalRegime],
		queryFn: () => getPoliticalRegimeId(politicalRegime),
		enabled: !!politicalRegime,
	});


    const { data: voter, refetch: refetchVoter } = useQuery({
        queryKey: ["get-voter", voterName],
        queryFn: () => getVoterId(voterName),
        enabled: !!voterName,
    });



	const { mutateAsync, isError } = useMutation({
		mutationKey: ["createVoting"],
		mutationFn: createVoting,
	});

    
    const handleForm = async (data: votingProps) => {
        const voterMain = document.querySelector(".voterMain");
        voterMain!.classList.add("hidden")
        setPoliticalRegime(votingNumbers[0].concat(votingNumbers[1]).concat(votingNumbers[2]));

        const inviteForm = async () => {
            try {
                await mutateAsync({
                    class: data.class,
                    name: data.name,
                });
            } catch (error) {
                console.error(error);
            }
        };

        toast.promise(inviteForm, {
            loading: "Carregando...",
            duration: 4000,

            success: () => {
                router.back();
                return "Voto Registrado";
            },

            error: "Erro ao registrar o voto",

            style: {
                boxShadow: "1px 2px 20px 6px #555",
            },
        });
    };



    function chooseNumbers(event: React.ChangeEvent<HTMLInputElement>) {
        const numberInputs : NodeListOf<HTMLInputElement> = document.querySelectorAll(".voterInput");
        if (ChosenNumbers !=3) {
            numberInputs[ChosenNumbers].value = event.target.value;
            setChosenNumbers(ChosenNumbers + 1);
            setVotingNumbers([...votingNumbers, event.target.value]);
        }else if (ChosenNumbers == 3) {
            if ((votingNumbers[0].concat(votingNumbers[1])).concat(votingNumbers[2]) === "000") {
                setShowMessageType(2);
                alert("O número máximo de digitos foi atingido!")
                
            }else{
                setShowMessageType(1);
                alert("O número máximo de digitos foi atingido!")
            }
        }
    }

    function clearChosenNumbers() {
        const numberInputs : NodeListOf<HTMLInputElement> = document.querySelectorAll(".voterInput");
        for (let i = 0; i < numberInputs.length; i++) {
            const input = numberInputs[i];
            input.value = "";
        }
        setChosenNumbers(0);
        setVotingNumbers([]);
    }

    function voteWhite() {
        setShowMessageType(3)
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
                        <input type="text" className="voterInput" disabled />
                    </div>
                </div>

                <form className="voterUrn" onSubmit={handleSubmit(handleForm)}>
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
                        <button type="button" style={{background: "#EA0000"}} onClick={clearChosenNumbers}>Corrige</button>
                        <button type="button" id="whiteBtn" onClick={voteWhite}>Branco</button>
                        <button type="submit" style={{background: "#05B022"}}>Confirma</button>
                    </div>
                </form>
               
                
            </main>

            {
                showMessageType==1 ? <span className="successSpan">Voto em {politicalRegimeId!.name} com sucesso <Image src={certifiedIcon} alt="certified" /></span> : null
            }
        </section>
    )
}