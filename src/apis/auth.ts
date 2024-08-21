import { AxiosResponse } from "axios";
import { apiRequester } from "./apiRequester";

// 사용자 정보를 정의하는 타입
export interface User {
  id: number;
  username: string;
  email: string;
  location: string;
  createdAt: string;
  lastLoginAt: string;
}

// 카카오 로그인 응답을 정의하는 타입
export interface KakaoLoginResponse {
  user: User;
}

// 카카오 로그인 인증 코드를 사용해 로그인 요청을 하는 함수
export const loginWithKakao = (
  code: string
): Promise<AxiosResponse<KakaoLoginResponse>> => {
  return apiRequester.post<KakaoLoginResponse>("/auth/kakao", { code });
};
