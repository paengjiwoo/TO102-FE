import { TUserPayload } from "../models/user.model";
import { apiRequester } from "./apiRequester";
const usersUrl = (id: number) => { return `users/${id}`}

export const getUser = (userId: number) => {
  return apiRequester.get(usersUrl(userId));
}

export const updateUser = (userId: number, payload: TUserPayload) => {
  return apiRequester.put(usersUrl(userId), payload);
}

export const getUserPosts = (userId: number) => {
  return apiRequester.get(`${usersUrl(userId)}/posts`);
}

export const verifyUserLocation = (userId: number, payload: any) => {
  return apiRequester.post(`${usersUrl(userId)}/verify-location`, payload)
}