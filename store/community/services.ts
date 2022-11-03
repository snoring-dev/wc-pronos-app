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

export const findCommunityDetails = async (communityId: number) => {
  const resp = await request({
    url: `/communities/${communityId}`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return resp;
};

export const joinCommunity = async (userId: number, accessCode: string) => {
  const resp = await request({
    url: `/communities/join`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      userId: userId,
      access_code: accessCode,
    },
  });
  return resp;
};
