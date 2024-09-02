import React, { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import Header from "../components/common/Header";
import Tabs from "../components/common/Tabs";
import '../styles/chat/chatrooms.scss'
import { fakerKO as faker } from "@faker-js/faker";
import Location from "../components/common/Location";
import { formatDistanceToNow } from "../utils/formatter";
import { sortChatDateDescending } from "../utils/sort";
import useUserStore from "../store/useUserStore";
import { collection, getFirestore, or, query, where } from "firebase/firestore";
import { app } from "../firebaseConfig";
import { useFirestoreQuery } from "../hooks/useFirestoreQuery";

const ChatRoomsComponent: React.FC = () => {
  const [chatType, setChatType] = useState<"visitor" | "native">("visitor");
  const { user } = useUserStore();

  const db = getFirestore(app);
  const messagesRef = collection(db, `chatRooms`);
  const data = useFirestoreQuery(query(messagesRef,or(
    where('visitor_id', '==', user.id),
    where('tobaek_id', '==', user.id) 
  )));
  const [rooms, setRooms] = useState<any>([])

  useEffect(() => {
    setRooms(chatType === "visitor" ? data.filter((d: any) => d.visitor_id === user.id) 
    : data.filter((d: any) => d.tobaek_id === user.id));
  }, [chatType])

  useEffect(() => {
    console.log('user_id:', user.id, typeof user.id)
    console.log(rooms)
  }, [chatType]);
  
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
        lenInfo={rooms.length}
      />

      <div className="chatrooms">
        {sortChatDateDescending(rooms).map((room: any) => (
          <Link to="/chat/$chatRoomId" params={{ chatRoomId : room.room_id }} key={room.room_id}>
            <div className="chat">
              <img src={faker.image.url()} alt="" />
              <div className="chat__content">
                <div className="chat__content__user">
                  <div>{faker.person.fullName()}</div>
                  <div><Location location="서울특별시 은평구"/></div>
                </div>
                <div className="chat__content__message">
                  <div className="chat__content__message__detail">
                    {room.last_message},
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
