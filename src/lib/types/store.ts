import type { tokenDataType, userDataType, userLogin } from "./user";

export type ActionsProps = {
	login: (user: userLogin) => void;
	logout: () => void;
};

export type StoreProps = {
	state: {
		user: userDataType;
	};
	actions: ActionsProps;
};
