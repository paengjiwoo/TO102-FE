import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import "../../styles/MyFriends.scss";

interface User {
  username: string;
  profile_picture_url: string;
}

interface Friend {
  id: number;
  user: User;
}

const mockFriends: Friend[] = [
  {
    id: 1,
    user: {
      username: "John Doe",
      profile_picture_url: "https://via.placeholder.com/64",
    },
  },
  {
    id: 2,
    user: {
      username: "Jane Smith",
      profile_picture_url: "https://via.placeholder.com/64",
    },
  },
  {
    id: 3,
    user: {
      username: "Alice Johnson",
      profile_picture_url: "https://via.placeholder.com/64",
    },
  },
];

const MyFriends: React.FC = () => {
  const [friends] = useState<Friend[]>(mockFriends); // `setFriends` 제거
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);

  const handleMoreClick = (friendId: number) => {
    setSelectedFriendId(friendId === selectedFriendId ? null : friendId);
  };

  const handleBlock = (friendId: number) => {
    // 차단 API 호출 로직
    console.log(`친구 ${friendId}을(를) 차단합니다.`);
    // 실제 API 호출 로직은 여기에 추가됩니다.
  };

  return (
    <div className="my-friends-container">
      <div className="friends-list">
        {friends.map((friend) => (
          <div key={friend.id} className="friend-card">
            <img
              src={friend.user.profile_picture_url}
              alt={friend.user.username}
              className="friend-avatar"
            />
            <span className="friend-name">{friend.user.username}</span>
            <button
              className="more-button"
              onClick={() => handleMoreClick(friend.id)}
            >
              ⋮
            </button>
            {selectedFriendId === friend.id && (
              <div className="dropdown-menu">
                <button onClick={() => handleBlock(friend.id)}>차단</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFriends;

export const Route = createFileRoute("/mypage/myfriends")({
  component: MyFriends,
});
