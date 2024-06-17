import { api, axiosConfig } from "../api";

type politicalPartyProps = {
	name: string;
	partyClass: string;
	politicalTypeId: string;
	photo?: string;
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
	if (photo) {
		formdata.append("photo", photo[0]);
	}

	const response = await api.post("/political", formdata, axiosConfig);

	return { response };
}
