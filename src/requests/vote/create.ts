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
	// console.log(props);
	const response = await api.post(
		`/vote/${props.votingId}`,
		props, // Envia o objeto JSON diretamente
		axiosConfig,
	);
	return { response };
}
