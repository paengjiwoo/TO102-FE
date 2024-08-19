import { IoLocationOutline, IoStar } from "react-icons/io5";
import { TReview } from "../../models/review.model";
import { dateFormatter } from "../../utils/formatter";
import '../../styles/reviews/ReceivedReview.scss'
import { useProfileData } from "../../hooks/useProfileData";

type TProps = {
  review: TReview
}

export const renderStars = (review: TReview) => {
  const result = [];
  for (let i = 0; i < Math.floor(review.rating); i++) {
    result.push(<IoStar key={i}/>);
  }
  return result;
};

const ReceivedReview = ({review}: TProps) => {
  const { user } = useProfileData()

  return(
    <div className="container">
      <img src={user.profile_picture_url} alt={review.revieweeId.toString()} />

      <div className="box">
        <div className="box__info">
          <div className="box__info__name">{user.username}</div>
          <div className="box__info__loc">
            <IoLocationOutline className="box__info__loc__icon" />
            <div className="box__info__loc__text">서울특별시 은평구</div>
          </div>
        </div>

        <div className="box__content">{review.content}</div>

        <div className="box__rating">
          <div className="box__rating__stars">
            {renderStars(review)}
          </div>
          <div className="box__rating__date">{dateFormatter(review.createdAt)}</div>
        </div>
      </div>
    </div>
  );
}

export default ReceivedReview;