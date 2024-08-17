import { IoStar } from "react-icons/io5";
import { TReview } from "../../models/review.model";
import { dateFormatter } from "../../utils/formatter";
import { fakerKO as faker } from "@faker-js/faker";

type TProps = {
  review: TReview
}

const ReceivedReview = ({review}: TProps) => {
  const renderStars = () => {
    const result = [];
    for (let i = 0; i < Math.floor(review.rating); i++) {
      result.push(<IoStar key={i}/>);
    }
    return result;
  };

  return(
    <div>
      <div>
        <img src={faker.image.url()} alt="" />
      </div>

      <div>
        <div>
          <div>고양이와 춤을</div>
          <div>서울특별시 은평구</div>
        </div>

        <div>{review.content}</div>

        <div>
          <div>
            {renderStars()}
          </div>
          <div>{dateFormatter(review.createdAt)}</div>
        </div>
      </div>
    </div>
  );
}

export default ReceivedReview;