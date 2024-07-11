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

	formdata.append("cod", cod.toString());
	formdata.append("name", name);

	const response = await api.post("/politicalRegime", formdata, axiosConfig);

	return { response };
}
