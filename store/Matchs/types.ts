import { FailureState } from "../../types";
import { Media } from "../Auth/types";

export interface PredictedResult {
  leftSide: number;
  rightSide: number;
}

export interface PreferredTeam {
  id: number;
  flag: string;
  name: string;
  country_code: string;
}

export interface CountryFrom {
  cca2: string;
  flag: string;
  name: string;
  region: string;
  currency: string[];
  subregion: string;
  callingCode: string[];
}

export interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

export interface Large {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
  provider_metadata: ProviderMetadata;
}

export interface Small {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
  provider_metadata: ProviderMetadata;
}

export interface Medium {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
  provider_metadata: ProviderMetadata;
}

export interface Thumbnail {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
  provider_metadata: ProviderMetadata;
}

export interface Formats {
  large: Large;
  small: Small;
  medium: Medium;
  thumbnail: Thumbnail;
}

export interface Picture {
  id: number;
  name: string;
  alternativeText?: any;
  caption?: any;
  width: number;
  height: number;
  formats: Formats;
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

export interface Profile {
  id: number;
  firstname: string;
  lastname: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  preferred_team: PreferredTeam;
  country_from: CountryFrom;
  picture: Picture;
}

export interface Owner {
  id: number;
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken?: any;
  confirmationToken?: any;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  profile: Profile;
}

export interface SinglePrediction {
  id: number;
  match_id: number;
  first_team_to_score: number;
  first_player_to_score: number;
  predicted_result: PredictedResult;
  parsed: boolean;
  createdAt: Date;
  updatedAt: Date;
  owner: Owner;
}

export interface Prediction {
  userId: number;
  matchId: number;
  predictedResult: {
    leftSide: number;
    rightSide: number;
  };
  firstTeamToScore: number;
  firstPlayerToScore: number;
}

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
  predictions: SinglePrediction[];
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
