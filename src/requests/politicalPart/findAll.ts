import { api } from "../api";

type politicalPartyProps = {
	name: string;
	partyClass: string;
	politicalTypeId: string;
	photo: any;
};

export async function getPoliticalParty(
	partyClass: string,
): Promise<politicalPartyProps[]> {
	const data = (await api.get(`political/${partyClass}`)).data.politicalPartys;
	return data;
}
