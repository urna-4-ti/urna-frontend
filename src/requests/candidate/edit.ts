import { api } from "../api";

type candidateProps = {
	id: string;
	cod: number;
	name: string;
	picPath?: string;
	politicalPartyId: string;
	description: string;
};

export async function editCandidate({
	id,
	cod,
	name,
	politicalPartyId,
	description,
	picPath,
}: candidateProps) {
	const formdata = new FormData();

	console.log(picPath);

	formdata.append("name", name);
	formdata.append("cod", cod.toString());
	formdata.append("politicalPartyId", politicalPartyId);
	formdata.append("description", description);

	if (picPath) {
		formdata.append("photo", picPath[0]);
	}

	await api.patch(`/candidate/${id}`, formdata, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}
