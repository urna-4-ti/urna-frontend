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
	token: string,
): Promise<votersProps> {
	console.log(token);

	const response = await api.get(`/voter/${idVoter}`);
	const voters = response.data.data;
	return voters;
}
