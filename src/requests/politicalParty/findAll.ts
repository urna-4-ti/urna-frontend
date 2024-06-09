import { api } from "../api";

type politicalPartyProps = {
	id: string;
	name: string;
	class: string;
	politicalTypeId: string;
	photoUrl: string;
	politicalType: {
		name: string;
	};
};

export async function getPoliticalParty(
	partyClass: string,
): Promise<politicalPartyProps[]> {
	const data = (await api.get(`/political/${partyClass}`)).data.politicalPartys;
	return data;
}

export async function getPoliticalPartyId(
	id: string,
): Promise<politicalPartyProps> {
	const data = (await api.get(`/political/unique/${id}`)).data.politicalPartys;
	return data;
}

export async function getAllPoliticalParty(): Promise<politicalPartyProps[]> {
	const data = (await api.get("/political")).data.data;
	return data;
}
