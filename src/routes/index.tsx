import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { locations } from "../models/location.model";
import { TLocation } from "../models/location.model";
import '../styles/index.scss'
import RecentCarousel from "../components/common/RecentCarousel";
import { fakerKO as faker } from "@faker-js/faker";

const Home: React.FC = () => {
  const [locName, setLocName] = useState<string>("서울특별시")

  const handleClick = (loc: TLocation) => {
    setLocName(locName + ' ' + loc.district);
  };

  return (
    <div className="container-idx">
      <div className="select">
        <div className="select__title">
          <div className="select__title__logo">TO102</div>
          <div className="select__title__main">지역으로 토백이 찾기 ⛰️</div>
          <div className="select__title__sub">어떤 지역의 토백이를 찾을까요?</div>
        </div>

        <div className="select__res">
          {locName}
        </div>

        {locations.map(loc => (
          <button
            className="select__btn" 
            key={loc.id} 
            onClick={() => handleClick(loc)}
          >
            {loc.district}
          </button>
        ))}
      </div>

      <div>
       <RecentCarousel items={items}/>
      </div>
    </div>
  );
};

export default Home;

export const Route = createFileRoute('/')({
  component: Home,
})

const items = [
  {
    post_id: 1,
    user_id: 1,
    location_id: 2,
    title: '바다 여행',
    img_url: faker.image.url()
  },
  {
    post_id: 1,
    user_id: 1,
    location_id: 2,
    title: '바다 여행',
    img_url: faker.image.url()
  },
  {
    post_id: 1,
    user_id: 1,
    location_id: 2,
    title: '바다 여행',
    img_url: faker.image.url()
  },
  {
    post_id: 1,
    user_id: 1,
    location_id: 2,
    title: '바다 여행',
    img_url: faker.image.url()
  },
  {
    post_id: 1,
    user_id: 1,
    location_id: 2,
    title: '바다 여행',
    img_url: faker.image.url()
  },
  {
    post_id: 1,
    user_id: 1,
    location_id: 2,
    title: '바다 여행',
    img_url: faker.image.url()
  },
]