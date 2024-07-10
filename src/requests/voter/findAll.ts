import { api } from "../api";

type votersProps = {
	id: string;
	class: string;
	email: string;
	enrollment: string;
	name: string;
};

export async function getVoters(): Promise<votersProps[]> {
	const data = (await api.get("/voter")).data.data;
	return data;
}

export async function getVoterId(
	idVoter: string,
	electionId?: string | undefined,
): Promise<votersProps> {
	const response = await api.get(`/voter/${idVoter}/${electionId}`);
	const voters = response.data.data;
	return voters;
}
