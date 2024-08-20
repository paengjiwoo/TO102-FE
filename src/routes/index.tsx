import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { locations } from "../models/location.model";
import { TLocation } from "../models/location.model";
import '../styles/index.scss'
import NewPostCard from "../components/common/NewPostCard";

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
        <div>새로운 토백이 💫</div>
        <div>
          <NewPostCard />
          <NewPostCard />
        </div>
      </div>
    </div>
  );
};

export default Home;

export const Route = createFileRoute('/')({
  component: Home,
})
