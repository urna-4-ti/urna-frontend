export type formGovernmentProps = {
	id: string;
	name: string;
	cod: number;
	description: string;
};

export type politicalRegimeProps = {
	id: string;
	name: string;
	cod: number;
};

export type candidateProps = {
	id: string;
	name: string;
	email: string;
	cod: number;
	picPath: string;
	description: string;
	politicalPartyId: string;
	PoliticalParty: {
		class: string;
	};
};
