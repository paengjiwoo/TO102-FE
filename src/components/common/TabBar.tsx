// src/components/common/Footer.tsx
import React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import "../../styles/common/TabBar.scss";
import {
  IoChatboxEllipsesOutline,
  IoHomeOutline,
  IoMapOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";

const TabBar: React.FC = () => {
  const location = useLocation();

  const tabs = [
    { label: "지도 찾기", path: "/", params: null, src: IoMapOutline, id: "" },
    {
      label: "토백이 소식",
      path: "/post/posts",
      params: null,
      src: IoHomeOutline,
      id: "post",
    },
    {
      label: "채팅",
      path: "/rooms",
      params: null,
      src: IoChatboxEllipsesOutline,
      id: "rooms",
    },
    {
      label: "내 정보",
      path: "/profile/$userId",
      params: { userId: "123" },
      src: IoPersonCircleOutline,
      id: "profile",
    },
  ];

  return (
    <footer className="footer">
      <nav className="footer__nav">
        {tabs.map((tab) => {
          const isParams = !!tab.params;
          const isActive = location.href.split("/")[1] === tab.id;
          const Icon = tab.src;

          if (isParams) {
            return (
              <Link
                key={tab.id}
                to={tab.path}
                params={tab.params}
                className="footer__link"
              >
                <Icon
                  className={`footer__${isActive ? "active-icon" : "icon"}`}
                />
                <span
                  className={`footer__${isActive ? "active-text" : "text"}`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          } else {
            return (
              <Link key={tab.id} to={tab.path} className="footer__link">
                <Icon
                  className={`footer__${isActive ? "active-icon" : "icon"}`}
                />
                <span
                  className={`footer__${isActive ? "active-text" : "text"}`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          }
        })}
      </nav>
    </footer>
  );
};

export default TabBar;
