import React from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

const Profile: React.FC = () => {
  return <div>Profile</div>;
};

export default Profile;

export const Route = createFileRoute('/profile')({
  component: Profile,
})
