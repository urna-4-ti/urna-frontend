"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import logoIf from "@/img/logo-if.svg";
import { getPoliticalRegimes } from "@/requests/politicalRegime/findAll";
import { createVote } from "@/requests/vote/create";
import { AuthStore } from "@/store/auth";
import { useEnrollmentStore } from "@/store/enrollment";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
const RegimeVote = () => {
	const [slotValue1, setSlotValue1] = useState("");
	const [slotValue2, setSlotValue2] = useState("");
	const [slotValue3, setSlotValue3] = useState("");

	const chooseNumbers = (value: number) => {
		if (slotValue1 === "") {
			setSlotValue1(value.toString());
		} else if (slotValue2 === "") {
			setSlotValue2(value.toString());
		} else if (slotValue3 === "") {
			setSlotValue3(value.toString());
		}
	};

	const clearNumbers = () => {
		setSlotValue1("");
		setSlotValue2("");
		setSlotValue3("");
	};
	const {
		state: { enrollment, idElection },
	} = useEnrollmentStore();
	const { data: regimes } = useQuery({
		queryKey: ["get all regimes"],
		queryFn: getPoliticalRegimes,
	});

	const { mutateAsync } = useMutation({
		mutationKey: ["vote on regime"],
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
								Votação Regime Político
							</h1>
						</div>
					</div>
					<div className="grid grid-cols-2">
						<div className="px-24 py-16 flex space-x-2">
							<Input
								className="flex 2xl:h-32 2xl:w-24 h-28 w-20 items-center justify-center border-y border-r rounded-md border-input 2xl:text-4xl text-3xl shadow-md transition-all disabled:opacity-100 disabled:cursor-auto text-center"
								disabled
								value={slotValue1}
							/>
							<Input
								className="flex 2xl:h-32 2xl:w-24 h-28 w-20 items-center justify-center border-y border-r rounded-md border-input 2xl:text-4xl text-3xl shadow-md transition-all disabled:opacity-100 disabled:cursor-auto text-center"
								disabled
								value={slotValue2}
							/>
							<Input
								className="flex 2xl:h-32 2xl:w-24 h-28 w-20 items-center justify-center border-y border-r rounded-md border-input 2xl:text-4xl text-3xl shadow-md transition-all disabled:opacity-100 disabled:cursor-auto text-center"
								disabled
								value={slotValue3}
							/>
						</div>
						<div className="flex flex-col space-y-3 items-center 2xl:py-36 py-8">
							<div className="space-x-3">
								<Button
									className="bg-black w-16 h-16 2xl:w-20 2xl:h-20 2xl:text-3xl text-2xl rounded-xl shadow-md hover:bg-black/60 hover:text-black/50"
									onClick={() => chooseNumbers(1)}
								>
									1
								</Button>
								<Button
									className="bg-black w-16 h-16 2xl:w-20 2xl:h-20 2xl:text-3xl text-2xl rounded-xl shadow-md hover:bg-black/60 hover:text-black/50"
									onClick={() => chooseNumbers(2)}
								>
									2
								</Button>
								<Button
									className="bg-black w-16 h-16 2xl:w-20 2xl:h-20 2xl:text-3xl text-2xl rounded-xl shadow-md hover:bg-black/60 hover:text-black/50"
									onClick={() => chooseNumbers(3)}
								>
									3
								</Button>
							</div>
							<div className="space-x-3">
								<Button
									className="bg-black w-16 h-16 2xl:w-20 2xl:h-20 2xl:text-3xl text-2xl rounded-xl shadow-md hover:bg-black/60 hover:text-black/50"
									onClick={() => chooseNumbers(4)}
								>
									4
								</Button>
								<Button
									className="bg-black w-16 h-16 2xl:w-20 2xl:h-20 2xl:text-3xl text-2xl rounded-xl shadow-md hover:bg-black/60 hover:text-black/50"
									onClick={() => chooseNumbers(5)}
								>
									5
								</Button>
								<Button
									className="bg-black w-16 h-16 2xl:w-20 2xl:h-20 2xl:text-3xl text-2xl rounded-xl shadow-md hover:bg-black/60 hover:text-black/50"
									onClick={() => chooseNumbers(6)}
								>
									6
								</Button>
							</div>
							<div className="space-x-3">
								<Button
									className="bg-black w-16 h-16 2xl:w-20 2xl:h-20 2xl:text-3xl text-2xl rounded-xl shadow-md hover:bg-black/60 hover:text-black/50"
									onClick={() => chooseNumbers(7)}
								>
									7
								</Button>
								<Button
									className="bg-black w-16 h-16 2xl:w-20 2xl:h-20 2xl:text-3xl text-2xl rounded-xl shadow-md hover:bg-black/60 hover:text-black/50"
									onClick={() => chooseNumbers(8)}
								>
									8
								</Button>
								<Button
									className="bg-black w-16 h-16 2xl:w-20 2xl:h-20 2xl:text-3xl text-2xl rounded-xl shadow-md hover:bg-black/60 hover:text-black/50"
									onClick={() => chooseNumbers(9)}
								>
									9
								</Button>
							</div>
							<div className="space-x-3">
								<Button
									className="bg-black w-16 h-16 2xl:w-20 2xl:h-20 2xl:text-3xl text-2xl rounded-xl shadow-md hover:bg-black/60 hover:text-black/50"
									onClick={() => chooseNumbers(0)}
								>
									0
								</Button>
							</div>
							<div className="space-x-10 py-4">
								<Button
									className="bg-[#EA0000] text-black 2xl:h-20 2xl:w-36 h-16 w-26 2xl:text-2xl text-xl rounded-xl shadow-md hover:bg-[#EA0000]/50 hover:text-white"
									onClick={clearNumbers}
								>
									Corrige
								</Button>
								<Button className="bg-white text-black 2xl:h-20 2xl:w-36 h-16 w-26 2xl:text-2xl text-xl rounded-xl shadow-md hover:bg-black/10">
									Branco
								</Button>
								<Button
									onClick={async () => {
										const selectedCod = Number(
											`${slotValue1}${slotValue2}${slotValue2}`,
										);
										const regime = regimes?.find(
											(item) => item.cod === selectedCod,
										);
										if (!regime) {
											toast.error(
												"O codigo selecionado não pertence a nenhuma opção disponivel",
											);
											return;
										}
										mutateAsync({
											votingId: idElection,
											userEnrollment: enrollment,
											politicalRegimeId: regime?.id,
										});
									}}
									className="text-black 2xl:h-20 2xl:w-36 h-16 w-26 2xl:text-2xl text-xl rounded-xl shadow-md"
								>
									Confirma
								</Button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default RegimeVote;
