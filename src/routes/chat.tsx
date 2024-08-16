import React from "react";
import { createFileRoute } from "@tanstack/react-router";

const Chat: React.FC = () => {
  return <div>Chat</div>;
};

export default Chat;

export const Route = createFileRoute('/chat')({
  component: Chat,
})
