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
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return resp;
};

export const sendProfilePicture = async (
  profileId: number,
  username: string,
  picturePath: string,
  jwt: string
) => {
  const formData = new FormData();
  formData.append("files", {
    type: "image/jpg",
    uri: picturePath.replace("file://", ""),
    name: `${username}_${getTime(new Date())}`,
  });
  formData.append("ref", "api::profile.profile");
  formData.append("refId", String(profileId));
  formData.append("field", "picture");

  const resp = await request({
    url: "/upload",
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });

  return resp;
};

export const linkPictureToProfile = async (
  profileId: number,
  pictureId: number,
  jwt: string
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
