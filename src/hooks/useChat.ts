import { fakerKO as faker } from "@faker-js/faker";
import { TChatRooms } from '../models/chat.model';

export const useChat = (chatType: "visitor" | "native") => {
  const chatRooms: TChatRooms[] = [];

  for (let i = 0; i < Math.floor(Math.random() * 21); i++) {
    const chat = {
      chat_room_id: i,
      post_id: i,
      user1_id: chatType === "visitor" ? 1 : i,
      user2_id: i + 1,
      created_at: faker.date.past().toISOString(),
      closed_at: faker.date.past().toISOString(),
      last_message_at: faker.date.past().toISOString(),
    };
    chatRooms.push(chat);
  }
  return { chatRooms };
};