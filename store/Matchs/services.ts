import request from "../../utils/Http";
import { Match, MatchsResponse, Prediction } from "./types";

export const getMatchsData = async (): Promise<Match[]> => {
  const resp: MatchsResponse = await request({
    url: `/matches?populate=deep`,
    method: "GET",
  });

  return resp.data;
};

export const setPrediction = async (data: Prediction) => {
  const resp: MatchsResponse = await request({
    url: `/pronostics/set`,
    method: "POST",
    data,
  });

  return resp.data;
};
