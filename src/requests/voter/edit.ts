import { api } from "../api";

interface voterProps {
	id: string;
	name: string;
	enrollment: string;
	email: string;
	classVoter: string;
	role: string;
}

export async function editVoter({
	id,
	name,
	enrollment,
	email,
	classVoter,
	role,
}: voterProps) {
	const formdata = new FormData();

	formdata.append("name", name);
	formdata.append("email", email);
	formdata.append("enrollment", enrollment);
	formdata.append("class", classVoter);
	formdata.append("role", role);

	await api.patch(`/voter/${id}`, formdata, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}
