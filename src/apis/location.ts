import { apiRequester } from "./apiRequester";

export const getLocation = (locationId: string) => {
  return apiRequester.get(`locations/${locationId}`);
};