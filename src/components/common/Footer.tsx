// src/components/common/Footer.tsx
import React from "react";
import { Link } from "@tanstack/react-router";
import "../../styles/Footer.scss";
import { chatIcon, homeIcon, mapIcon, profileIcon } from "../../assets/icons";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <nav className="footer__nav">
        <Link to="/" className="footer__link">
          <img src={mapIcon} alt="지도 찾기" className="footer__icon" />
          <span className="footer__text">지도 찾기</span>
        </Link>
        <Link to="/post/posts" className="footer__link">
          <img src={homeIcon} alt="토백이 소식" className="footer__icon" />
          <span className="footer__text">토백이 소식</span>
        </Link>
        <Link to="/rooms" className="footer__link">
          <img src={chatIcon} alt="채팅" className="footer__icon" />
          <span className="footer__text">채팅</span>
        </Link>
        <Link to="/profile/$userId" params={{ userId: "123" }}>
          <img src={profileIcon} alt="내 정보" className="footer__icon" />
          <span className="footer__text">내 정보</span>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
