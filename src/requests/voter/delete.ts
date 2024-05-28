import { api } from "../api";

export async function deleteVoter(idVoter: string) {
	await api.delete(`/voter/${idVoter}`);
}
