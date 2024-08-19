import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import ReviewFeed from "../components/review/ReviewFeed";
import Header from "../components/common/Header";

const ReviewPage: React.FC = () => {
  return (
    <>
      <Header />
      <div>
        <div></div>

        <div>
          <ReviewFeed />
        </div>
      </div>
    </>
  );
};

export default ReviewPage;

export const Route = createFileRoute('/reviews')({
  component: ReviewPage,
})
