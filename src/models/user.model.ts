export type TUser  = {
  id: number;
  username: string;
  email: string;
  location: string;
  profile_picture_url: string;
  average_rating: number;
};

export type TUserPayload = Omit<TUser, 'id'>;