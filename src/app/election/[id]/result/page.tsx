"use client";
import { Card } from "@/components/ui/card";
import logoIf from "@/img/logo-if.svg";
import { getOneVoting } from "@/requests/election/findOne";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
const ResultElection = ({ params }: { params: { id: string } }) => {
	const { data: elections } = useQuery({
		queryKey: ["get-elections", params.id],
		queryFn: () => getOneVoting(params.id),
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
								Resultado Votação | {elections?.name}
							</h1>
						</div>
					</div>
					<div className="flex flex-col items-center mt-4 w-full py-10">
						<div className="flex flex-col items-center space-y-4">
							<h1 className="text-4xl font-medium mplus">Total de votos:</h1>
							<h3 className="text-2xl font-medium mplus">Votos em branco:</h3>
						</div>

						{elections && elections.politicalRegimes.length > 0 && (
							<>
								<Card className="flex 2xl:w-1/4 2xl:px-10 2xl:py-4 w-2/6 text-xl px-4 py-4 justify-center items-center 2xl:text-2xl mplus font-bold mt-10">
									<h2>Sistema de Governo</h2>
								</Card>
								<Card className="flex 2xl:w-4/6 2xl:px-10 2xl:py-6 w-4/6 text-base px-4 py-4 justify-between items-center 2xl:text-lg mplus font-semibold mt-4">
									<h2>Posição</h2>
									<h2>Sistema de governo</h2>
									<h2>Votos</h2>
								</Card>
								<Card className="flex flex-col 2xl:w-4/6 2xl:px-10 2xl:py-6 w-4/6 text-base px-4 py-4 items-center 2xl:text-lg mplus font-semibold mt-4">
									{elections?.politicalRegimes.map((item, index) => (
										<div
											key={item.id}
											className="w-full flex justify-between px-6 py-4"
										>
											<h2>{index + 1}º</h2>
											<h2>{item.name}</h2>
											<h2>
												{elections.votes?.politicalRegimeVotes[item.name]}
											</h2>
										</div>
									))}
								</Card>
							</>
						)}
						{elections && elections.governmentSystem.length > 0 && (
							<>
								<Card className="flex 2xl:w-1/4 2xl:px-10 2xl:py-4 w-2/6 text-xl px-4 py-4 justify-center items-center 2xl:text-2xl mplus font-bold mt-10">
									<h2>Sistema de Governo</h2>
								</Card>
								<Card className="flex 2xl:w-4/6 2xl:px-10 2xl:py-6 w-4/6 text-base px-4 py-4 justify-between items-center 2xl:text-lg mplus font-semibold mt-4">
									<h2>Posição</h2>
									<h2>Forma de Governo</h2>
									<h2>Votos</h2>
								</Card>
								<Card className="flex flex-col 2xl:w-4/6 2xl:px-10 2xl:py-6 w-4/6 text-base px-4 py-4 items-center 2xl:text-lg mplus font-semibold mt-4">
									{elections?.governmentSystem.map((item, index) => (
										<div
											key={item.id}
											className="w-full flex justify-between px-6 py-4"
										>
											<h2>{index + 1}º</h2>
											<h2>{item.name}</h2>
											<h2>{elections.votes?.governmentVotes[item.name]}</h2>
										</div>
									))}
								</Card>
							</>
						)}

						{elections && elections.candidates.length > 0 && (
							<>
								<Card className="flex 2xl:w-1/4 2xl:px-10 2xl:py-4 w-2/6 text-xl px-4 py-4 justify-center items-center 2xl:text-2xl mplus font-bold mt-10">
									<h2>Candidatos</h2>
								</Card>
								<Card className="flex 2xl:w-4/6 2xl:px-10 2xl:py-6 w-4/6 text-base px-4 py-4 justify-between items-center 2xl:text-lg mplus font-semibold mt-4">
									<h2>Posição</h2>
									<h2>Candidato(a)</h2>
									<h2>Votos</h2>
								</Card>
								<Card className="flex flex-col 2xl:w-4/6 2xl:px-10 2xl:py-6 w-4/6 text-base px-4 py-4 items-center 2xl:text-lg mplus font-semibold mt-4">
									{elections?.candidates.map((item, index) => (
										<div
											key={item.id}
											className="w-full flex justify-between px-6 py-4"
										>
											<h2>{index + 1}º</h2>
											<h2>{item.name}</h2>
											<h2>{elections.votes?.candidateVotes[item.name]}</h2>
										</div>
									))}
								</Card>
							</>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default ResultElection;
