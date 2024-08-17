import { apiRequester } from "./apiRequester";

export const fetchPosts = () => {
  return apiRequester.get("/posts");
};

export const fetchPostById = (postId: number) => {
  return apiRequester.get(`/posts/${postId}`);
};

export const createPost = (postData: { title: string; content: string }) => {
  return apiRequester.post("/posts", postData);
};
