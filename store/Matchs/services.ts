import request from "../../utils/Http";
import { Match, MatchsResponse } from "./types";

export const getMatchsData = async (): Promise<Match[]> => {
  const resp: MatchsResponse = await request({
    url: `/matches?populate=deep`,
    method: "GET",
  });

  return resp.data;
};