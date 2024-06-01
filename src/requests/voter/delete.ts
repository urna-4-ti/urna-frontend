import { api } from "../api";

export async function deleteVoter(idVoter: string) {
	const response = await api.delete(`/voter/${idVoter}`);
	return { response };
}
