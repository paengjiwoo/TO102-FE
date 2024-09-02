import axios from "axios";

export interface UserPreferences {
  notificationsEnabled: boolean;
  notificationTypes: string[];
  theme: string;
  language: string;
  additionalSettings: {
    postRadius: number;
  };
}

// 사용자 설정 조회
export const fetchUserPreferences = (userId: string) => {
  return axios.get<UserPreferences>(`/preferences/${userId}`);
};

// 사용자 설정 수정
export const updateUserPreferences = (
  userId: string,
  preferences: UserPreferences
) => {
  return axios.put<UserPreferences>(`/preferences/${userId}`, preferences);
};
