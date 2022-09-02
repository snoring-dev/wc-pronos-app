import { FailureState } from "../../types";
import { User } from "../Auth/types";

export interface Community {
  id: number;
  name: string;
  winning_prize: string;
  access_code: string;
  users?: User[];
}

export interface CommunityState {
  communities: Community[];
  isLoading?: boolean;
  failure?: FailureState | null;
}

export enum CommunityActionTypes {
  SET_COMMUNITY_DATA = "@wc-app/community/SET_COMMUNITY_DATA",
  SET_COMMUNITY_FAILED = "@wc-app/community/SET_COMMUNITY_FAILED",
  SET_COMMUNITY_LOADING = "@wc-app/community/SET_COMMUNITY_LOADING",
  SET_APPEND_COMMUNITY_DATA = "@wc-app/community/SET_APPEND_COMMUNITY_DATA",
}
