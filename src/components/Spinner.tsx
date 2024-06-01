import { Loader2 } from "lucide-react";

const Spinner = () => {
	return (
		<div className="w-full h-1/2 flex justify-center items-center">
			<Loader2 className="animate-spin text-zinc-500" size={40} />
		</div>
	);
};

export default Spinner;
