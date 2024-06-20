import plus from "@/img/plus.svg";
import Image from "next/image";
import Link from "next/link";
import dotsOpt from "@/img/three-dots.svg"
import { useRouter } from "next/navigation";

interface cardProps {
	title: string;
	fn: string;
	linkPage?: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	bgTailWind?: string;
}

const CardElection = ({ title, fn, linkPage="/eleitor/Matricula", bgTailWind="bg-[rgba(64,186,255,0.6)]"  }: cardProps) => {
  const router = useRouter();

	return (
		<div className="cursor-pointer transition-all hover:scale-[1.05]">
			<div className={`w-96 min-h-2 p-5 ${bgTailWind} drop-shadow-lg rounded-[18px]`}>
        <div className="flex justify-between">
          <span className="text-xl">{title}</span>
          <button className="w-[20px] h-[20px] relative">
            <Image src={dotsOpt} alt="Plus" fill />
          </button>
        </div>

        <div className="text-right">
          <a href={linkPage} className=" p-2 hover:bg-zinc-500 rounded-md">{fn}</a>
        </div>
			</div>
		</div>
	);
};

export default CardElection;
