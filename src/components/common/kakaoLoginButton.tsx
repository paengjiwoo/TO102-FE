import React from "react";
import { useKakaoLogin } from "../../hooks/useKakaoLogin";
import "../../styles/Login.scss";
import { kakaoButton, kakaoIcon } from "../../assets/icons"; // kakaoIcon도 함께 import

const KakaoLoginButton: React.FC = () => {
  const { handleLogin, isLoading } = useKakaoLogin();

  return (
    <button className="kakao-button" onClick={handleLogin} disabled={isLoading}>
      {isLoading ? (
        "로그인 중..."
      ) : (
        <>
          <img src={kakaoIcon} alt="kakaoIcon" /> 카카오로 로그인하기
        </>
      )}
    </button>
  );
};

export default KakaoLoginButton;
