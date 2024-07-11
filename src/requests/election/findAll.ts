import { api } from "../api";

type electionProps = {
	id: string;
	name: string;
	class: number;
	candidates?: string[];
	politicalRegimes?: string[];
	govermentSystem?: string[];
	status: string;
};

export async function getAllElection(): Promise<electionProps[]> {
	const data = (await api.get("/election")).data.votings;
	return data;
}

export async function getOneElection(
	idElection: string,
): Promise<electionProps> {
	const response = await api.get(`/election/${idElection}`);
	const elections = response.data.data;
	return elections;
}
