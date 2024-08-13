import React from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Home: React.FC = () => {
  return <div>Home</div>;
};

export default Home;

export const Route = createFileRoute('/')({
  component: Home,
})
