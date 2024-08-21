import React, { useEffect, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AxiosResponse } from "axios";
import { loginWithKakao, KakaoLoginResponse } from "../../../apis/auth";

const Callback: React.FC = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("로그인 처리 중...");

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code) {
      console.log("카카오 로그인 인증 코드:", code);

      loginWithKakao(code)
        .then((response: AxiosResponse<KakaoLoginResponse>) => {
          const { user } = response.data;
          setMessage(`환영합니다, ${user.username}!`);
          setTimeout(() => {
            router.navigate({ to: "/" });
          }, 2000);
        })
        .catch((error) => {
          console.error("로그인 처리 중 오류 발생:", error);
          if (error.response) {
            // 서버가 응답을 반환한 경우
            console.error("응답 데이터:", error.response.data);
            console.error("응답 상태:", error.response.status);
            console.error("응답 헤더:", error.response.headers);
            setMessage(
              "서버 오류: " + error.response.data.message ||
                "로그인 처리에 실패했습니다. 다시 시도해주세요."
            );
          } else if (error.request) {
            // 요청이 전송되었으나 응답이 없는 경우
            console.error("요청 데이터:", error.request);
            setMessage(
              "서버로부터 응답이 없습니다. 잠시 후 다시 시도해주세요."
            );
          } else {
            // 요청을 설정하는 도중 발생한 오류
            console.error("오류 메시지:", error.message);
            setMessage("요청 설정 중 오류가 발생했습니다.");
          }

          setTimeout(() => {
            router.navigate({ to: "/login" });
          }, 2000);
        });
    } else {
      console.error("카카오 인증 코드가 URL에 존재하지 않습니다.");
      setMessage("인증 코드가 존재하지 않습니다. 다시 시도해주세요.");
      setTimeout(() => {
        router.navigate({ to: "/login" });
      }, 2000);
    }
  }, [router]);

  return <div>{message}</div>;
};

// 라우트 설정
export const Route = createFileRoute("/auth/kakao/callback")({
  component: Callback,
});

export default Callback;
