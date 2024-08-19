import { TReview } from "../models/review.model";
import { fakerKO as faker } from "@faker-js/faker";

export const useReviews = () => {
  const reviews: TReview[] = [];
  for (let i = 0; i < Math.floor(Math.random() * 21); i++) {
    const review = {
      id: i,
      reviewerId: i + 1,
      revieweeId: 0,
      rating: Number(faker.datatype.float({ min: 0, max: 5, precision: 0.01 }).toFixed(2)),
      content: faker.lorem.text().padEnd(1, ' ').substring(0, 300),
      createdAt: faker.date.past().toISOString()
    };
    reviews.push(review);
  }
  return { reviews }
}