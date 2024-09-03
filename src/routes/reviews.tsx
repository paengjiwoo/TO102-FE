import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import ReviewFeed from "../components/review/ReviewFeed";
import Header from "../components/common/Header";
import { useProfileData } from "../hooks/useProfileData";
import Tabs from "../components/common/Tabs";
import { useReviews } from "../hooks/useReviews";
import '../styles/reviews/reviews.scss'
import { sortDatesDescending } from "../utils/sort";
import { getRecivedReviews } from "../apis/reviews";

const ReviewPage: React.FC = () => {
  const [reviewType, setReviewType] = useState<"received" | "written">("received");
  const { user } = useProfileData();
  const [reviews, setReviews] = useState<any>([]);

  const params = { userId: user.id.toString() };
  const tabTypes = [
    ["received", "written"],
    ["받은 후기", "작성한 후기"],
  ];

  useEffect(() => {
    getRecivedReviews(user.id)
    .then(res => {setReviews(res.data)})
    .catch((_) => console.log('해당 사용자의 리뷰가 없습니다.'))
  }, []);

  return (
    <>
      <Header />
      <div>
        <div>
          <Tabs 
            url="/profile/$userId" 
            params={params} 
            setFunction={setReviewType}
            tabTypes={tabTypes}
            lenInfo={reviews.length} 
            />
        </div>

        <div className={reviewType==="received" ? "feed" : "written-feed"}>
          <ReviewFeed type={reviewType} reviews={sortDatesDescending(reviews)}/>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;

export const Route = createFileRoute('/reviews')({
  component: ReviewPage,
})
