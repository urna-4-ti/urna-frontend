import { api } from "../api";

type governmentProps = {
	cod: number;
	name: string;
};

export async function createGovernment({ cod, name }: governmentProps) {
	const formdata = new FormData();

	formdata.append("cod", cod.toString());
	formdata.append("name", name);

	console.log(formdata);

	await api.post("/government/form", formdata, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}
