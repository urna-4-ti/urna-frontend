import { api, axiosConfig } from "../api";

type governmentProps = {
	cod: number;
	name: string;
};

export async function createGovernment({ cod, name }: governmentProps) {
	const formdata = new FormData();

	formdata.append("cod", cod.toString());
	formdata.append("name", name);

	console.log(formdata);

	const response = await api.post("/government/form", formdata, axiosConfig);

	return { response };
}
