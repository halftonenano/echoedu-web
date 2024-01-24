export type TutorSession = {
	date: string;
	tutor: Tutor;
	timeframe: 'tutorial' | 'afterschool';
};

export type Tutor = { id: string; name: string; teacher: string; grade: number };
