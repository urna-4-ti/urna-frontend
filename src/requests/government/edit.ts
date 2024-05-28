import { api } from "../api";

interface voterProps {
	id: string;
	name: string;
	cod: number;
}

export async function editGovernment({ id, name, cod }: voterProps) {
	const formdata = new FormData();

	formdata.append("name", name);
	formdata.append("cod", cod.toString());

	await api.patch(`/government/form/${id}`, formdata, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}
