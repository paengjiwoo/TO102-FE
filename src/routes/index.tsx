import React from "react";
import { createFileRoute } from "@tanstack/react-router";

const Home: React.FC = () => {
  return <div>Home</div>;
};

export default Home;

export const Route = createFileRoute('/')({
  component: Home,
})
