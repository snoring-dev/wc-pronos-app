import { Country } from "react-native-country-picker-modal";
import { FailureState } from "../../types";
import { Team } from "../Tournament/types";

export interface User {
  id: 4;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  profile: Profile;
}

export interface Media {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
  provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

export interface Formats {
  large: Media;
  small: Media;
  medium: Media;
  thumbnail: Media;
}

export interface Picture {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: number;
  firstname: string;
  lastname: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  picture: Picture;
  country_from?: Country;
  preferred_team?: Team;
}

export interface AuthState {
  jwt: string;
  user: User | null;
  isLoading?: boolean;
  failure?: FailureState | null;
}

export enum AuthActionTypes {
  SET_USER_DATA = "@wc-app/auth/SET_USER_DATA",
  SET_AUTH_FAILED = "@wc-app/auth/SET_AUTH_FAILED",
  SET_AUTH_LOADING = "@wc-app/auth/SET_AUTH_LOADING",
  SET_PROFILE_DATA = "@wc-app/auth/SET_PROFILE_DATA",
  UPDATE_PROFILE_DATA = "@wc-app/auth/UPDATE_PROFILE_DATA",
  UPDATE_PROFILE_PICTURE = "@wc-app/auth/UPDATE_PROFILE_PICTURE",
  RESET_AUTH = "@wc-app/auth/RESET_AUTH",
}
