import { api, axiosConfig } from "../api";

type politicalPartyProps = {
	name: string;
	partyClass: string;
	politicalTypeId: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	photo: any;
};

export async function createPoliticalParty({
	name,
	partyClass,
	politicalTypeId,
	photo,
}: politicalPartyProps) {
	const formdata = new FormData();

	formdata.append("name", name);
	formdata.append("class", partyClass);
	formdata.append("politicalTypeId", politicalTypeId);
	formdata.append("photo", photo[0]);

	await api.post("/political", formdata, axiosConfig);
}
