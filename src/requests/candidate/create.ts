import { api } from "../api";

type candidateProps = {
	cod: number;
	name: string;
	picPath: string;
	politicalPartyId: string;
	description: string;
};

export async function createCandidate({
	name,
	cod,
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
	formdata.append("photo", picPath[0]);

	await api.post("/candidate", formdata, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}
