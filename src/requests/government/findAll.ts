import { api } from "../api";

type governmentProps = {
	id: string;
	name: string;
	cod: number;
};

export async function getGovernmentForm(): Promise<governmentProps[]> {
	const data = (await api.get("/government/form")).data.governments;
	return data;
}
