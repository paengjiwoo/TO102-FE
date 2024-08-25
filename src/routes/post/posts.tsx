import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import "../../styles/post/PostList.scss";
import { PostResponse } from "../../apis/posts";
import plus from "../../assets/icons/plus.svg";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import locationImg from "../../assets/icons/locationImg.svg";
import image1 from "../../assets/icons/image1.svg";
import image2 from "../../assets/icons/image2.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import BounceLoader from "../../components/common/BounceLoader";
const mockPosts: PostResponse[] = [
  {
    postId: 1,
    title: "빠른 북한산 1박 2일 글램핑 🏕️",
    meetingDate: "2024-08-14",
    content: "북한산에서 즐기는 1박 2일 글램핑 여행입니다.",
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    postTags: ["동행", "가이드"],
    thumbnail: image1,
    province: "서울특별시",
    city: "노원구",
    userId: "고양이와 춤을",
    viewCount: 123,
    status: "진행중",
  },
  {
    postId: 2,
    title: "강릉 바다여행 함께해요 🌊",
    meetingDate: "2024-08-20",
    content: "강릉 바다에서 함께 즐길 여행을 계획하고 있습니다.",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    postTags: ["맛집"],
    thumbnail: image2,
    province: "강원도",
    city: "강릉시",
    userId: "여행을 즐기며",
    viewCount: 234,
    status: "진행중",
  },
  {
    postId: 3,
    title: "강릉 바다여행 함께해요 🌊",
    meetingDate: "2024-08-20",
    content: "강릉에서 바다를 만끽하며 맛있는 음식을 즐겨봐요.",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    postTags: ["맛집"],
    thumbnail: image2,
    province: "강원도",
    city: "강릉시",
    userId: "여행을 즐기며",
    viewCount: 234,
    status: "진행중",
  },
  {
    postId: 4,
    title: "강릉 바다여행 함께해요 🌊",
    meetingDate: "2024-08-20",
    content: "강릉에서의 멋진 바다 여행을 함께해요.",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    postTags: ["맛집"],
    thumbnail: image2,
    province: "강원도",
    city: "강릉시",
    userId: "여행을 즐기며",
    viewCount: 234,
    status: "진행중",
  },
];

type Category = "동행" | "맛집" | "가이드";

const PostList: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<PostResponse[]>(mockPosts.slice(0, 10));
  const [hasMore, setHasMore] = useState(true);
  const location = useCurrentLocation();

  const fetchMoreData = () => {
    if (items.length >= mockPosts.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...mockPosts.slice(prevItems.length, prevItems.length + 10),
      ]);
    }, 500);
  };

  const toggleCategory = (category: Category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((c) => c !== category)
      );
    } else {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  const filteredPosts = selectedCategories.length
    ? items.filter((post) =>
        post.postTags.some((postTags) =>
          selectedCategories.includes(postTags as Category)
        )
      )
    : items;

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
    <div className="post-list-container">
      <div className="location-header">
        {location && (
          <img src={locationImg} alt="location" className="location-img" />
        )}
        <span className="location-text">
          {location
            ? `${location.province} ${location.city}`
            : "위치를 확인 중입니다..."}
        </span>
      </div>

      <div className="category-select">
        {["동행", "맛집", "가이드"].map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category as Category)}
            className={
              selectedCategories.includes(category as Category)
                ? "category-button selected"
                : "category-button"
            }
          >
            #{category}
          </button>
        ))}
      </div>

      <InfiniteScroll
        dataLength={filteredPosts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<BounceLoader />}
        scrollThreshold={0.9}
        endMessage={
          <p style={{ textAlign: "center" }}>더 이상 항목이 없습니다</p>
        }
      >
        <div className="posts">
          {(Array.isArray(filteredPosts) ? filteredPosts : []).map((post) => (
            <div className="post-card" key={post.postId}>
              <div>
                <img
                  src={post.thumbnail || image1}
                  alt={post.title}
                  className="post-image"
                />
                <div className="post-location">
                  <span>
                    {post.province && post.city
                      ? `${post.province} ${post.city}`
                      : "위치 정보 없음"}
                  </span>
                </div>
              </div>
              <div className="post-content">
                <div className="post-category-date">
                  <span className="post-category">
                    {post.postTags.join(", ")}
                  </span>
                  <span className="post-date">
                    {formatTimeAgo(post.createdAt)}
                  </span>
                </div>
                <Link to={`/posts/${post.userId}`} className="post-title-link">
                  <h3 className="post-title">{post.title}</h3>
                </Link>
                <div className="post-author">
                  <span>{post.userId}</span>
                </div>
                <div className="post-status">
                  <button
                    className={`status-button ${
                      post.status === "진행중" ? "progress" : "completed"
                    }`}
                  >
                    {post.status}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>

      <Link to="/post/CreatePost">
        <div className="create-post-button">
          <img src={plus} alt="plus" className="plus-icon" />
        </div>
      </Link>
    </div>
  );
};

export default PostList;

export const Route = createFileRoute("/post/posts")({
  component: PostList,
});
