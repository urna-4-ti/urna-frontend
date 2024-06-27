import { api, axiosConfig } from "../api";

type politicalRegimeProps = {
	name: string;
	cod: number;
};

export async function createPoliticalRegime({
	name,
	cod,
}: politicalRegimeProps) {
	const formdata = new FormData();

	formdata.append("name", name);
	formdata.append("cod", cod.toString());

	await api.post("/politicalRegime", formdata, axiosConfig);
}

