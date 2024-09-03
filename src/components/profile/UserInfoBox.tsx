import '../../styles/UserInfoBox.scss'
import { useEffect, useState } from 'react';
import { getLocation } from '../../apis/location';
import Location from '../common/Location';


const UserInfoBox = ({user}: any) => {
  const [location, setLocation] = useState<string>('');
  
  useEffect(() => {
    getLocation(user.locationId)
    .then(res => setLocation(`${res.data.province} ${res.data.city}`))
  }, [user]);

  return(
    <div className="userBox">
      <img src={user.profilePictureUrl} alt="user-img" />
      <div className="user">
        <div className="user__username">{user.nickname}</div>
        <div className="user__locbox">
          <Location location={location} />
        </div>
      </div>
    </div>
  );
}

export default UserInfoBox;