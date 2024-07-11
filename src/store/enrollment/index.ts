import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StoreProps = {
	state: {
		enrollment: string;
		idElection: string;
	};
	actions: {
		insert: (item: string, idElection: string) => void;
	};
};

// enrollment: "",
// 		insert: (item) => set({ enrollment: item }),

export const useEnrollmentStore = create<StoreProps>()(
	persist(
		(set) => ({
			state: {
				enrollment: "",
				idElection: "",
			},
			actions: {
				insert: (item: string, idElection: string) =>
					set({ state: { enrollment: item, idElection: idElection } }),
			},
		}),
		{
			name: "enrollment",
			storage: createJSONStorage(() => localStorage),
			partialize: ({ state }) => ({ state }),
		},
	),
);
