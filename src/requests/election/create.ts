import { api, axiosConfig } from "../api";

type electionProps = {
	name: string;
	className: string;
	candidates?: string[] | undefined;
	politicalRegimes?: string[] | undefined;
	govermentSystem?: string[] | undefined;
};

export async function createElection({
	name,
	className,
	candidates,
	politicalRegimes,
	govermentSystem,
}: electionProps) {
	const formdata = new FormData();

	formdata.append("name", name);
	formdata.append("class", className);
	candidates?.map((candidate) => formdata.append("candidates", candidate));
	politicalRegimes?.map((regime) =>
		formdata.append("politicalRegimes", regime),
	);

	govermentSystem?.map((system) => formdata.append("govermentSystem", system));

	console.log(formdata);

	const response = await api.post("/election", formdata, axiosConfig);

	return { response };
}
