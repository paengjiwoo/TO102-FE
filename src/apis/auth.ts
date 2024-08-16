// src/api/auth.ts

import { apiRequester } from "./apiRequester";

// 카카오 로그인 인증 코드를 사용해 로그인 요청을 하는 함수
export const loginWithKakao = (code: string) => {
  return apiRequester.post("/auth/kakao", { code });
};
