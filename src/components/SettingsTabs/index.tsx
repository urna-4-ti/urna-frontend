"use client";

import hamburguer from "@/img/hamburguer.svg";
import plus from "@/img/plus.svg";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import Card from "../card";
import TabItem from "./TabItem";

const SettingsTabs = () => {
	const [parent] = useAutoAnimate();
	const [currentTab, setCurrentTab] = useState("tab1");
	return (
		<Tabs.Root
			value={currentTab}
			onValueChange={setCurrentTab}
			className="px-10 mt-6"
		>
			<ScrollArea.Root className="w-full" type="scroll">
				<ScrollArea.Viewport className="w-full overflow-x-scroll">
					<Tabs.List className="mt-6 flex w-full items-center gap-4 border-b border-zinc-200 dark:border-zinc-700">
						<TabItem
							value="tab1"
							title="Cadastros"
							isSelected={currentTab === "tab1"}
						/>
						<TabItem
							value="tab2"
							title="Listagens"
							isSelected={currentTab === "tab2"}
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
			<Tabs.Content value="tab1" ref={parent}>
				<div className="h-[70vh] flex items-center px-36">
					<div className="w-full flex justify-between">
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
			<Tabs.Content value="tab2" ref={parent}>
				<div className="h-[70vh] flex items-center px-36">
					<div className="w-full flex justify-between">
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
