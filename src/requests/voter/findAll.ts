import { api } from "../api";
export async function getVoters(partyClass: string) {
	const data = (await api.get(`voter/${partyClass}`)).data.data;
	return data;
}
