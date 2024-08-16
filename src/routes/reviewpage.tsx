import React from "react";
import { createFileRoute } from "@tanstack/react-router";

const ReviewPage: React.FC = () => {
  return <div>ReviewPage</div>;
};

export default ReviewPage;

export const Route = createFileRoute('/reviewpage')({
  component: ReviewPage,
})
