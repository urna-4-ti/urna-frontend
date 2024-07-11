import { api } from "../api";

export async function deletePoliticalRegime(idPoliticalRegime: string) {
	const response = await api.delete(`/politicalRegime/${idPoliticalRegime}`);

	return { response };
}
