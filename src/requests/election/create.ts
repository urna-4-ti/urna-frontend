import { api, axiosConfig } from "../api";

type electionProps = {
	name: string;
	className: string;
	candidates?: string[] | undefined;
	politicalRegimes?: string[] | undefined;
	governmentSystems?: string[] | undefined;
};

export async function createElection({
	name,
	className,
	candidates,
	politicalRegimes,
	governmentSystems,
}: electionProps) {
	const formdata = new FormData();

	formdata.append("name", name);
	formdata.append("class", className);
	candidates?.map((candidate) => formdata.append("candidates", candidate));
	politicalRegimes?.map((regime) =>
		formdata.append("politicalRegimes", regime),
	);

	governmentSystems?.map((system) =>
		formdata.append("governmentSystems", system),
	);

	const response = await api.post("/election", formdata, axiosConfig);

	return { response };
}
