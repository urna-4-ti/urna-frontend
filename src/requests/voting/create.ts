import { api, axiosConfig } from "../api";

type votingProps = {
    id: string;
	name: string;
	class: string;
};

export async function createVoting(props: votingProps) {
	const formdata = new FormData();

	for (const [key, value] of Object.entries(props)) {
		formdata.append(key, value);
	}

	await api.post("/voting", formdata, axiosConfig);
}
