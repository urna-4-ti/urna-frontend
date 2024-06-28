import plus from "@/img/plus.svg";
import dotsOpt from "@/img/three-dots.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface cardProps {
	title: string;
	fn: string;
	linkPage?: string;
	bgTailWind?: string;
}

const CardElection = ({
	title,
	fn,
	linkPage = "/eleitor/Matricula",
	bgTailWind = "bg-[rgba(64,186,255,0.6)]",
}: cardProps) => {
	const router = useRouter();

	return (
		<div className="cursor-pointer transition-all hover:scale-[1.05]">
			<div
				className={`w-96 min-h-2 p-5 ${bgTailWind} drop-shadow-lg space-y-4 rounded-[18px]`}
			>
				<div className="flex justify-between">
					<span className="text-xl">{title}</span>
					<Button variant="ghost" className="w-[20px] h-[20px] relative">
						<Image src={dotsOpt} alt="Plus" fill />
					</Button>
				</div>

				<div className="text-right">
					<Link
						href={linkPage}
						className=" p-2 hover:bg-zinc-500/15 rounded-md"
					>
						{fn}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CardElection;
