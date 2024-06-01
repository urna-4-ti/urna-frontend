import { api } from "../api";

export async function deleteGovernment(id: string) {
	const response = await api.delete(`/government/form/${id}`);

	return { response };
}
