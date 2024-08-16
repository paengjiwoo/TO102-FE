import React, { useEffect } from "react";
import { loginWithKakao } from "../../apis/auth";

const KakaoCallback: React.FC = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code) {
      console.log("카카오 로그인 인증 코드:", code);

      loginWithKakao(code)
        .then((response) => {
          console.log("로그인 성공:", response.data);
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("로그인 처리 중 오류 발생:", error);
        });
    }
  }, []);

  return <div>로그인 처리 중...</div>;
};

export default KakaoCallback;
