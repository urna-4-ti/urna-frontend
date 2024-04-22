import { api } from "../api";

type politicalPartyProps = {
	id: string;
	name: string;
	partyClass: string;
	politicalTypeId: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	photo: any;
};

export async function getPoliticalParty(
	partyClass: string,
): Promise<politicalPartyProps[]> {
	const data = (await api.get(`political/${partyClass}`)).data.politicalPartys;
	return data;
}
