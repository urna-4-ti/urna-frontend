import { api, getFromLocalStorage } from "../api";

type governmentProps = {
	id: string;
	name: string;
	cod: number;
};

export async function getGovernmentForm(): Promise<governmentProps[]> {
	const data = (await api.get("/government/form")).data.governments;
	return data;
}

export async function getGovernmentFormId(
	id: string,
	token: string,
): Promise<governmentProps> {
	const data = (await api.get(`/government/form/${id}`)).data.governments;
	return data;
}
