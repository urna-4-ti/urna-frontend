import { api } from "../api";

type electionProps = {
	id: string;
	name: string;
	class: number;
	status: string;
};

export async function getAllElection(): Promise<electionProps[]> {
	const data = (await api.get("/election")).data.votings;
	return data;
}
