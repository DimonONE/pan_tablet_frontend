import { Dispatch } from "react";
import { Axios } from "../../../shared/axios";
import { apiUrl } from "../../../shared/consts/url/apiUrl";
import { competitionType, ICompetition } from "./interfaces";

export const competitionInfo = () => async (dispatch: Dispatch<any>) => {
    try {

        const res = await Axios({
            method: "GET",
            url: apiUrl.competition,
        });

        dispatch(competitionDataFetched(res.data));

    } catch (error) {

    }
};

const competitionDataFetched = (competitionData: ICompetition) => {
    return {
        type: competitionType.COMPETITION_DATE_FETCHED,
        payload: competitionData
    };
};
