import { api, getFromLocalStorage } from "../api";

type electionProps = {
	id: string;
	name: string;
	class: number;
	candidates?: string[];
	politicalRegimes?: string[];
	govermentSystem?: string[];
};

export async function getAllElection(): Promise<electionProps[]> {
	const data = (await api.get("/election")).data.votings;
	return data;
}
