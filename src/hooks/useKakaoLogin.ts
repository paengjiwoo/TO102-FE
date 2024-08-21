import { useState } from "react";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_KAKAO_REDIRECT_URI)}&response_type=code`;

export const useKakaoLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    window.location.href = KAKAO_AUTH_URL; // 카카오 로그인 페이지로 리다이렉트
  };

  return { handleLogin, isLoading };
};
