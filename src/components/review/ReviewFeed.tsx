import { TReview } from '../../models/review.model';
import ReceivedReview from './ReceivedReview';
import WrittenReview from './WrittenReview';

type TProps = {
  type: "received" | "written";
  reviews: TReview[];
}

const ReviewFeed = ({ type, reviews }: TProps) => {

  return(
    <div>
      {type === "received" && reviews.length && reviews.map(review => 
        (<ReceivedReview key={review.id} review={review}/>)
      )}
      {type === "written" && reviews.length && reviews.map(review => 
        (<WrittenReview key={review.id} review={review} />)
      )}
    </div>
  );
}

export default ReviewFeed;