"use client";

import hamburguer from "@/img/hamburguer.svg";
import plus from "@/img/plus.svg";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Tabs from "@radix-ui/react-tabs";
import { useQueryState } from "next-usequerystate";
import { useEffect, useState } from "react";
import Card from "../card";
import CardElection from "../card-election";
import TabItem from "./TabItem";

const SettingsTabs = () => {
	const [parent] = useAutoAnimate();
	const [currentTab, setCurrentTab] = useState("voting");
	const [tab = "voting", setTab] = useQueryState("table");
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

	return (
		<Tabs.Root
			value={currentTab}
			onValueChange={handleTabChange}
			className="px-10 mt-6"
		>
			<ScrollArea.Root className="w-full" type="scroll">
				<ScrollArea.Viewport className="w-full overflow-x-scroll">
					<Tabs.List className="mt-6 flex w-full items-center gap-4 border-b border-zinc-200 dark:border-zinc-700">
						<TabItem
							value="voting"
							title="Eleições"
							isSelected={currentTab === "voting"}
						/>
						<TabItem
							value="create"
							title="Cadastrar"
							isSelected={currentTab === "create"}
						/>
						<TabItem
							value="list"
							title="Listagem"
							isSelected={currentTab === "list"}
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
			<Tabs.Content value="voting" ref={parent}>
				<div className="h-[70vh] flex items-center px-20">
					<div className="w-full space-x-10 flex justify-center">
						<Card
							title={"Votação"}
							fn={"Cadastrar"}
							linkPage={"/admin/create/vote"}
							image={plus}
						/>
						<Card
							title={"Votação"}
							fn={"Listar"}
							linkPage={"/admin/list/vote"}
							image={hamburguer}
						/>
					</div>
				</div>
			</Tabs.Content>
			<Tabs.Content value="create" ref={parent}>
				<div className="h-[70vh] flex items-center px-20">
					<div className="w-full space-x-4 flex justify-between">
						<Card
							title={"Sistema de Governo"}
							fn={"Cadastrar"}
							linkPage={"/admin/create/government"}
							image={plus}
						/>
						<Card
							title={"Partido"}
							fn={"Cadastrar"}
							linkPage={"/admin/create/politicalParty"}
							image={plus}
						/>
						<Card
							title={"Eleitor"}
							fn={"Cadastrar"}
							linkPage={"/admin/create/voter"}
							image={plus}
						/>
						<Card
							title={"Candidato"}
							fn={"Cadastrar"}
							linkPage={"/admin/create/candidate"}
							image={plus}
						/>
					</div>
				</div>
			</Tabs.Content>
			<Tabs.Content value="list" ref={parent}>
				<div className="h-[70vh] flex items-center px-20">
					<div className="w-full flex space-x-4 justify-between">
						<Card
							title={"Sistema de Governo"}
							fn={"Listar"}
							linkPage={"/admin/list/government"}
							image={hamburguer}
						/>
						<Card
							title={"Partido"}
							fn={"Listar"}
							linkPage={"/admin/list/politicalParty"}
							image={hamburguer}
						/>
						<Card
							title={"Eleitor"}
							fn={"Listar"}
							linkPage={"/admin/list/voter"}
							image={hamburguer}
						/>
						<Card
							title={"Candidato"}
							fn={"Listar"}
							linkPage={"/admin/list/candidate"}
							image={hamburguer}
						/>
					</div>
				</div>
			</Tabs.Content>
		</Tabs.Root>
	);
};

export default SettingsTabs;
