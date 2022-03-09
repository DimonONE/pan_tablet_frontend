import {
    competitionType,
    ICompetition
} from "../../actions/competitions/interfaces";
import { IAction } from "../../interfaces/IAction";
import { ICompetitionInitialState } from "./interfaces";


const initialState: ICompetitionInitialState = {
    failed: false,
    competition: null,
};

export const competition = (
    state = initialState,
    action: IAction<ICompetition>
): ICompetitionInitialState => {

    switch (action.type) {
        case competitionType.COMPETITION_DATE_FETCHED:

            const { endDate, now } = action.payload;
            return {
                ...state,
                failed: false,
                competition: {
                    expTime: Math.floor(endDate - now),
                    name: action.payload.name,
                    rewards: action.payload.categories[0].rewards
                }
            };
        default:
            return state;
    }
};