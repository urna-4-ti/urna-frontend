import plus from "@/img/plus.svg";
import Image from "next/image";
import Link from "next/link";

interface cardProps {
	title: string;
	fn: string;
	linkPage: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	image: any;
}

const Card = ({ title, fn, linkPage, image }: cardProps) => {
	return (
		<Link href={linkPage}>
			<div className="w-52 2xl:px-2 2xl:w-72 2xl:h-64 h-48 bg-[rgba(0,227,39,0.6)] drop-shadow-lg rounded-[30px]">
				<div className="flex items-center justify-center space-x-4 2xl:space-x-6 py-6 2xl:py-8">
					<div className="h-[26px] w-[26px] 2xl:h-[31px] 2xl:w-[31px] relative">
						<Image src={image} alt="Plus" fill />
					</div>
					<p className="text-white font-bold text-2xl 2xl:text-3xl">{fn}</p>
				</div>
				<div className="flex justify-center py-4 2xl:py-6">
					<span className="text-white font-bold text-3xl 2xl:text-4xl text-center">
						{title}
					</span>
				</div>
			</div>
		</Link>
	);
};

export default Card;
