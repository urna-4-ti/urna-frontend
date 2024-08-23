"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import cloudBottomMid from "@/img/cloud-bottom-mid.svg";
import cloudBottomRight from "@/img/cloud-bottom-right.svg";
import cloudTopRight from "@/img/cloud-top-right.svg";
import iconBack from "@/img/icon-back.svg";
import logo from "@/img/logo-name.svg";
import { classes } from "@/lib/Classes";
import type {
	candidateProps,
	formGovernmentProps,
	politicalRegimeProps,
} from "@/lib/typing";
import { getClassCandidate } from "@/requests/candidate/findAll";
import { createElection } from "@/requests/election/create";
import { getGovernmentForm } from "@/requests/government/findAll";
import { getPoliticalRegimes } from "@/requests/politicalRegime/findAll";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
	name: z
		.string({ message: "*Este campo ainda não foi preenchido." })
		.min(3, "*O nome de partido deve conter pelo menos 3 caracteres."),
	class: z
		.string({ message: "*Este campo ainda não foi preenchido." })
		.refine((value) => value.length > 0, {
			message: "*Este campo ainda não foi preenchido.",
		}),
	candidate: z.string().array().optional(),
	government: z.string().array().optional(),
	regime: z.string().array().optional(),
});

type formProps = z.infer<typeof schema>;

