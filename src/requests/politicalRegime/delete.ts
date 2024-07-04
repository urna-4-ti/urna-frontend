import { api } from "../api";

export async function deletePoliticalRegime(idPoliticalRegime: string) {
	await api.delete(`/political/${idPoliticalRegime}`);
}
