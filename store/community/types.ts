import { FailureState } from "../../types";
import { User } from "../Auth/types";

export interface Community {
  name: string;
  prize: string;
  users: User[];
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
}
