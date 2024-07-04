"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";

export interface TabItemProps {
	value: string | null;
	title: string;
	isSelected?: boolean;
}

const TabItem = ({ value, title, isSelected = false }: TabItemProps) => {
	return (
		<Tabs.Trigger
			value={value}
			className="mplus relative group px-1 pb-4 text-base font-medium text-zinc-500  hover:text-[#00E327]/60 data-[state=active]:text-[#00E327]/60 outline-none"
		>
			<span className="whitespace-nowrap group-focus-visible:ring-2 group-focus-visible:ring-green-400 rounded group-focus-visible:ring-offset-4">
				{title}
			</span>

			{isSelected && (
				<motion.div
					layoutId="activeTab"
					className="absolute -bottom-px left-0 right-0 h-0.5 bg-[#00E327]/60 dark:bg-violet-300"
				/>
			)}
		</Tabs.Trigger>
	);
};

export default TabItem;
