import { TUserPayload } from "../models/user.model";
import { apiRequester } from "./apiRequester";

// URL 생성 함수를 간단히 화살표 함수로 변경
const usersUrl = (id: string) => `users/${id}`;

export const getUser = (userId: string) => {
  return apiRequester.get(usersUrl(userId));
};

export const getUserRating = (userId: string) => {
  return apiRequester.get(`${usersUrl(userId)}/rating`);
}

export const updateUser = (userId: string, payload: TUserPayload) => {
  return apiRequester.put(usersUrl(userId), payload);
};

export const getUserPosts = (userId: string) => {
  return apiRequester.get(`${usersUrl(userId)}/posts`);
};
export interface VerifyLocationPayload {
  latitude: number;
  longitude: number;
}

export const verifyUserLocation = (
  userId: string,
  payload: VerifyLocationPayload
) => {
  return apiRequester.post(`${usersUrl(userId)}/verify-location`, payload);
};
