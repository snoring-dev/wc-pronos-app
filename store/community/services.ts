import request from "../../utils/Http";

export const createCommunity = async (userId: number, data: any) => {
  const resp = await request({
    url: `/communities/`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: { ...data, userId },
  });

  return resp;
};
