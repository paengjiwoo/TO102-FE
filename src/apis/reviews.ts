import { apiRequester } from "./apiRequester";

export const getRecivedReviews = (userId: string) => {
  return apiRequester.get(`/reviews/user/${userId}`);
};

export const addReview = (payload: any) => {
  return apiRequester.post(`/reviews`, payload);
};