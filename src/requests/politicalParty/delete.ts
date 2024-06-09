import { api } from "../api";

export async function deletePoliticalParty(idPoliticalParty: string) {
	await api.delete(`/political/${idPoliticalParty}`);
}
