export type TUser  = {
  userId: number;
  username: string;
  nickname: string;
  email: string;
  location: string;
  profile_picture_url: string;
  average_rating: number;
};

export type TUserPayload = Omit<TUser, 'id'>;