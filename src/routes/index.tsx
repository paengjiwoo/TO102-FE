import React from "react";
import { createFileRoute } from "@tanstack/react-router";

const Home: React.FC = () => {
  return (
    <div>
      <div>
        <div>TO102</div>
        <div>지역으로 토백이 찾기 ⛰️</div>
        <div>어떤 지역의 토백이를 찾을까요?</div>
      </div>

      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;

export const Route = createFileRoute('/')({
  component: Home,
})
