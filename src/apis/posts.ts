import { AxiosResponse } from "axios";
import { apiRequester } from "./apiRequester";

// 게시글 작성 시 사용하는 데이터 타입
export interface CreatePostData {
  title: string;
  content: string;
  province: string;
  city: string;
  postTags: string[];
  thumbnail: string;
  status: string;
}

// 게시글 수정 시 사용하는 데이터 타입
export interface UpdatePostData {
  title: string;
  content: string;
  postTags: string[];
  thumbnail?: string;
  status?: string;
}

// 게시글 응답 데이터 타입
export interface PostResponse {
  postId: number;
  title: string;
  meetingDate: string;
  content: string;
  thumbnail: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  province: string;
  city: string;
  postTags: string[];
  viewCount?: number;
}

// 모든 게시글 조회 (정렬 옵션 가능)
export const fetchAllPosts = (
  sort?: string
): Promise<AxiosResponse<PostResponse[]>> => {
  return apiRequester.get<PostResponse[]>("/posts/postlist", {
    params: { sort },
  });
};

// 최신 게시글 10개 조회
export const fetchLatestPosts = (): Promise<
  AxiosResponse<Pick<PostResponse, "postId" | "title">[]>
> => {
  return apiRequester.get<Pick<PostResponse, "postId" | "title">[]>(
    "/posts/latest"
  );
};

// 특정 게시글 조회
export const fetchPostById = (
  id: string
): Promise<AxiosResponse<PostResponse>> => {
  return apiRequester.get<PostResponse>(`/posts/${id}`);
};

// 새 게시글 작성
export const createPost = (
  postData: CreatePostData
): Promise<AxiosResponse<PostResponse>> => {
  return apiRequester.post<PostResponse>("/posts", postData);
};

// 게시글 수정
export const updatePost = (
  id: number,
  postData: UpdatePostData
): Promise<AxiosResponse<PostResponse>> => {
  return apiRequester.put<PostResponse>(`/posts/${id}`, postData);
};

// 게시글 삭제
export const deletePost = (id: number): Promise<AxiosResponse<void>> => {
  return apiRequester.delete<void>(`/posts/${id}`);
};

// 특정 위치의 게시글 조회
export const fetchPostsByLocation = (
  province: string,
  city: string
): Promise<AxiosResponse<PostResponse[]>> => {
  return apiRequester.get<PostResponse[]>(`/posts/location`, {
    params: { province, city },
  });
};

// 특정 태그의 게시글 조회
export const fetchPostsByTag = (
  tagName: string
): Promise<AxiosResponse<PostResponse[]>> => {
  return apiRequester.get<PostResponse[]>(`/posts/tag/${tagName}`);
};
