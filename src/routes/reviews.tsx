import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import ReviewFeed from "../components/review/ReviewFeed";

const ReviewPage: React.FC = () => {
  return (
    <div>
      <div></div>

      <div>
        <ReviewFeed />
      </div>
    </div>
  );
};

export default ReviewPage;

export const Route = createFileRoute('/reviews')({
  component: ReviewPage,
})
