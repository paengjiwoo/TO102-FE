import { TUser } from '../../models/user.model';
import { IoLocationOutline } from 'react-icons/io5';
import '../../styles/UserInfoBox.scss'

type TProps = {
  user: TUser;
}

const UserInfoBox = ({user}: TProps) => {
  return(
    <div className="userBox">
      <img src={user.profile_picture_url} alt="user-img" />
      <div className="user">
        <div className="user__username">{user.username}</div>
        <div className="user__locbox">
          <IoLocationOutline className="user__locbox__icon"/>
          <div className="user__locbox__loc">{user.location}</div>
        </div>
      </div>
    </div>
  );
}

export default UserInfoBox;