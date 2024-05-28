import { api } from "../api";

type politicalPartyProps = {
	id: string;
	partyClass: string;
	name: string;
	photoUrl?: string;
	politicalTypeId: string;
};

export async function editPoliticalParty({
	id,
	name,
	photoUrl,
	politicalTypeId,
	partyClass,
}: politicalPartyProps) {
	const formdata = new FormData();

	// console.log(photo);

	formdata.append("name", name);
	formdata.append("class", partyClass);
	formdata.append("politicalTypeId", politicalTypeId);

	if (photoUrl) {
		formdata.append("photoUrl", photoUrl[0]);
	}

	await api.patch(`/political/${id}`, formdata, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}
