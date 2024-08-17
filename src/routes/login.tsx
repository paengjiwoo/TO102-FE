import React from "react";
import "../styles/Login.scss";
import loginImg from "../assets/icons/loginImg.svg";

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">토백이</h1>
        <p className="login-subtitle">전국의 102명 여행 친구 만들기</p>
        <img src={loginImg} alt="login" className="login-image" />
        <KakaoLoginButton />
      </div>
    </div>
  );
};

export default Login;

// TanStack Router용 Route 내보내기 추가
import { createFileRoute } from "@tanstack/react-router";
import KakaoLoginButton from "../components/common/kakaoLoginButton";

export const Route = createFileRoute("/login")({
  component: Login,
});
