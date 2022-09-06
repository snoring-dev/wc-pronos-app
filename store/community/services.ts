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

export const findAllCommunities = async (userId: number) => {
  const resp = await request({
    url: `/communities/all?userId=${userId}`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return resp;
};
