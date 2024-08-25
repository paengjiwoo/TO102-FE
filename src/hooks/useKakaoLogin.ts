import { useState } from "react";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_API_URL}/auth/kakao/callback`;
export const useKakaoLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  //http://localhost:3000/auth/kakao/callback?code=dsafdasfdsaf
  const handleLogin = () => {
    setIsLoading(true);
    window.location.href = KAKAO_AUTH_URL;
  };

  return { handleLogin, isLoading };
};
