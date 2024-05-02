import { api } from "../api";

export async function deleteCandidate(idCandidate: string) {
	await api.delete(`/candidate/${idCandidate}`);
}
