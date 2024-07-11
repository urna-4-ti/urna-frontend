import plus from "@/img/plus.svg";
import dotsOpt from "@/img/three-dots.svg";
import { editElection } from "@/requests/election/edit";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface cardProps {
	title: string;
	fn: string;
	fn2?: string;
	itemId?: string;
	linkPage?: string;
	linkPage2?: string;
	bgTailWind?: string;
}

const CardElection = ({
	title,
	fn,
	fn2,
	itemId,
	linkPage = "/eleitor/Matricula",
	linkPage2,
	bgTailWind = "bg-[rgba(0,227,39,0.6)]",
}: cardProps) => {
	const router = useRouter();
	const { mutateAsync } = useMutation({
		mutationKey: ["update eletion status"],
		mutationFn: editElection,
	});

	return (
		<div className="cursor-pointer transition-all hover:scale-[1.05] text-white text-lg font-semibold">
			<div
				className={`2xl:w-96 w-80 min-h-20 p-5 ${bgTailWind} drop-shadow-lg space-y-4 rounded-[18px]`}
			>
				<div className="flex justify-start">
					<span className="text-xl">{title}</span>
				</div>

				{fn === "Iniciar" && (
					<div className="text-right">
						<Link
							onClick={async () => {
								if (fn === "Iniciar") {
									await mutateAsync({
										status: "IN_PROGRESS",
										electionId: itemId ?? "",
									});
								}
							}}
							href={linkPage}
							className=" p-2 hover:bg-zinc-500/15 rounded-md"
						>
							{fn}
						</Link>
					</div>
				)}
				{fn === "Votar" && fn2 === "Finalizar" && (
					<div className="flex items-center justify-between">
						<Link
							onClick={async () => {
								if (fn2 === "Finalizar") {
									await mutateAsync({
										status: "DONE",
										electionId: itemId ?? "",
									});
								}
							}}
							href={linkPage}
							className=" p-2 hover:bg-zinc-500/15 rounded-md"
						>
							{fn2}
						</Link>
						<Link
							href={linkPage}
							className="p-2 hover:bg-zinc-500/15 rounded-md"
						>
							{fn}
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default CardElection;
