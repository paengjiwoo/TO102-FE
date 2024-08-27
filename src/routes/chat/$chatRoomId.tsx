import { Link, createFileRoute, useMatch } from '@tanstack/react-router'
import { useEffect, useRef } from 'react';
import { IoChevronForwardSharp, IoPersonAdd, IoStar } from 'react-icons/io5';
import { useProfileData } from '../../hooks/useProfileData';
import Location from '../../components/common/Location';
import { BsThreeDots } from 'react-icons/bs';
import '../../styles/chat/chat.scss';
import { FaArrowAltCircleUp } from 'react-icons/fa';

import { Timestamp, addDoc, collection, doc, getFirestore, limit, orderBy, query, updateDoc } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery';

const Chat: React.FC = () => {
  const { params: { chatRoomId },} = useMatch({ from: '/chat/$chatRoomId' });

  const db = getFirestore(app);
  const messagesRef = collection(db, `chatRooms/${chatRoomId}/messages`);
  const messages = useFirestoreQuery(query(messagesRef, orderBy('created_at'), limit(100)));

  const { user } = useProfileData();

  const inputValue = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    const trimmedMessage = inputValue.current ? inputValue.current.value.trim() : '';
    if (inputValue.current && trimmedMessage) {
      const docData = {
        chat_id: messages.length + 1,
        text: trimmedMessage,
        created_at: Timestamp.fromDate(new Date()),
        message_type: "message",
        sender_id: user.id
      }
      addDoc(collection(db, `chatRooms/${chatRoomId}/messages`), docData);
      
      const updateData = {
        last_message: trimmedMessage, 
        last_message_at: Timestamp.fromDate(new Date())
      };
      updateDoc(doc(db, "chatRooms", `${chatRoomId}`), updateData)

      inputValue.current.value = "";
      console.log('완료!')
    }
  };

  useEffect(() => {
    if (chatRoomId) {
      console.log(`Joined room: ${chatRoomId}`);
    }
  }, []);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chatcontainer">
      <div className="fixednav">
        <div className="chatnav">

          {/* 사용자 정보 영역 */}
          <div className="chatnav__left">
            <Link to="/rooms"><IoChevronForwardSharp className="chatnav__left__back"/></Link>

            <div>
              <div className="chatnav__left__user">
                <div className="chatnav__left__user__name">{user.username}</div>
                <div className="chatnav__left__user__rate">
                  <div className="chatnav__left__user__rate__icon"><IoStar /></div>
                  <div className="chatnav__left__user__rate__num">{user.average_rating}</div>
                </div>
              </div>
              <Location location="서울특별시 은평구" />
            </div>
          </div>

          <div className="chatnav__right">
            <div className="chatnav__right__friend">
              <IoPersonAdd className="chatnav__right__friend__icon"/>
              <div className="chatnav__right__friend__text">친구 신청</div>
            </div>
            <div><BsThreeDots className="chatnav__right__option"/></div>
          </div>

        </div>

        {/* 게시물 정보 영역 */}
        <div className="chatpost">
          <img src={user.profile_picture_url} alt="post.img" />

          <div className="content">
            <div className="content__top">
              <div className="content__top__title">빠른 북한산 1박 2일 글램핑 🏞️</div>
              <div className="content__top__tag">#동행</div>
            </div>
            <div className="content__date">2024-09-10</div>
            <button className="content__button">참여 신청</button>
          </div>
        </div>
      </div>

      {/* 실시간 메세지 표시 영역 */}
      <div className="bubbles">
        
        {messages.map((message: any, idx: number) => {
          if (message.message_type === "message"){
            if (user.id !== message.sender_id) {
              return (
                <>
                <div key={idx} className="bubbles__received">{message.text}</div>
                <div ref={messagesEndRef} />
                </>
              )
            } else {
              return (
                <>
                <div key={idx} className="bubbles__send">{message.text}</div>
                <div ref={messagesEndRef} />
                </>
              )
            }
          }    
        })}
      </div>

      {/* 메세지 입력 영역 */}
      <div className="inputbox">
        <div className="chatinput">
          <input
            className="chatinput__input" 
            type="text" 
            placeholder="message,,," 
            ref={inputValue}
          />
          <button 
            className="chatinput__button" 
            onClick={sendMessage}
          >
            <FaArrowAltCircleUp />
          </button>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/chat/$chatRoomId')({
  component: Chat
})