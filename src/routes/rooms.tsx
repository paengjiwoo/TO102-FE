import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/common/Header";
import Tabs from "../components/common/Tabs";
import '../styles/chat/chatrooms.scss'
import { sortChatDateDescending } from "../utils/sort";
import useUserStore from "../store/useUserStore";
import { collection, getFirestore, or, query, where } from "firebase/firestore";
import { app } from "../firebaseConfig";
import { useFirestoreQuery } from "../hooks/useFirestoreQuery";
import ChatRoom from "../components/chats/ChatRoom";

const ChatRoomsComponent: React.FC = () => {
  const [chatType, setChatType] = useState<"visitor" | "native">("visitor");
  const { user } = useUserStore();

  const db = getFirestore(app);
  const messagesRef = collection(db, `chatRooms`);
  const data = useFirestoreQuery(query(messagesRef,or(
    where('visitor_id', '==', user.id),
    where('tobaek_id', '==', user.id) 
  )));

  let [rooms, setRooms] = useState([]);

  const handleRooms = () => {
    let filteredData = chatType === "visitor" ? data.filter((d: any) => d.visitor_id === user.id) 
    : data.filter((d: any) => d.tobaek_id === user.id)

    setRooms(filteredData)
  }

  useEffect(() => {
    handleRooms();
  }, [data || chatType])
  
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
          <ChatRoom room={room} chatType={chatType} />
        ))}
      </div>
    </div>
  </>;
};

export default ChatRoomsComponent;

export const Route = createFileRoute('/rooms')({
  component: ChatRoomsComponent,
})
