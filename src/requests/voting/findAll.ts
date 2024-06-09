import { api } from "../api";

type votingProps = {
	id: string;
	class: string;
	name: string;
};

export async function getVotings(): Promise<votingProps[]> {
	const data = (await api.get("/voting")).data.data;
	return data;
}

export async function getVotingId(idVoting: string): Promise<votingProps> {
	const response = await api.get(`/voting/${idVoting}`);
	const votings = response.data.data;
	return votings;
}
