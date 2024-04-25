import { api } from "../api";

type voterProps = {
	id: string;
	name: string;
	enrollment: string;
	email: string;
	class: string;
};
export async function getVoters(): Promise<voterProps[]> {
	const data = (await api.get("/voter")).data.data;
	return data;
}