const createVote = () => {
	const [parent] = useAutoAnimate();
	const router = useRouter();
	const [selectValue, setSelectValue] = useState("");
	const [selectGovernmentValue, setGovernmentValue] = useState("");
	const [selectRegimeValue, setSelectRegimeValue] = useState("");
	const [selectCandidateValue, setSelectCandidateValue] = useState("");
	const [openDialog, setOpenDialog] = useState(false);
	const [saveGovernment, setGovernment] = useState<formGovernmentProps[]>([
		{
			id: "",
			name: "",
			cod: 0,
			description: "",
		},
	]);

	const [saveRegime, setRegime] = useState<politicalRegimeProps[]>([
		{
			id: "",
			name: "",
			cod: 0,
		},
	]);
	const [saveCandidate, setCandidate] = useState<candidateProps[]>([
		{
			id: "",
			name: "",
			cod: 0,
			picPath: "",
			description: "",
			politicalPartyId: "",
			email: "",
			PoliticalParty: {
				class: "",
			},
		},
	]);

	const {
		handleSubmit,
		register,
		watch,
		setValue,
		formState: { errors },
	} = useForm<formProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
	});

	const { data: candidates, refetch } = useQuery({
		queryKey: ["get-politicalParty", selectValue],
		queryFn: () => getClassCandidate(selectValue),
		enabled: !!selectValue,
	});
	const { data: governmentsForms } = useQuery({
		queryKey: ["get-government-form"],
		queryFn: getGovernmentForm,
	});

	const { data: regimes } = useQuery({
		queryKey: ["get-regimes"],
		queryFn: getPoliticalRegimes,
	});

	const { mutateAsync, isError } = useMutation({
		mutationKey: ["createCandidate"],
		mutationFn: createElection,
	});

	const filteredGovernments = governmentsForms?.filter((item) => {
		if (selectGovernmentValue) {
			return item.id
				.toLowerCase()
				.includes(selectGovernmentValue.toLowerCase());
		}
	});

	const filteredRegimes = regimes?.filter((item) => {
		if (selectRegimeValue) {
			return item.id.toLowerCase().includes(selectRegimeValue.toLowerCase());
		}
	});

	const filteredCandidates = candidates?.filter((item) => {
		if (selectCandidateValue) {
			return item.id.toLowerCase().includes(selectCandidateValue.toLowerCase());
		}
	});

	const availableGovernments = governmentsForms?.filter((item) => {
		return !saveGovernment.find((x) => x.id === item.id);
	});

	const availableRegimes = regimes?.filter((item) => {
		return !saveRegime.find((x) => x.id === item.id);
	});

	const availableCandidates = candidates?.filter((item) => {
		return !saveCandidate.find((x) => x.id === item.id);
	});

	const listGovernment = filteredGovernments?.map((item) => {
		return {
			...item,
		};
	});
	const listRegimes = filteredRegimes?.map((item) => {
		return {
			...item,
		};
	});

	const listCandidate = filteredCandidates?.map((item) => {
		return {
			...item,
		};
	});

	const handleAddData = () => {
		if (listGovernment) {
			if (saveGovernment[0] && saveGovernment[0].id !== "") {
				setGovernment((prev) => [...prev, ...listGovernment]);
			} else {
				setGovernment([...listGovernment]);
			}
		}
		if (listRegimes) {
			if (saveRegime[0] && saveRegime[0].id !== "") {
				setRegime((prev) => [...prev, ...listRegimes]);
			} else {
				setRegime([...listRegimes]);
			}
		}
		if (listCandidate) {
			if (saveCandidate[0] && saveCandidate[0].id !== "") {
				setCandidate((prev) => [
					...prev,
					...listCandidate.map((item) => ({
						...item,
						cod: Number.parseInt(item.cod),
					})),
				]);
			} else {
				setCandidate([
					...listCandidate.map((item) => ({
						...item,
						cod: Number.parseInt(item.cod),
					})),
				]);
			}
		}
		setSelectCandidateValue("");
		setSelectRegimeValue("");
		setGovernmentValue("");
	};

	const handleRemoveData = (id: string, name: string) => {
		if (name === "government") {
			setGovernment(saveGovernment.filter((item) => item.id !== id));
		}
		if (name === "regime") {
			setRegime(saveRegime.filter((item) => item.id !== id));
		}
		if (name === "candidate") {
			setCandidate(saveCandidate.filter((item) => item.id !== id));
		}
	};

	const handleForm = (data: formProps) => {
		const inviteForm = async () => {
			const { response } = await mutateAsync({
				name: data.name,
				className: data.class,
				politicalRegimes: data?.regime,
				candidates: data?.candidate,
				governmentSystems: data?.government,
			});
			console.log(response);

			if (response) {
				return true;
			}
		};
		toast.promise(inviteForm, {
			loading: "Carregando...",
			duration: 4000,
			success: () => {
				router.back();
				return "Eleição Registrada";
			},
			error: (error) => {
				switch (error.response.status) {
					case 500:
						return "Algum campo não foi preenchido.";
					default:
						return "Erro ao registrar a Eleição.";
				}
			},
			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});
		// console.log(data.government)
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setValue(
			"regime",
			saveRegime.map((item) => item.id),
		);
	}, [saveRegime]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setValue(
			"candidate",
			saveCandidate.map((item) => item.id),
		);
	}, [saveCandidate]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setValue(
			"government",
			saveGovernment.map((item) => item.id),
		);
	}, [saveGovernment]);

	return (
		<>
			<main className="grid grid-cols-3 mx-auto min-h-screen">
				<div className="bg-primary py-16 p-16">
					<Image src={logo} alt="Logo da IFUrna" />
				</div>
				<div className="col-span-2 relative flex justify-center items-center">
					<Image
						className="absolute top-0 right-0 select-none"
						src={cloudTopRight}
						alt="Nuvem direita-cima"
					/>
					<Image
						className="absolute bottom-0 right-0 select-none"
						src={cloudBottomRight}
						alt="Nuvem direita-baixo"
					/>
					<Image
						className="absolute bottom-0 left-28 select-none"
						src={cloudBottomMid}
						alt="Nuvem direita-baixo"
					/>

					{/* <div className="flex items-center px-5 absolute 2xl:top-28 top-14 left-24 2xl:left-52 select-none">
						<Button
							className="hover:bg-transparent"
							variant="ghost"
							onClick={() => router.back()}
						>
							<Image
								className="h-12 2xl:h-14 2xl:w-14 w-12"
								src={iconBack}
								alt="Ícone voltar"
							/>
						</Button>
					</div> */}

					<Card className="2xl:w-[38rem] w-[30rem]  shadow-xl fixed">
						<CardHeader>
							<CardTitle className="text-4xl 2xl:text-5xl px-2 2xl:pt-10 2xl:pb-6 pt-6 font-normal">
								Cadastrar Votação
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form
								className="space-y-2 2xl:space-y-4 mplus"
								onSubmit={handleSubmit(handleForm)}
							>
								<div className="space-y-2.5" ref={parent}>
									<Label
										className="text-base 2xl:text-lg font-normal text-muted-foreground"
										htmlFor="name"
									>
										Nome
									</Label>
									<Input
										className="2xl:h-[48px] h-[40px] 2xl:text-xl border-black focus:border-primary 2xl:placeholder:text-lg"
										placeholder="Digite..."
										id="name"
										type="text"
										{...register("name")}
									/>
									{errors.name && (
										<p className="text-red-500 text-sm">
											{errors.name.message}
										</p>
									)}
								</div>

								<div className="space-y-2.5" ref={parent}>
									<Label
										className="text-base 2xl:text-lg font-normal text-muted-foreground"
										htmlFor="select1"
									>
										Turma
									</Label>
									<Select
										onValueChange={(value) => {
											setValue("class", value);
											setSelectValue(value);
										}}
										value={selectValue}
										{...register("class")}
									>
										<SelectTrigger
											className="h-[40px] 2xl:h-[48px] 2xl:text-xl border-black focus:border-primary text-base text-muted-foreground"
											id="select1"
										>
											<SelectValue
												className="2xl:placeholder:text-lg"
												placeholder="Selecione uma Turma"
											/>
										</SelectTrigger>
										<SelectContent>
											<SelectGroup className="h-28 text-sm 2xl:h-32">
												<SelectLabel className="2xl:text-xl">
													Turmas
												</SelectLabel>
												{classes.map((item) => (
													<SelectItem
														className="2xl:text-lg"
														key={item.class}
														value={item.class}
													>
														{item.name}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									{errors.class && (
										<p className="text-red-500 text-sm">
											{errors.class.message}
										</p>
									)}
								</div>

								<div className="space-y-2.5 flex justify-end">
									<Button
										type="button"
										className="text-lg hover:text-black/40 text-black hover:bg-black/5 font-normal bg-transparent border border-black hover:border-black/30"
										onClick={() => setOpenDialog(true)}
									>
										Adicionar opções
									</Button>
								</div>

								<div className="flex justify-center 2xl:py-8 py-4">
									<Button
										type="submit"
										className="w-full 2xl:h-[48px] h-[42px] rounded-2xl text-lg font-bold bg-primary"
									>
										Cadastrar
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</main>
			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogContent className="sm:max-w-xl bg-white">
					<DialogHeader>
						<DialogTitle className="text-2xl mplus">
							Adicionar Opções
						</DialogTitle>
						<DialogDescription>
							{
								"Adicione candidatos(as), formas de governo e sistemas de governo para criar uma votação."
							}
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col space-y-4">
						<div className="grid grid-cols-2 ">
							<div className="space-y-2.5 px-2 py-2" ref={parent}>
								<Label
									className="text-base 2xl:text-lg font-normal text-muted-foreground"
									htmlFor="select1"
								>
									Forma de Governo
								</Label>
								<Select
									onValueChange={(value) => {
										setGovernmentValue(value);
									}}
									value={selectGovernmentValue}
									// {...register("govermentSystem")}
								>
									<SelectTrigger
										className="2xl:text-lg focus:border-primary text-base text-muted-foreground w-full"
										id="select1"
									>
										<SelectValue
											className="2xl:placeholder:text-base placeholder:text-xs"
											placeholder="Forma de Governo"
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectGroup className="h-28 text-sm 2xl:h-32">
											<SelectLabel className="2xl:text-xl">
												Forma de Governo
											</SelectLabel>
											{availableGovernments?.map((item) => (
												<SelectItem
													className="2xl:text-lg"
													key={item.id}
													value={item.id}
												>
													{item.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								{/* {errors.govermentSystem && (
									<p className="text-red-500 text-sm">
										{errors.govermentSystem.message}
									</p>
								)} */}
							</div>
							<div className="space-y-2.5 py-2 px-2" ref={parent}>
								<Label
									className="text-base 2xl:text-lg font-normal text-muted-foreground"
									htmlFor="select1"
								>
									Sistema de Governo
								</Label>
								<Select
									onValueChange={(value) => {
										setSelectRegimeValue(value);
									}}
									value={selectRegimeValue}
									// {...register("politicalRegimes")}
								>
									<SelectTrigger
										className="2xl:text-lg focus:border-primary text-base text-muted-foreground w-full"
										id="select1"
									>
										<SelectValue
											className="2xl:placeholder:text-base placeholder:text-sm"
											placeholder="Sistema de Governo"
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectGroup className="h-28 text-sm 2xl:h-32">
											<SelectLabel className="2xl:text-xl">
												Sistema de Governo
											</SelectLabel>
											{availableRegimes?.map((item) => (
												<SelectItem
													className="2xl:text-lg"
													key={item.id}
													value={item.id}
												>
													{item.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								{/* {errors.politicalRegimes && (
									<p className="text-red-500 text-sm">
										{errors.politicalRegimes.message}
									</p>
								)} */}
							</div>
							<div className="space-y-2.5 py-2 px-2" ref={parent}>
								<Label
									className="text-base 2xl:text-lg font-normal text-muted-foreground"
									htmlFor="select1"
								>
									Candidatos
								</Label>
								<Select
									onValueChange={(value) => {
										setSelectCandidateValue(value);
									}}
									value={selectCandidateValue}
									// {...register("candidates")}
								>
									<SelectTrigger
										className="2xl:text-lg focus:border-primary text-base text-muted-foreground w-full"
										id="select1"
									>
										<SelectValue
											className="2xl:placeholder:text-base placeholder:text-sm"
											placeholder="Candidatos"
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectGroup className="h-28 text-sm 2xl:h-32">
											<SelectLabel className="2xl:text-xl">
												Candidatos
											</SelectLabel>
											{availableCandidates?.map((item) => (
												<SelectItem
													className="2xl:text-lg"
													key={item.id}
													value={item.id}
												>
													{item.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								{/* {errors.candidates && (
									<p className="text-red-500 text-sm">
										{errors.candidates.message}
									</p>
								)} */}
							</div>
						</div>
						<div className="w-full grid grid-cols-4">
							{saveGovernment?.map(
								(item) =>
									// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
									item.id !== "" && (
										<Card
											className="group min-w-16 cursor-pointer max-w-32 rounded-xl bg-primary/60 hover:bg-red-400 flex items-center justify-around mt-2"
											key={item.id}
											onClick={() => handleRemoveData(item.id, "government")}
										>
											<p className="text-sm block">{item.name}</p>
										</Card>
									),
							)}
							{saveRegime?.map(
								(item) =>
									// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
									item.id !== "" && (
										<Card
											className="group min-w-16 cursor-pointer max-w-32 rounded-xl bg-primary/60 hover:bg-red-400 flex items-center justify-around mt-2"
											key={item.id}
											onClick={() => handleRemoveData(item.id, "regime")}
										>
											<p className="text-sm block">{item.name}</p>
										</Card>
									),
							)}
							{saveCandidate?.map(
								(item) =>
									// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
									item.id !== "" && (
										<Card
											className="group min-w-16 cursor-pointer max-w-32 rounded-xl bg-primary/60 hover:bg-red-400 flex items-center justify-around mt-2"
											key={item.id}
											onClick={() => handleRemoveData(item.id, "candidate")}
										>
											<p className="text-sm block">{item.name}</p>
										</Card>
									),
							)}
						</div>
					</div>
					<DialogFooter>
						<Button
							type="submit"
							onClick={() => {
								handleAddData();
							}}
						>
							Adicionar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default createVote;
