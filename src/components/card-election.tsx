import plus from "@/img/plus.svg";
import Image from "next/image";
import Link from "next/link";
import dotsOpt from "@/img/three-dots.svg"

interface cardProps {
	title: string;
	fn: string;
	linkPage: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	bgTailWind?: string;
}

const CardElection = ({ title, fn, linkPage, bgTailWind="bg-[rgba(64,186,255,0.6)]"  }: cardProps) => {
	return (
		<Link href={linkPage} className="transition-all hover:scale-[1.05]">
			<div className={`w-96 min-h-2 p-5 ${bgTailWind} drop-shadow-lg rounded-[18px]`}>
        <div className="flex justify-between">
          <span className="text-xl">{title}</span>
          <button className="w-[20px] h-[20px] relative">
            <Image src={dotsOpt} alt="Plus" fill />
          </button>
        </div>

        <div className="text-right">
          <button className=" p-2 hover:bg-zinc-500 rounded-md">{fn}</button>
        </div>
			</div>
		</Link>
	);
};

export default CardElection;
