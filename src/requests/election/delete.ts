import { api } from "../api";

export async function deleteVote(idVote: string) {
	await api.delete(`/vote/${idVote}`);
}
