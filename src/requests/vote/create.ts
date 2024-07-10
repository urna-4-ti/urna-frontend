import { api, axiosConfig } from "../api";

type voteProps = {
	governmentVote?: string;
	governmentId?: string;

	politicalRegimeVote?: string;
	politicalRegimeId?: string;

	candidateVote?: string;
	candidateId?: string;

	class: string;
	Voting: string;
	votingId: string;

	user: string;
	userEnrollment: string;
};
export async function createVote(props: voteProps) {
	const formdata = new FormData();

	for (const [key, value] of Object.entries(props)) {
		formdata.append(key, value);
	}

	await api.post(`/vote/${props.votingId}`, formdata, axiosConfig);
}
