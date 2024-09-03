export type TUser  = {
  userId: number;
  username: string;
  nickname: string;
  email: string;
  location: string;
  profilePictureUrl: string;
  locationId: number;
};

export type TUserPayload = Omit<TUser, 'id'>;