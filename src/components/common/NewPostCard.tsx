import { useProfileData } from '../../hooks/useProfileData';
import '../../styles/common/NewPostCard.scss'
import Location from './Location';

const NewPostCard = ({item}: any) => {
  const { user } = useProfileData();

  return(
    <div className="card">
      <img className="card__postimg" src={item.img_url} alt="" />

      <div className="card__contents">
        <div className="card__contents__user">
          <img src={user.profile_picture_url} alt="" />
          <div className="card__contents__user__name">{user.username}</div>
        </div>

        <div className="card__contents__title">{item.title}</div>

        <Location location="인천광역시 중구"/>
      </div>
    </div>
  );
}

export default NewPostCard;