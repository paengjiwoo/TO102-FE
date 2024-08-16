import React from "react";
import {  createFileRoute } from "@tanstack/react-router";
import { useProfileData } from "../../hooks/profileHook";
import UserInfoBox from "../../components/profile/UserInfoBox";
import { IoChevronForwardSharp, IoStar } from "react-icons/io5";
import '../../styles/profile/profile.scss'
import ReviewFeed from "../../components/review/ReviewFeed";

const Profile: React.FC = () => {
  // const { params: { userId },} = useMatch({ from: '/profile/$userId' });

  const { user } = useProfileData(); 

  return (
    <div className="profile">
      <UserInfoBox user={user}/>

      <div className="info">
        <div className="info__stars">
          <IoStar className="info__stars__star"/>
          <div className="info__stars__rate">{user.average_rating}</div>
        </div>

        <div className="info__reviews">
          22 reviews
        </div>
      </div>

      <div className="reviews">
        <div className="reviews__title">받은 후기</div>
        <IoChevronForwardSharp />
      </div>

      <div className="feed">
        <ReviewFeed />
      </div>
    </div>
  );
};

export default Profile;

export const Route = createFileRoute('/profile/$userId')({
  loader: async ({ params }) => {
    const { userId } = params;
    return console.log(`Loading profile for user ID ${userId}...`);
  },
  component: Profile,
})
