import { api } from "../api";

type politicalRegimeProps = {
	id: string;
	name: string;
	cod: number;
};

export async function editPoliticalRegime({
	id,
	name,
	cod,
}: politicalRegimeProps) {
	const formdata = new FormData();

	formdata.append("name", name);
	formdata.append("cod", cod.toString());

	await api.patch(`/politicalRegime/${id}`, formdata, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}
