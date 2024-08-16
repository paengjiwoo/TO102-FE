import { TUser } from '../../models/user.model';
import { IoLocationOutline } from 'react-icons/io5';

type TProps = {
  user: TUser;
}

const UserInfoBox = ({user}: TProps) => {
  return(
    <div className="userBox">
      <img src={user.profile_picture_url} alt="user-img" width={56} height={56}/>
      <div className="user">
        <div className="user__username">{user.username}</div>
        <div>
          <IoLocationOutline />
          <div className="user__location">{user.location}</div>
        </div>
      </div>
    </div>
  );
}

export default UserInfoBox;