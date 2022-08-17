import request from "../../utils/Http";

export const performAuth = async (id: string, pwd: string) => {
  const resp = await request({
    url: "/auth/local",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: { identifier: id, password: pwd },
  });
  return resp;
};
