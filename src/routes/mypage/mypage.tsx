import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import UserInfoBox from "../../components/profile/UserInfoBox";
import "../../styles/Mypage.scss";
import MyPosts from "./myposts";
import MyFriends from "./myfriends";
import NotificationSettings from "./NotificationSettings"; // 추가된 컴포넌트
import { useProfileData } from "../../hooks/useProfileData";

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useProfileData();
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const handleComponentClick = (component: string) => {
    setActiveComponent(activeComponent === component ? null : component);
  };

  return (
    <div className="my-page-container">
      <UserInfoBox user={user} />

      {activeComponent === "myposts" ? (
        <div>
          <h2 onClick={() => handleComponentClick("myposts")}>내 게시글</h2>
          <MyPosts />
        </div>
      ) : activeComponent === "myfriends" ? (
        <div>
          <h2 onClick={() => handleComponentClick("myfriends")}>
            나의 토백이들
          </h2>
          <MyFriends />
        </div>
      ) : activeComponent === "notifications" ? (
        <div>
          <h2 onClick={() => handleComponentClick("notifications")}>
            알림 설정
          </h2>
          <NotificationSettings />
        </div>
      ) : (
        <div className="settings-list">
          <div
            className="settings-item"
            onClick={() => navigate({ to: "/mypage/VerifyLocation" })}
          >
            내 동네 설정
          </div>
          <div
            className="settings-item"
            onClick={() => handleComponentClick("myfriends")}
          >
            나의 토백이들
          </div>
          <div
            className="settings-item"
            onClick={() => handleComponentClick("notifications")}
          >
            알림 설정
          </div>
          <div
            className="settings-item"
            onClick={() => handleComponentClick("myposts")}
          >
            내 게시글
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;

export const Route = createFileRoute("/mypage/mypage")({
  component: MyPage,
});
