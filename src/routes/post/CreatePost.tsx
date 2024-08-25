import React, { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import "../../styles/post/CreatePost.scss";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import pictureImg from "../../assets/icons/pictureImg.svg";
import tagImg from "../../assets/icons/tagImg.svg";
import { createPost } from "../../apis/posts";

// 게시글 데이터를 정의하는 타입
interface PostData {
  title: string;
  meetingDate: string;
  content: string;
  postTags: string[];
  province: string;
  city: string;
  thumbnail: string; // API에서 string 타입만을 기대하므로 수정
  status: string;
}

const categories = ["동행", "맛집", "가이드"] as const;

type Category = (typeof categories)[number];

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [isTagSheetOpen, setIsTagSheetOpen] = useState(false);
  const [location, setLocation] = useState<{
    province: string;
    city: string;
  } | null>(null);
  const currentLocation = useCurrentLocation(); // Hook을 컴포넌트 최상위에서 호출
  const navigate = useNavigate();

  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...fileArray].slice(0, 10));
    }
  };

  const handleLocationCheck = () => {
    setLocation(currentLocation);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const confirmed = window.confirm("작성 완료하겠습니까?");
    if (confirmed && location) {
      const postData: PostData = {
        title,
        meetingDate,
        content,
        postTags: selectedCategories,
        province: location.province,
        city: location.city,
        thumbnail: images.length > 0 ? URL.createObjectURL(images[0]) : "", // 빈 문자열로 설정
        status: "진행중",
      };

      try {
        const response = await createPost(postData);
        const id = response.data.postId;
        navigate({ to: `/post/PostDetail/${id}` });
      } catch (error) {
        console.error("게시글 작성 중 오류가 발생했습니다.", error);
      }
    }
  };

  const handleClose = () => {
    navigate({ to: "/post/posts" });
  };

  return (
    <div className="create-post-container">
      <div className="header">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <h2>토백이 글쓰기</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group inline">
          <div className="select-group">
            <div className="image-upload-group">
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                multiple
                accept="image/*"
                style={{ display: "none" }}
              />
              <label htmlFor="image" className="image-upload-label">
                <img src={pictureImg} alt="Upload" />
                <span>{images.length}/10</span>
              </label>
            </div>
            <div
              className="tag-select-group"
              onClick={() => setIsTagSheetOpen(true)}
            >
              <button type="button" className="tag-select-group-button">
                <img src={tagImg} alt="Tag Selection" />
                <span>태그 선택</span>
              </button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="제목"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">만남 날짜</label>
          <input
            type="date"
            id="date"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">자세한 설명</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="올리실 게시글 내용을 작성해 주세요."
          />
        </div>

        <div className="form-group location-wrapper">
          <label>위치</label>
          <div className="location-input">
            <span>
              {location?.province && location?.city
                ? `${location.province}, ${location.city}`
                : "위치를 확인 중입니다..."}
            </span>
            <button
              type="button"
              className="location-check-button"
              onClick={handleLocationCheck}
            >
              현재 위치 확인
            </button>
          </div>
        </div>

        <button type="submit" className="submit-button">
          게시글 작성
        </button>
      </form>

      {isTagSheetOpen && (
        <div className="bottom-sheet">
          <div className="sheet-header">
            <span>태그 선택</span>
            <button onClick={() => setIsTagSheetOpen(false)}>닫기</button>
          </div>
          <div className="category-select">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={
                  selectedCategories.includes(category) ? "selected" : ""
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;

export const Route = createFileRoute("/post/CreatePost")({
  component: CreatePost,
});
