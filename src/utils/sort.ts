import { TReview } from "../models/review.model";

export const sortDatesDescending = (reviews: TReview[]) => {
  return reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export const sortChatDateDescending = (chats: any) => {
  return chats.sort((a:any, b:any) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime())
}