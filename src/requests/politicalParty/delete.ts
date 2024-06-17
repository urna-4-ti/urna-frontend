import { api } from "../api";

export async function deletePoliticalParty(idPoliticalParty: string) {
	const response = await api.delete(`/political/${idPoliticalParty}`);

	return { response };
}
