import { revalidatePath } from "next/cache";
import { api } from "../api";

export async function deleteCandidate(idCandidate: string) {
	const response = await api.delete(`/candidate/${idCandidate}`);
	return { response };
}
