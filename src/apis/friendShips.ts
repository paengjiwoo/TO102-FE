import axios from "axios";

// 친구 관계 상태 타입 정의
export type FriendshipStatus = "pending" | "accepted" | "rejected";

// 친구 정보 타입 정의
export interface Friend {
  id: number;
  username: string;
  status: FriendshipStatus;
}

// 새로운 친구 요청을 보낼 때 사용되는 요청 데이터 타입
export interface FriendRequestData {
  addresseeId: number;
}

// 친구 관계 응답 데이터 타입 정의
export interface FriendshipResponse {
  id: number;
  requesterId: number;
  addresseeId: number;
  status: FriendshipStatus;
  createdAt: string;
  updatedAt: string;
}

// 친구 관계 API 정의

// 1. 모든 친구 관계 조회
export const fetchAllFriendships = () => {
  return axios.get<Friend[]>("/api/friendships"); // 실제 API 경로로 수정하세요.
};

// 2. 친구 요청 보내기
export const sendFriendRequest = (data: FriendRequestData) => {
  return axios.post<FriendshipResponse>("/api/friendships", data); // 실제 API 경로로 수정하세요.
};

// 3. 친구 요청 수락/거절
export const respondToFriendRequest = (
  id: number,
  response: "accepted" | "rejected"
) => {
  return axios.put<FriendshipResponse>(`/api/friendships/${id}`, { response }); // 실제 API 경로로 수정하세요.
};

// 4. 친구 관계 삭제
export const deleteFriendship = (id: number) => {
  return axios.delete(`/api/friendships/${id}`); // 실제 API 경로로 수정하세요.
};
