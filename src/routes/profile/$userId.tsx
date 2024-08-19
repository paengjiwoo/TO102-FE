import React from "react";
import {  Link, createFileRoute } from "@tanstack/react-router";
import { useProfileData } from "../../hooks/useProfileData";
import UserInfoBox from "../../components/profile/UserInfoBox";
import { IoChevronForwardSharp, IoStar } from "react-icons/io5";
import '../../styles/profile/profile.scss'
import ReviewFeed from "../../components/review/ReviewFeed";
import Header from "../../components/common/Header";
import { useReviews } from "../../hooks/useReviews";

const Profile: React.FC = () => {
  // const { params: { userId },} = useMatch({ from: '/profile/$userId' });
  const { reviews } = useReviews();
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
            {reviews.length} reviews
          </div>
        </div>

        <div className="reviews">
          <div className="reviews__title">받은 후기</div>
          <Link to="/reviews" >
            <IoChevronForwardSharp />
          </Link>
        </div>

        <div className="feed">
          <ReviewFeed type="received" reviews={reviews}/>
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
