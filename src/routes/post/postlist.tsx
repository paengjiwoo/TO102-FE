import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import "../../styles/PostList.scss";
import { fetchPosts } from "../../apis/posts";
import plus from "../../assets/icons/plus.svg";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import locationImg from "../../assets/icons/locationImg.svg";
import LoadingSpinner from "../../components/common/LoadingSpinner";

type Category = "동행" | "맛집" | "가이드";

const PostList: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]); // 배열로 변경
  const location = useCurrentLocation();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const toggleCategory = (category: Category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((c) => c !== category)
      );
    } else {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const filteredPosts =
    selectedCategories.length > 0
      ? posts?.data.filter((post: any) =>
          selectedCategories.includes(post.category)
        )
      : posts?.data;

  return (
    <div className="post-list-container">
      <div className="location-header">
        {location && <img src={locationImg} alt="location" />}
        <span>{location || "위치를 확인 중입니다..."}</span>
      </div>

      <div className="category-select">
        {["동행", "맛집", "가이드"].map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category as Category)}
            className={
              selectedCategories.includes(category as Category)
                ? "selected"
                : ""
            }
          >
            #{category}
          </button>
        ))}
      </div>

      <div className="posts">
        {filteredPosts?.map((post: any) => (
          <div className="post-card" key={post.id}>
            <img src={post.image} alt={post.title} className="post-image" />
            <div className="post-content">
              <div className="post-category-date">
                <span className="post-category">{post.category}</span>
                <span className="post-date">{post.date}</span>
              </div>
              <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
              </Link>
              <div className="post-location">
                <span>{post.location}</span>
              </div>
              <div className="post-status">
                <button
                  className={
                    post.status === "진행중" ? "progress" : "completed"
                  }
                >
                  {post.status}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link to="/post/CreatePost">
        <div className="create-post-button">
          <img src={plus} alt="plus" className="plus" />
        </div>
      </Link>
    </div>
  );
};

export default PostList;

export const Route = createFileRoute("/post/postlist")({
  component: PostList,
});
