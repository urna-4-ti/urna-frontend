import { api } from "../api";

interface Candidate {
	id: string;
	name: string;
	email: string;
	cod: string;
	picPath: string;
	description: string;
	politicalPartyId: string;
	PoliticalParty: {
		class: string;
	};
}

export async function getCandidate(): Promise<Candidate[]> {
	const data = (await api.get("/candidate")).data.data;
	return data;
}

export async function getCandidateId(idCandidate: string): Promise<Candidate> {
	const response = await api.get(`/candidate/${idCandidate}`);
	const candidates = response.data.data;
	return candidates;
}

export async function getClassCandidate(
	classCandidate: string,
): Promise<Candidate[]> {
	const data = (await api.get(`/candidate/filter/${classCandidate}`)).data.data;
	return data;
}
