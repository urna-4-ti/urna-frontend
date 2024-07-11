import { api } from "../api";

type votersProps = {
	id: string;
	name: string;
	email: string;
	class: string;
	enrollment: string;
};

export async function getVoters(): Promise<votersProps[]> {
	const data = (await api.get("/voter")).data.data;
	return data;
}

export async function getVoterId(
	idVoter: string,
	electionId?: string | undefined,
): Promise<votersProps> {
	const response = (await api.get(`/voter/${idVoter}/${electionId}`)).data.data;
	return response;
}
