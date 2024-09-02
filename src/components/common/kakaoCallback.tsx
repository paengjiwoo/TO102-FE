import React, { useEffect } from "react";

const KakaoCallback: React.FC = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code) {
      console.log("카카오 로그인 인증 코드:", code);
    }
  }, []);

  return <div>로그인 처리 중...</div>;
};

export default KakaoCallback;
