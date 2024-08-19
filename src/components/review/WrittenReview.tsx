import { IoLocationOutline } from "react-icons/io5";
import { TReview } from "../../models/review.model";
import { renderStars } from "./ReceivedReview";
import { dateFormatter } from "../../utils/formatter";
import { useProfileData } from "../../hooks/profileHook";
import '../../styles/reviews/WrittenReview.scss'

type TProps = {
  review: TReview
};

const MyReview = ({ review }: TProps) => {
  const { user } = useProfileData()

  return(
    <div className="review">
      <div className="review__loc">
        <IoLocationOutline className="review__loc__icon"/>
        <div className="review__loc__name">서울특별시 은평구</div>
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