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
      {type === "received" && (reviews.length ? reviews.map(review => 
        (<ReceivedReview key={review.id} review={review}/>)
      ) : (<div style={{ marginLeft: '20px'}}> 받은 후기가 없습니다. </div>))}
      {type === "written" && (reviews.length ? reviews.map(review => 
        (<WrittenReview key={review.id} review={review} />)
      ) : (<div> 작성한 후기가 없습니다. </div>))}
    </div>
  );
}

export default ReviewFeed;