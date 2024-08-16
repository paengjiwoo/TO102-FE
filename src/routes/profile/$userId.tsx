import React from "react";
import {  createFileRoute } from "@tanstack/react-router";
import { useProfileData } from "../../hooks/profileHook";
import UserInfoBox from "../../components/profile/UserInfoBox";
import { IoStar } from "react-icons/io5";

const Profile: React.FC = () => {
  // const { params: { userId },} = useMatch({ from: '/profile/$userId' });

  const { user } = useProfileData(); 

  return (
    <div>
      <UserInfoBox user={user}/>

      <div>
        <div>
          <IoStar />
          <div>{user.average_rating}</div>
        </div>
      </div>

      <div>
        <div>받은 후기</div>
        
      </div>
    </div>
  );
};

export default Profile;

export const Route = createFileRoute('/profile/$userId')({
  loader: async ({ params }) => {
    const { userId } = params;
    return console.log(`Loading profile for user ID ${userId}...`);
  },
  component: Profile,
})
