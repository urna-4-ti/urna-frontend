import type { StoreProps } from "@/lib/types/store";
import type { userLogin } from "@/lib/types/user";
import { api } from "@/requests/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

export type jwtType = {
	id: string;
	email: string;
	name: string;
};

export const AuthStore = create<StoreProps>()(
	persist(
		(set) => ({
			state: {
				user: {
					email: "",
					name: "",
					id: "",
					token: "",
				},
			},
			actions: {
				login: async (user): Promise<string> => {
					const userData: userLogin = {
						email: user.email,
						password: user.password,
					};
					const formdata = new FormData();
					formdata.append("email", userData.email);
					formdata.append("password", userData.password);

					const r = await api.post("/auth/signIn", formdata, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					});

					const { accessToken } = r.data;

					const { email, id, name }: jwtType = jwtDecode(accessToken);

					set({
						state: {
							user: {
								id,
								name,
								email,
								token: accessToken,
							},
						},
					});
					return accessToken;
				},
				logout: () => {
					set({
						state: {
							user: {
								email: "",
								id: "",
								name: "",
								token: "",
							},
						},
					});
				},
			},
		}),
		{
			name: "auth",
			storage: createJSONStorage(() => localStorage),
			partialize: ({ state }) => ({ state }),
		},
	),
);
