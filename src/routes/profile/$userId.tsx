import React from "react";
import {  Link, createFileRoute } from "@tanstack/react-router";
import { useProfileData } from "../../hooks/profileHook";
import UserInfoBox from "../../components/profile/UserInfoBox";
import { IoChevronForwardSharp, IoStar } from "react-icons/io5";
import '../../styles/profile/profile.scss'
import ReviewFeed from "../../components/review/ReviewFeed";
import Header from "../../components/common/Header";

const Profile: React.FC = () => {
  // const { params: { userId },} = useMatch({ from: '/profile/$userId' });

  const { user } = useProfileData(); 

  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile__userinfo">
          <UserInfoBox user={user}/>
        </div>

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
          <Link to="/reviews" >
            <IoChevronForwardSharp />
          </Link>
        </div>

        <div className="feed">
          <ReviewFeed />
        </div>
      </div>
    </>
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
