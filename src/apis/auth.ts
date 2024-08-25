// 사용자 정보를 정의하는 타입
export interface User {
  id: number;
  username: string;
  email: string;
  location: string;
  createdAt: string;
  lastLoginAt: string;
}

// 카카오 로그인 응답을 정의하는 타입
export interface KakaoLoginResponse {
  user: User;
}

// // 카카오 로그인 인증 코드를 사용해 로그인 요청을 하는 함수
// export const loginWithKakao = (code: string): Promise<AxiosResponse<KakaoLoginResponse>> => {
//   return apiRequester.get<KakaoLoginResponse>(`/auth/kakao?code=${code}`);
// };
export const handleKakaoCallback = async (token: string) => {
  // JWT 토큰을 로컬 스토리지에 저장
  localStorage.setItem("token", token);

  return Promise.resolve();
};

import axios from "axios";

export const getKakaoUserInfo = async (accessToken: string) => {
  try {
    const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const { id, kakao_account, properties } = response.data;
    return {
      id: id.toString(),
      nickname: properties.nickname,
      email: kakao_account.email,
      profile_image: properties.profile_image,
    };
  } catch (error) {
    console.error("Error fetching Kakao user info:", error);
    throw error;
  }
};
