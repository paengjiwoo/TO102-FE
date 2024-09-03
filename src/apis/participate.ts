import { apiRequester } from "./apiRequester";

type TAddParticipate = {
  postId: number;
  requesterId: number;
}

export const addParticipate = (payload: TAddParticipate) => {
  return apiRequester.post(`/participant/request`, payload);
};

export const acceptParticipate = (requestId: string) => {
  return apiRequester.get(`/participant/request/${requestId}/accept`);
};