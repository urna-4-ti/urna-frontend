import { api } from "../api";

type votesProps = {
    governmentVote?: string;
    governmentId?: string;
  
    politicalRegimeVote?: string;
    politicalRegimeId?: string;
  
    candidateVote?: string;
    candidateId?: string;
  
    classVoter: string;
    Voting: string;
    votingId: string;
  
    user: string;
    userEnrollment: string;
  }

export async function getVotes(): Promise<votesProps[]> {
	const data = (await api.get("/vote")).data.data;
	return data;
}

export async function getVoteId(idVoter: string): Promise<votesProps> {
	const response = await api.get(`/vote/${idVoter}`);
	const votes = response.data.data;
	return votes;
}
