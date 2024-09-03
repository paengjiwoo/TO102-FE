import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from '../../utils/formatter';
import Location from '../common/Location';
import { getUser } from '../../apis/users';
import { getLocation } from '../../apis/location';

const ChatRoom = ({ room, chatType } : any) => {
  const [user, setUser] = useState<any>([]);
  const [location, setLocation] = useState<string>('서울특별시 은평구');

  useEffect(() => {
    getUser(chatType === 'visitor' ? room.tobaek_id : room.visitor_id)
    .then(res => { 
      setUser(res.data); 
      getLocation(res.data.locationId)
      .then(res => setLocation(`${res.data.province} ${res.data.city}`))
    });
  }, [])

  return(
    <Link to="/chat/$chatRoomId" params={{ chatRoomId : room.room_id }} key={room.room_id}>
    <div className="chat">
      <img src={user.profilePictureUrl} alt="" />
      <div className="chat__content">
        <div className="chat__content__user">
          <div>{user.nickname}</div>
          <div><Location location={location} /></div>
        </div>
        <div className="chat__content__message">
          <div className="chat__content__message__detail">
            {room.last_message},
          </div>
          <div className="chat__content__message__date">
            {formatDistanceToNow(room.last_message_at)}
          </div>
        </div>
      </div>
    </div>
  </Link>
  );
}

export default ChatRoom;