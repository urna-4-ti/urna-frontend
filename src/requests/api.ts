import axios from "axios";

export const getFromLocalStorage = (): string | null => {
	if (typeof window === "undefined") {
		return null;
	}

	return localStorage.getItem("auth");
};
const storage = JSON.parse(getFromLocalStorage() as string);
const token = storage?.state?.state?.user?.token;

export const axiosConfig = {
	headers: {
		"Content-Type": "multipart/form-data",
	},
};

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_URL,
	timeout: 1000,
	withCredentials: true,
	headers: {
		Authorization: token ? `Bearer ${token}` : null,
	},
});
