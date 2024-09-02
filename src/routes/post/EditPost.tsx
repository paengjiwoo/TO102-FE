import React, { useState, useEffect } from "react";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import "../../styles/post/CreatePost.scss";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import pictureImg from "../../assets/icons/pictureImg.svg";
import tagImg from "../../assets/icons/tagImg.svg";
import { fetchPostById, updatePost, PostResponse } from "../../apis/posts";

const categories = ["동행", "맛집", "가이드"] as const;
type Category = (typeof categories)[number];

const EditPost: React.FC = () => {
  const params = useParams({
    from: "/post/EditPost", // 현재 경로를 지정
    select: (params: any) => ({ id: params.id }), // id를 선택
  });
  const id = params.id;
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<(File | string)[]>([]);
  const [isTagSheetOpen, setIsTagSheetOpen] = useState(false);
  const location = useCurrentLocation();

  useEffect(() => {
    if (id) {
      fetchPostById(id).then((response) => {
        const data: PostResponse = response.data;
        setTitle(data.title);
        setDate(data.meetingDate || "");
        setContent(data.content || "");
        setSelectedCategories(data.postTags as Category[]);
        if (data.thumbnail) {
          setImages([data.thumbnail]);
        }
      });
    }
  }, [id]);

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
      setImages(
        (prevImages) =>
          [...prevImages, ...fileArray].slice(0, 10) as (File | string)[]
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const confirmed = window.confirm("수정 완료하겠습니까?");
    if (confirmed && id) {
      const postData = {
        title,
        content,
        postTags: selectedCategories,
        thumbnail: images[0] as string,
      };

      await updatePost(Number(id), postData);
      navigate({ to: `/post/${id}` });
    }
  };

  const handleClose = () => {
    navigate({ to: "/post/posts" });
  };

  return (
    <div className="edit-post-container">
      <div className="header">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <h2>게시글 수정</h2>
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            disabled
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
                ? `${location.province} ${location.city}`
                : "위치를 확인 중입니다..."}
            </span>
            <button type="button" className="location-check-button">
              현재 위치 확인
            </button>
          </div>
        </div>

        <button type="submit" className="submit-button">
          수정 완료
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

export default EditPost;

export const Route = createFileRoute("/post/EditPost")({
  component: EditPost,
});
