import { api } from "../api";

export async function deleteVoting(idVoting: string) {
	await api.delete(`/voting/${idVoting}`);
}
