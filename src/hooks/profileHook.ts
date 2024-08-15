import { TUser } from "../models/user.model";
import { fakerKO as faker } from "@faker-js/faker";


export const useProfileData = () => {
  
  const user: TUser = {id: 1, username: '', email: '', location: '', profile_picture_url: '', average_rating: 0};
  user.username = faker.person.fullName();
  user.email = faker.internet.email();
  user.location = '서울특별시 영등포구';
  user.profile_picture_url = faker.image.url()
  user.average_rating = faker.datatype.float({ min: 0, max: 5, precision: 0.01 });

  return { user };
}