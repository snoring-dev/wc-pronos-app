import getTime from "date-fns/getTime";
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

export const getUserProfile = async (id: string, jwt: string) => {
  const resp = await request({
    url: `/users/${id}?populate=deep`,
    method: "GET",
    Authorization: `Bearer ${jwt}`,
  });

  return resp;
};

export const sendProfilePicture = async (
  username: string,
  picturePath: string,
) => {
  const formData = new FormData();
  formData.append("files", {
    type: "image/jpg",
    uri: picturePath.replace("file://", ""),
    name: `${username}_${getTime(new Date())}`,
  });

  const resp = await request({
    url: "/upload",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });

  return resp;
};

export const linkPictureToProfile = async (
  profileId: number,
  pictureId: number,
) => {
  const resp = await request({
    url: `/profiles/${profileId}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: { data: { picture: pictureId } },
  });

  return resp;
};

export const updateProfileData = async (profileId: number, profileData: any) => {
  const resp = await request({
    url: `/profiles/${profileId}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: { data: profileData },
  });

  return resp;
};
