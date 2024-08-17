import { useState } from "react";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=a7cf8b3c3ad90ad3e042be5f708c6bb7&redirect_uri=${encodeURIComponent("http://localhost:5173/auth/kakao/callback")}&response_type=code`;

export const useKakaoLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    window.location.href = KAKAO_AUTH_URL;
  };

  return { handleLogin, isLoading };
};
