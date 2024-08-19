import { TReview } from "../models/review.model";

export const sortDatesDescending = (reviews: TReview[]) => {
  return reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}