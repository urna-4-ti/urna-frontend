import { api, axiosConfig } from "../api";

type voteProps = {
	governmentId?: string;
	whiteVote?: string;
	politicalRegimeId?: string;

	candidateId?: string;

	class?: string;
	votingId: string;

	userEnrollment: string;
};
export async function createVote(props: voteProps) {
	const formdata = new FormData();

	for (const [key, value] of Object.entries(props)) {
		formdata.append(key, value);
	}

	await api.post(`/vote/${props.votingId}`, formdata, axiosConfig);
}
