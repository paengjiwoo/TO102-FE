import { getLocation } from "../apis/location";
import { getUser } from "../apis/users";
import { fakerKO as faker } from "@faker-js/faker";

export const useProfileData =  (userId?: string) => {
  const user = {id: 1, username: '', nickname: '', email: '', location: '', profile_picture_url: '', average_rating: 0};

  if (userId && Number(userId) > 0) {
    getUser(userId).then(res => res.data).then(res => {
      user.id = res.userId;
      user.username = res.username;
      user.email = res.email;
      user.nickname = res.nickname;
      user.profile_picture_url = res.profilePictureUrl;
      getLocation(res.locationId).then(res => res.data).then(res => {
        user.location = `${res.province} ${res.city}`
      })
    });
  } else {
    user.average_rating = 4.5;
    
    user.username = faker.person.fullName();
    user.email = faker.internet.email();
    user.location = '서울특별시 영등포구';
    user.profile_picture_url = faker.image.url()
    user.average_rating = Number(faker.datatype.float({ min: 0, max: 5, precision: 0.01 }).toFixed(2));
  }

  return { user };
}