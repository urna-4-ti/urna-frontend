import { api } from "../api";

export async function deleteGovernment(id: string) {
	await api.delete(`/government/form/${id}`);
}
