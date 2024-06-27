import { api } from "../api";

type voteProps = {
    id: string;
    
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

export async function editVote({
	id,

    governmentVote,
    governmentId,
  
    politicalRegimeVote,
    politicalRegimeId,
  
    candidateVote,
    candidateId,
  
    classVoter,
    Voting,
    votingId,
  
    user,
    userEnrollment,
}: voteProps) {
	const formdata = new FormData();

	formdata.append("governmentVote", governmentVote!);
	formdata.append("governmentId",governmentId!);
	formdata.append("politicalRegimeVote",politicalRegimeVote!);
	formdata.append("politicalRegimeId",politicalRegimeId!);
	formdata.append("candidateVote",candidateVote!);
	formdata.append("candidateId",candidateId!);
	formdata.append("class",classVoter);
	formdata.append("Voting",Voting);
	formdata.append("votingId",votingId);
	formdata.append("user",user);
	formdata.append("userEnrollment",userEnrollment);

	await api.patch(`/vote/${id}`, formdata, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}
