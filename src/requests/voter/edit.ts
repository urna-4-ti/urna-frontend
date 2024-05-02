import { api } from "../api";

interface voterProps {
	id: string;
	name: string;
	enrollment: string;
	email: string;
	password: string;
	classVoter: string;
}

export async function editVoter({
	id,
	name,
	enrollment,
	email,
	classVoter,
	password,
}: voterProps) {
	const formdata = new FormData();

	formdata.append("name", name);
	formdata.append("email", email);
	formdata.append("password", password);
	formdata.append("enrollment", enrollment);
	formdata.append("class", classVoter);

	await api.patch(`/voter/${id}`, formdata, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}
