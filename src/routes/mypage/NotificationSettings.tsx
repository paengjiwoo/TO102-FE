import React, { useState, useEffect } from "react";
import "../../styles/mypage/NotificationSettings.scss";
import {
  fetchUserPreferences,
  updateUserPreferences,
  UserPreferences,
} from "../../apis/preferences";
import { createFileRoute } from "@tanstack/react-router";

const NotificationSettings: React.FC = () => {
  const userId = "1"; // 실제 사용자의 ID로 대체해야 합니다.
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 사용자의 설정을 불러옴
    const loadPreferences = async () => {
      try {
        const response = await fetchUserPreferences(userId);
        setPreferences(response.data);
      } catch (error) {
        console.error("Failed to load user preferences:", error);
      }
    };

    loadPreferences();
  }, [userId]);

  const toggleChatNotifications = async () => {
    if (preferences) {
      const updatedPreferences = {
        ...preferences,
        notificationsEnabled: !preferences.notificationsEnabled,
      };

      try {
        const response = await updateUserPreferences(
          userId,
          updatedPreferences
        );
        setPreferences(response.data); // 서버에서 업데이트된 설정을 다시 반영
      } catch (error) {
        console.error("Failed to update user preferences:", error);
      }
    }
  };

  if (!preferences) {
    return <div>Loading...</div>; // 설정을 불러오는 동안 로딩 상태 표시
  }

  return (
    <div className="notification-settings-container">
      <div className="notification-item">
        <div className="notification-label">
          <p>채팅 알림</p>
          <span>채팅 메시지</span>
        </div>
        <div className="toggle-switch">
          <input
            type="checkbox"
            id="chat-notifications"
            checked={preferences.notificationsEnabled}
            onChange={toggleChatNotifications}
          />
          <label htmlFor="chat-notifications" className="toggle-label"></label>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;

export const Route = createFileRoute("/mypage/NotificationSettings")({
  component: NotificationSettings,
});
