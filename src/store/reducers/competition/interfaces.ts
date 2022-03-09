import { IRewards } from "../../actions/competitions/interfaces";

export interface ICompetitionInitialState {
    failed: boolean,
    competition: ICompetition | null,
};

interface ICompetition {
    expTime: number,
    name: string,
    rewards: IRewards[]
};