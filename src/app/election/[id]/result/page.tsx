"use client";
import { Card } from "@/components/ui/card";
import logoIf from "@/img/logo-if.svg";
import { getAllElection, getOneElection } from "@/requests/election/findAll";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect } from "react";
const ResultElection = ({ params }: { params: { id: string } }) => {
	const { data: election, refetch } = useQuery({
		queryKey: ["get-elections", params.id],
		queryFn: () => getOneElection(params.id),
	});

	useEffect(() => {
		console.log(election?.politicalRegimes);
	}, [election]);

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
						<Card className="flex 2xl:w-4/6 2xl:px-10 2xl:py-6 w-4/6 text-xl px-4 py-4 justify-between items-center 2xl:text-2xl mplus font-bold mt-10">
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
