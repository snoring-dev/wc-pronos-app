import { FailureState } from "../../types";
import { Media } from "../Auth/types";

export interface ProviderMetadata {
    public_id: string;
    resource_type: string;
}

export interface Flag {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: any;
    provider: string;
    provider_metadata: ProviderMetadata;
    createdAt: Date;
    updatedAt: Date;
}

export interface Player {
  id: number;
  fullname: string;
  createdAt: Date;
  updatedAt: Date;
  shirt_number: number;
  media: Media[];
}

interface LeftSide {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  country_code: string;
  badge: string;
  players: Player[];
  flag: Flag;
}

interface RightSide {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  country_code: string;
  badge: string;
  players: Player[];
  flag: Flag;
}

export interface Match {
  id: number;
  title: string;
  final_score_string: string;
  left_score: number;
  right_score: number;
  createdAt: string;
  updatedAt: string;
  played_at: string;
  finished: boolean;
  left_side: LeftSide;
  right_side: RightSide;
  predictions: any[];
  is_live?: boolean;
}

export interface MatchsResponse {
  data: Match[];
}

export interface MatchesState {
  data: Match[];
  isLoading?: boolean;
  failure?: FailureState | null;
}

export enum MatchsActionTypes {
  SET_MATCHS_DATA = "@wc-app/matches/SET_MATCHS_DATA",
  SET_MATCHS_FAILED = "@wc-app/matches/SET_MATCHS_FAILED",
  SET_MATCHS_LOADING = "@wc-app/matches/SET_MATCHS_LOADING",
}
