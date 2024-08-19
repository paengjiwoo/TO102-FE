import { TReview } from "../../models/review.model";
import { renderStars } from "./ReceivedReview";
import { dateFormatter } from "../../utils/formatter";
import { useProfileData } from "../../hooks/useProfileData";
import '../../styles/reviews/WrittenReview.scss'
import Location from "../common/Location";

type TProps = {
  review: TReview
};

const MyReview = ({ review }: TProps) => {
  const { user } = useProfileData()

  return(
    <div className="review">
      <div className="review__loc">
        <Location location="서울특별시 은평구" />
      </div>

      <div className="review__content">{review.content}</div>

      <div className="review__rating">
        <div className="review__rating__stars">{renderStars(review)}</div>
        <div className="review__rating__date">{dateFormatter(review.createdAt)}</div>
      </div>

      <div className="review__user">
        <img src={user.profile_picture_url} alt={review.revieweeId.toString()} />
        <div className="review__user__info">
          <div className="review__user__info__name">{user.username}</div>
          <div className="review__user__info__to">에게</div>
        </div>
      </div>
    </div>
  );
}

export default MyReview;