"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import logoIf from "@/img/logo-if.svg";
import { getCandidate } from "@/requests/candidate/findAll";
import { createVote } from "@/requests/vote/create";
import { useEnrollmentStore } from "@/store/enrollment";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
const ResultElection = () => {
	const [slotValue1, setSlotValue1] = useState("");
	const [slotValue2, setSlotValue2] = useState("");
	const [slotValue3, setSlotValue3] = useState("");
	const [slotValue4, setSlotValue4] = useState("");

	const chooseNumbers = (value: number) => {
		if (slotValue1 === "") {
			setSlotValue1(value.toString());
		} else if (slotValue2 === "") {
			setSlotValue2(value.toString());
		} else if (slotValue3 === "") {
			setSlotValue3(value.toString());
		} else if (slotValue4 === "") {
			setSlotValue4(value.toString());
		}
	};

	const clearNumbers = () => {
		setSlotValue1("");
		setSlotValue2("");
		setSlotValue3("");
		setSlotValue4("");
	};

	const {
		state: { enrollment, idElection },
	} = useEnrollmentStore();

	const { data: candidates } = useQuery({
		queryKey: ["get candidate"],
		queryFn: getCandidate,
	});

	const { mutateAsync } = useMutation({
		mutationKey: ["vote on candidate"],
		mutationFn: createVote,
	});

	return (
		<>
			<main className="grid grid-cols-10 mx-auto min-h-screen">
				<div className="bg-secondary/65">
					<div className="w-full flex justify-center mt-12">
						<Image src={logoIf} alt="Logo do IFRS" />
					</div>
				</div>
				<div className="col-span-9 bg-white 2xl:mx-10">
					<div className="flex justify-between px-4 2xl:px-2">
						<div className="px-6 py-12">
							<h1 className="text-3xl font-medium 2xl:text-4xl">
								Resultado Votação
							</h1>
						</div>
					</div>
					<div className="flex flex-col items-center mt-4 w-full">
						<div className="flex flex-col items-center space-y-4">
							<h1 className="text-4xl font-medium mplus">Total de votos:</h1>
							<h3 className="text-2xl font-medium mplus">Votos em branco:</h3>
						</div>
						<Card className="flex 2xl:w-4/6 2xl:px-6 2xl:py-6 w-4/6 text-xl px-4 py-4 justify-between items-center 2xl:text-2xl mplus font-bold mt-10">
							<h2>Posição</h2>
							<h2>Nome</h2>
							<h2>Votos</h2>
						</Card>
					</div>
				</div>
			</main>
		</>
	);
};

export default ResultElection;
