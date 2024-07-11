import { api } from "../api";

type politicalRegime = {
	id: string;
	name: string;
	cod: number;
};

export async function getPoliticalRegimes(): Promise<politicalRegime[]> {
	const data = (await api.get("/politicalRegime")).data.data;
	console.log(data);
	
	return data;
}

export async function getPoliticalRegimeId(
	idPoliticalRegime: string,
): Promise<politicalRegime> {
	const response = await api.get(`/politicalRegime/${idPoliticalRegime}`);
	const politicalrRegime = response.data.data;
	return politicalrRegime;
}
