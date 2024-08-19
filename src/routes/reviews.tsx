import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import ReviewFeed from "../components/review/ReviewFeed";
import Header from "../components/common/Header";
import { useProfileData } from "../hooks/useProfileData";
import Tabs from "../components/common/Tabs";
import { useReviews } from "../hooks/useReviews";
import '../styles/reviews/reviews.scss'

const ReviewPage: React.FC = () => {
  const [reviewType, setReviewType] = useState<"received" | "written">("received");
  const { user } = useProfileData();
  const { reviews } = useReviews();

  const params = { userId: user.id.toString() };
  const tabTypes = [
    ["received", "written"],
    ["받은 후기", "작성한 후기"],
    []
  ];

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
          <ReviewFeed type={reviewType} reviews={reviews}/>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;

export const Route = createFileRoute('/reviews')({
  component: ReviewPage,
})
