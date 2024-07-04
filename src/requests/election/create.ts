import { api, axiosConfig } from "../api";

type electionProps = {
  name: string;
  class: string;
  governmenSystem: string[];
  candidate: string[];
  politicalRegime : string[];
  vote: string[]
}
export async function createElection(props: electionProps) {
	const formdata = new FormData();

	for (const [key, value] of Object.entries(props)) {
		formdata.append(key, value);
	}

	await api.post("/election", formdata, axiosConfig);
}
