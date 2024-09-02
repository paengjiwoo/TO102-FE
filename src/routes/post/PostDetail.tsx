import React, { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/post/PostDetail.scss";
import image1 from "../../assets/icons/image1.svg";
import image2 from "../../assets/icons/image2.svg";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import profilepicture from "../../assets/icons/profilepicture.svg";
import locationImg from "../../assets/icons/locationImg.svg";
import { PostResponse } from "../../apis/posts";
import { CreateChatroom } from "../../utils/CreateChatroom";

const PostDetail: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userIsAuthor = true;

  const post: PostResponse = {
    postId: 1,
    title: "빠른 북한산 1박 2일 글램핑 🏕️",
    content: `가을을 맞아 1박 2일 글램핑을 떠날 예정입니다. 
              글램핑은 역시 가을이지요. 바베큐도 더 맛있을 듯 합니다.
              궁금하신 분들은 후기 충분히 보시고 채팅 부탁드립니다.
              최대한 많은 인원과 함께 좋은 추억 공유하고자 합니다. 감사합니다.`,
    meetingDate: "2024-08-14",
    thumbnail: image1,
    status: "진행중",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2일 전
    updatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    userId: "고양이와 춤을",
    province: "서울특별시",
    city: "은평구",
    postTags: ["가이드", "술친구"],
    viewCount: 123,
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditPost = () => {
    navigate({ to: `/posts/EditPost/${post.postId}` });
  };

  const handleDeletePost = () => {
    const confirmed = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
    if (confirmed) {
      alert("게시글이 삭제되었습니다.");
      navigate({ to: "/post/posts" });
    }
  };

  const handleReportPost = () => {
    alert("이 게시글이 신고되었습니다.");
  };

  const handleChat = async () => {
    const { len } =  await CreateChatroom(post.postId);
    await navigate({ to: `/chat/${len}`})
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = (now.getTime() - date.getTime()) / 1000;

    if (diffInSeconds < 60) {
      return `${Math.floor(diffInSeconds)}초 전`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}분 전`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    } else if (diffInSeconds < 2592000) {
      return `${Math.floor(diffInSeconds / 86400)}일 전`;
    } else {
      return `${Math.floor(diffInSeconds / 2592000)}달 전`;
    }
  };

  return (
    <div className="post-detail-container">
      <header className="post-header">
        <div className="header-left">
          <button
            className="back-button"
            onClick={() => navigate({ to: "/post/posts" })}
          >
            <img src={arrowLeft} alt="arrow" />
          </button>
          <div className="location-info">
            <img src={locationImg} alt="location" className="location-icon" />
            <h3 className="location-text">{`${post.province} ${post.city}`}</h3>
          </div>
        </div>
        <button className="menu-button" onClick={handleMenuToggle}>
          ⋮
        </button>
        {isMenuOpen && (
          <div className="dropdown-menu">
            {userIsAuthor ? (
              <>
                <button onClick={handleEditPost}>수정하기</button>
                <button onClick={handleDeletePost}>삭제하기</button>
              </>
            ) : (
              <button onClick={handleReportPost}>신고하기</button>
            )}
          </div>
        )}
      </header>
      <div className="post-images">
        <Slider {...settings}>
          <div>
            <img src={post.thumbnail} alt="post-thumbnail" />
          </div>
          <div>
            <img src={image2} alt="post-thumbnail" />
          </div>
        </Slider>
      </div>
      <div className="post-author">
        <img
          src={profilepicture}
          alt="profile"
          className="profile-img"
          onClick={() => navigate({ to: `/profile/${post.userId}` })}
        />
        <div className="author-details">
          <p>{post.userId}</p>
          <div className="location-info">
            <img src={locationImg} alt="location" className="location-icon" />
            <p className="location-text">{`${post.province} ${post.city}`}</p>
          </div>
        </div>
        <p className="post-date">{formatTimeAgo(post.createdAt)}</p>
      </div>
      <h2>{post.title}</h2>
      <p className="meeting-date">{post.meetingDate} 모임</p>
      <p className="content-text">{post.content}</p>
      <div className="post-tags-and-chat">
        <div className="post-tags">
          {post.postTags.map((tag, index) => (
            <button key={index} className="tag-button">
              {tag}
            </button>
          ))}
        </div>
        <button className="chat-button" onClick={handleChat}>
          채팅하기
        </button>
      </div>
    </div>
  );
};

export default PostDetail;

export const Route = createFileRoute("/post/PostDetail")({
  component: PostDetail,
});
