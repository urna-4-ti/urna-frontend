import { api } from "../api";

interface voterProps {
	id: string;
	name: string;
	cod: number;
	description: string;
}

export async function editGovernment({
	id,
	name,
	cod,
	description,
}: voterProps) {
	const formdata = new FormData();

	formdata.append("name", name);
	formdata.append("cod", cod.toString());
	formdata.append("description", description);

	await api.patch(`/government/form/${id}`, formdata, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}
