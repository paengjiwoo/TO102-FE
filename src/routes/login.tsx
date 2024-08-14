import React from "react";
import "../styles/Login.scss";
import { kakaoIcon, loginImg } from "../assets/icons";
import { createFileRoute } from "@tanstack/react-router";

const Login: React.FC = () => {
  const handleKakaoLogin = () => {
    // 카카오 로그인 로직을 여기에 구현합니다.
    // 예: window.location.href = "https://kauth.kakao.com/oauth/authorize?...";
    console.log("Kakao login clicked");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">토백이</h1>
        <p className="login-subtitle">전국의 102명 여행 친구 만들기</p>
        <img src={loginImg} alt="login" className="login-image" />
        <button className="kakao-button" onClick={handleKakaoLogin}>
          <img src={kakaoIcon} alt="Kakao icon" />
          카카오로 로그인하기 login
        </button>
      </div>
    </div>
  );
};

export default Login;

export const Route = createFileRoute("/login")({
  component: Login,
});
