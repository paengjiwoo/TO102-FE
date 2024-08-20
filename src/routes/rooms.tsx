import React, { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import Header from "../components/common/Header";
import Tabs from "../components/common/Tabs";
import '../styles/chat/chatrooms.scss'
import { useChat } from '../hooks/useChat';
import { fakerKO as faker } from "@faker-js/faker";
import Location from "../components/common/Location";
import { formatDistanceToNow } from "../utils/formatter";
import { sortChatDateDescending } from "../utils/sort";

const ChatRoomsComponent: React.FC = () => {
  const [chatType, setChatType] = useState<"visitor" | "native">("visitor");
  const { chatRooms } = useChat(chatType);
  
  const tabTypes = [
    ["visitor", "native"],
    ["여행객 채팅", "토백이 채팅"],
  ];

  return <>
    <Header />
    <div className="chat-tabs">
      <Tabs 
        setFunction={setChatType}
        tabTypes={tabTypes}
        lenInfo={chatRooms.length}
      />

      <div className="chatrooms">
        {sortChatDateDescending(chatRooms).map((room: any) => (
          <Link to="/chat/$chatRoomId" params={{ chatRoomId : room.chat_room_id }}>
            <div className="chat" key={room.chat_room_id}>
              <img src={faker.image.url()} alt="" />
              <div className="chat__content">
                <div className="chat__content__user">
                  <div>{faker.person.fullName()}</div>
                  <div><Location location="서울특별시 은평구"/></div>
                </div>
                <div className="chat__content__message">
                  <div className="chat__content__message__detail">
                    {faker.lorem.text().padEnd(1, ' ').substring(1, 100)},
                  </div>
                  <div className="chat__content__message__date">
                    {formatDistanceToNow(room.last_message_at)}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </>;
};

export default ChatRoomsComponent;

export const Route = createFileRoute('/rooms')({
  component: ChatRoomsComponent,
})
