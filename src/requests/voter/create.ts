import { api } from "../api";

type voterProps = {
	name: string;
	enrollment: string;
	email: string;
	password: string;
	role: string;
	class: string;
};

export async function createVoter(props: voterProps) {
	const formdata = new FormData();

	for (const [key, value] of Object.entries(props)) {
		formdata.append(key, value);
	}

	await api.post("/voter", formdata, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}
