import type { enrollmentDataType } from "./enrollment";
import type { tokenDataType, userDataType, userLogin } from "./user";

export type ActionsProps = {
	login: (user: userLogin) => void;
	logout: () => void;
};

export type ActionEnrolProps = {
	insert: (enrollment: string) => void;
};

export type StoreProps = {
	state: {
		user: userDataType;
	};
	actions: ActionsProps;
};

export type EnrolProps = {
	state: {
		register: enrollmentDataType;
	};
};
