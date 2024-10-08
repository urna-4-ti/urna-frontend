"use client";

import filter from "@/img/filter.svg";
import iconBack from "@/img/icon-back.svg";
import { getAllElection } from "@/requests/election/findAll";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Tabs from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "next-usequerystate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "../card-election";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import TabItem from "./TabItem";

const SettingsTabsVote = () => {
	const router = useRouter();
	const [parent] = useAutoAnimate();
	const [currentTab, setCurrentTab] = useState("peding");
	const [tab = "voting", setTab] = useQueryState("table");

	const { data: elections } = useQuery({
		queryKey: ["get-elections"],
		queryFn: getAllElection,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (tab) {
			setCurrentTab(tab);
		}
	}, []);

	const handleTabChange = (value: string) => {
		setCurrentTab(value);
		setTab(value);
	};

	//FILTROS: CREATED, IN_PROGRESS, DONE
	const created = elections?.filter((election) => {
		return election.status === "CREATED";
	});

	const progress = elections?.filter((election) => {
		return election.status === "IN_PROGRESS";
	});

	const done = elections?.filter((election) => {
		return election.status === "DONE";
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		console.log(elections);
	}, []);

	return (
		<Tabs.Root
			value={currentTab}
			onValueChange={handleTabChange}
			className="px-10 pt-6"
		>
			<ScrollArea.Root className="w-full" type="scroll">
				<ScrollArea.Viewport className="w-full overflow-x-scroll">
					<Tabs.List className="flex w-full items-center gap-4 border-b border-zinc-200 dark:border-zinc-700">
						<TabItem
							value="peding"
							title="Pendente"
							isSelected={currentTab === "peding"}
						/>
						<TabItem
							value="in-progress"
							title="Em andamento"
							isSelected={currentTab === "in-progress"}
						/>
						<TabItem
							value="completed"
							title="Concluídas"
							isSelected={currentTab === "completed"}
						/>
					</Tabs.List>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar
					className="flex h-0.5 translate-y-1.5 touch-none select-none flex-col bg-zinc-100"
					orientation="horizontal"
				>
					<ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300" />
				</ScrollArea.Scrollbar>
			</ScrollArea.Root>
			<Tabs.Content value="peding" ref={parent}>
				<div className="flex flex-col justify-start items-center py-10 px-12">
					<div className="grid grid-cols-navVote 2xl:px-0 w-full">
						<div className="flex items-center px-5">
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
						</div>
						<div className="flex justify-beetween items-center 2xl:px-36">
							<div className="flex items-center justify-center">
								<Button className="hover:bg-transparent" variant="ghost">
									<Image
										className="h-10 w-10 2xl:h-12 2xl:w-12"
										src={filter}
										alt="Filtro"
									/>
								</Button>
								<Input
									className="2xl:w-[387px] w-[287px] bg-[#F0F0F0] text-[#747474] 2xl:h-10 border-transparent"
									type="text"
									placeholder="Pesquisar..."
									// onChange={(e) => setSearch(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div className="w-full flex justify-center py-16">
						<div className="grid grid-cols-bodyVote">
							{created?.map((item) => (
								<div
									className="flex justify-center items-center py-4"
									key={item.id}
								>
									<Card
										title={item.name}
										fn={"Iniciar"}
										itemId={item.id}
										linkPage={`/election/${item.id}/registration`}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</Tabs.Content>
			<Tabs.Content value="in-progress" ref={parent}>
				<div className="flex flex-col justify-start items-center py-10 px-12">
					<div className="grid grid-cols-navVote 2xl:px-0 w-full">
						<div className="flex items-center px-5">
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
						</div>
						<div className="flex justify-beetween items-center 2xl:px-36">
							<div className="flex items-center justify-center">
								<Button className="hover:bg-transparent" variant="ghost">
									<Image
										className="h-10 w-10 2xl:h-12 2xl:w-12"
										src={filter}
										alt="Filtro"
									/>
								</Button>
								<Input
									className="2xl:w-[387px] w-[287px] bg-[#F0F0F0] text-[#747474] 2xl:h-10 border-transparent"
									type="text"
									placeholder="Pesquisar..."
									// onChange={(e) => setSearch(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div className="w-full flex justify-center py-16">
						<div className="grid grid-cols-bodyVote">
							{progress?.map((item) => (
								<div
									className="flex justify-center items-center py-4"
									key={item.id}
								>
									<Card
										title={item.name}
										fn2="Finalizar"
										fn={"Votar"}
										itemId={item.id}
										linkPage={`/election/${item.id}/registration`}
										linkPage2="/admin/list/vote?table=completed"
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</Tabs.Content>
			<Tabs.Content value="completed" ref={parent}>
				<div className="flex flex-col justify-start items-center py-10 px-12">
					<div className="grid grid-cols-navVote 2xl:px-0 w-full">
						<div className="flex items-center px-5">
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
						</div>
						<div className="flex justify-beetween items-center 2xl:px-36">
							<div className="flex items-center justify-center">
								<Button className="hover:bg-transparent" variant="ghost">
									<Image
										className="h-10 w-10 2xl:h-12 2xl:w-12"
										src={filter}
										alt="Filtro"
									/>
								</Button>
								<Input
									className="2xl:w-[387px] w-[287px] bg-[#F0F0F0] text-[#747474] 2xl:h-10 border-transparent"
									type="text"
									placeholder="Pesquisar..."
									// onChange={(e) => setSearch(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div className="w-full flex justify-center py-16">
						<div className="grid grid-cols-bodyVote">
							{done?.map((item) => (
								<div
									className="flex justify-center items-center py-4"
									key={item.id}
								>
									<Card
										title={item.name}
										fn={"Resultados"}
										itemId={item.id}
										linkPage={`/election/${item.id}/result`}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</Tabs.Content>
		</Tabs.Root>
	);
};

export default SettingsTabsVote;
