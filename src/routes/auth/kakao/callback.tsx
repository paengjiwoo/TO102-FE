import React, { useEffect, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { handleKakaoCallback, getKakaoUserInfo } from "../../../apis/auth";
import useUserStore from "../../../store/useUserStore";

const Callback: React.FC = () => {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const [message, setMessage] = useState<string>("로그인 처리 중...");
  // const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    const processLogin = async (accessToken: string) => {
      try {
        await handleKakaoCallback(accessToken);
        localStorage.setItem("kakaoToken", accessToken);

        // 사용자 정보 가져오기
        const userInfo = await getKakaoUserInfo(accessToken);
        setUser(userInfo);

        setMessage("로그인 성공!");
        // setTimeout(() => {
        //   router.navigate({ to: "/" });
        // }, 1000);
      } catch (error) {
        console.error("토큰 처리 중 오류 발생:", error);
        setMessage("로그인 처리에 실패했습니다. 다시 시도해주세요.");
        setTimeout(() => {
          router.navigate({ to: "/login" });
        }, 2000);
      }
    };

    if (token) {
      console.log("카카오 액세스 토큰 받음:", token);
      processLogin(token);
    } else {
      console.error("액세스 토큰이 URL에 존재하지 않습니다.");
      setMessage("인증 정보가 존재하지 않습니다. 다시 시도해주세요.");
      setTimeout(() => {
        router.navigate({ to: "/login" });
      }, 2000);
    }

    setTimeout(() => {
      // router.navigate({ to: "/" });
    }, 3000);
  }, [router]);

  return (
    <div>
      <p>{message}</p>
      {user.nickname && (
        <div>
          <h2>현재 사용자 정보</h2>
          <p>이름: {user.nickname}</p>
          <p>이메일: {user.email}</p>
          {user.profile_image && (
            <img src={user.profile_image} alt="프로필 사진" />
          )}
        </div>
      )}
    </div>
  );
};

// 라우트 설정
export const Route = createFileRoute("/auth/kakao/callback")({
  component: Callback,
});

export default Callback;
