import { api, axiosConfig } from "../api";

type governmentProps = {
	cod: number;
	name: string;
	description: string;
};

export async function createGovernment({
	cod,
	name,
	description,
}: governmentProps) {
	const formdata = new FormData();

	formdata.append("cod", cod.toString());
	formdata.append("name", name);
	formdata.append("description", description);

	console.log(formdata);

	await api.post("/government/form", formdata, axiosConfig);
}
