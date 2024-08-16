import React from "react";
import { createFileRoute } from "@tanstack/react-router";

const PostList: React.FC = () => {
  return <div>PostList</div>;
};

export default PostList;

export const Route = createFileRoute('/news')({
  component: PostList,
})
