import React, { useEffect, useState } from "react";
import {  Link, createFileRoute, useMatch } from "@tanstack/react-router";
import UserInfoBox from "../../components/profile/UserInfoBox";
import { IoChevronForwardSharp, IoStar } from "react-icons/io5";
import '../../styles/profile/profile.scss'
import ReviewFeed from "../../components/review/ReviewFeed";
import Header from "../../components/common/Header";
import { sortDatesDescending } from "../../utils/sort";
import { getUser, getUserRating } from "../../apis/users";
import { getRecivedReviews } from "../../apis/reviews";

const Profile: React.FC = () => {
  const { params: { userId },} = useMatch({ from: '/profile/$userId' });

  const [user, setUser] = useState<any>([]);
  const [rating, setRating] = useState<any>('');
  const [reviews, setReviews] = useState<any>([]);
  
  useEffect(() => {
    getUser(userId).then(res => { setUser(res.data); console.log(res.data) })
    getUserRating(userId)
    .then(res => console.log(res.data))
    .catch(() => { 
      console.log(`user_id ${userId}님에 대한 평점이 존재하지 않습니다.`);
      setRating('평가 0건')
    });

    getRecivedReviews(userId)
    .then(res => {setReviews(res.data)})
    .catch((_) => console.log('해당 사용자의 리뷰가 없습니다.'))
  }, [])

  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile__userinfo">
          <UserInfoBox user={user}/>
        </div>

        <div className="info">
          <div className="info__stars">
            {rating.length > 4 ? (
              <div className="info__stars__message">
                {rating}
              </div>
            ) : (
              <>
                <IoStar className="info__stars__star"/>
                <div className="info__stars__rate">{rating}</div>
              </>
            )}
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
          {reviews.length > 0 ? (
            <ReviewFeed type="received" reviews={sortDatesDescending(reviews)}/>
          ) : (
            <div>받은 후기가 없습니다.</div>
          )}
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
