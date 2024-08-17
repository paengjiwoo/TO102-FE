import { useReviews } from '../../hooks/ReviewHook';
import ReceivedReview from './ReceivedReview';
import WrittenReview from './WrittenReview';

const ReviewFeed = () => {
  const { reviews } = useReviews();

  return(
    <div>
      {reviews.length && reviews.map(review => 
        (<ReceivedReview key={review.id} review={review}/>)
      )}
      <WrittenReview />
    </div>
  );
}

export default ReviewFeed;