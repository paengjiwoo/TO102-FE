import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import "../../styles/mypage/MyPosts.scss";
import { PostResponse, fetchAllPosts } from "../../apis/posts";
import image1 from "../../assets/icons/image1.svg"; // Basic image
import Vertor from "../../assets/icons/Vertor.svg"; // More options icon

const MyPosts: React.FC = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]); // 초기값을 빈 배열로 설정
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchAllPosts(); // API 호출
        if (Array.isArray(response.data)) {
          // response.data가 배열인지 확인
          setPosts(response.data);
        } else {
          console.error(
            "API returned data that is not an array:",
            response.data
          );
        }
      } catch (error) {
        console.error("게시글을 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    loadPosts();
  }, []);

  const handleMoreClick = (postId: number) => {
    setSelectedPostId(postId === selectedPostId ? null : postId);
  };

  const handleEdit = (postId: number) => {
    console.log("Editing post:", postId);
  };

  const handleDelete = (postId: number) => {
    console.log("Deleting post:", postId);
  };

  return (
    <div className="my-posts-container">
      {Array.isArray(posts) && posts.length > 0 ? ( // posts가 배열인지 확인
        posts.map((post) => (
          <div key={post.postId} className="post-card">
            <div className="post-info">
              <img
                src={post.thumbnail || image1}
                alt={post.title}
                className="post-image"
              />
              <div className="post-details">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-date">{post.meetingDate}</p>
                <p
                  className={`post-status ${post.status === "완료" ? "completed" : ""}`}
                >
                  {post.status}
                </p>
              </div>
            </div>
            <div className="post-actions">
              <Link
                to={`/posts/${post.postId}/reviews`}
                className="review-button"
              >
                받은 후기 보기
              </Link>
              <button
                className="more-button"
                onClick={() => handleMoreClick(post.postId)}
              >
                <img src={Vertor} alt="More options" />
              </button>
              {selectedPostId === post.postId && (
                <div className="dropdown-menu">
                  <button onClick={() => handleEdit(post.postId)}>수정</button>
                  <button onClick={() => handleDelete(post.postId)}>
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
};

export default MyPosts;

export const Route = createFileRoute("/mypage/myposts")({
  component: MyPosts,
});
