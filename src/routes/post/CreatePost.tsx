import { createFileRoute } from "@tanstack/react-router";

const CreatePost: React.FC = () => {
  return <div>Home</div>;
};

export default CreatePost;

export const Route = createFileRoute("/post/CreatePost")({
  component: CreatePost,
});
