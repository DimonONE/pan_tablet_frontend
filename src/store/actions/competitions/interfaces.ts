export enum competitionType {
    COMPETITION_DATE_FETCHED = 'COMPETITION_DATE_FETCHED'
};

export interface ICompetition {
    id: number,
    name: string,
    startDate: number,
    endDate: number,
    now: number,
    categories: ICategories[]
};

interface ICategories {
    name: string,
    rewards: IRewards[]
};

export interface IRewards {
    place: number,
    description: string,
    pictureUrl: string
};