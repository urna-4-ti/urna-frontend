import { api } from "../api";

type politicalPartyProps = {
	name: string;
	partyClass: string;
	politicalTypeId: string;
	photo: any;
};

export async function createPoliticalParty({
	name,
	partyClass,
	politicalTypeId,
	photo,
}: politicalPartyProps) {
	const formdata = new FormData();

	console.log(photo);

	formdata.append("name", name);
	formdata.append("class", partyClass);
	formdata.append("politicalTypeId", politicalTypeId);
	formdata.append("photo", photo[0]);

	await api.post("/political", formdata, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}
