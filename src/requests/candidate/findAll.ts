import { api } from "../api";

type candidateProps = {
	id: string;
	name: string;
	cod: number;
	picPath: string;
	description: string;
	politicalPartyId: string;
};

export async function getCandidate(): Promise<candidateProps[]> {
	const data = (await api.get("/candidate")).data.data;
	return data;
}
