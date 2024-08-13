import React from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

const Signup: React.FC = () => {
  return <div>Signup</div>;
};

export default Signup;

export const Route = createFileRoute('/signup')({
  component: Signup,
})
