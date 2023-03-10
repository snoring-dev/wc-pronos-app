import request from "../../utils/Http";
import { RegistrationData } from "./types";

export const saveUser = async (userData: RegistrationData) => {
  const resp = await request({
    url: "/auth/local/register",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: userData,
  });
  return resp;
};
