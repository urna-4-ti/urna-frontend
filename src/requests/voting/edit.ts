import { api } from "../api";

interface votingProps {
	id: string;
	name: string;
	classVoting: string;
}

export async function editVoting({
	id,
	name,
	classVoting,
}: votingProps) {
	const formdata = new FormData();

	formdata.append("name", name);
	formdata.append("class", classVoting);

	await api.patch(`/voting/${id}`, formdata, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}
