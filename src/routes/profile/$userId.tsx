import React from "react";
import { Link, createFileRoute, useMatch, useRouter } from "@tanstack/react-router";

const Profile: React.FC = () => {
  const {
    params: { userId },
  } = useMatch('/profile/:userId');

  return <div>Profile</div>;
};

export default Profile;

export const Route = createFileRoute('/profile/$userId')({
  loader: async ({ params }) => {
    const { userId } = params;
    return console.log(`Loading profile for user ID ${userId}...`);
  },
  component: Profile,
})
