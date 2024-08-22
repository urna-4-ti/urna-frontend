import { api } from "../api";

type Candidate = {
	id: string;
	name: string;
	cod: number;
	picPath: string;
	description: string;
	politicalPartyId: string;
	electionId: string;
};

type PoliticalRegime = {
	id: string;
	name: string;
	cod: number;
	electionId: string;
};

type GovernmentType = {
	id: string;
	name: string;
	cod: number;
	electionId: string;
};

type Votes = {
	candidateVotes: Record<string, number>;
	governmentVotes: Record<string, number>;
	politicalRegimeVotes: Record<string, number>;
};

type VotingProps = {
	id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	class: string;
	status: string;
	candidates: Candidate[];
	governmentSystem: GovernmentType[];
	politicalRegimes: PoliticalRegime[];
	votes: Votes;
};

export async function getOneVoting(idVoting: string): Promise<VotingProps> {
	const response = await api.get(`/election/${idVoting}`);
	const voting = response.data.voting;
	console.log(voting);
	return voting;
}