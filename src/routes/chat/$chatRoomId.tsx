import { Link, createFileRoute, useMatch } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react';
import { IoChevronForwardSharp, IoPersonAdd, IoStar } from 'react-icons/io5';
import Location from '../../components/common/Location';
import { BsThreeDots } from 'react-icons/bs';
import '../../styles/chat/chat.scss';
import { FaArrowAltCircleUp, FaBan } from 'react-icons/fa';

import { Timestamp, addDoc, collection, doc, getFirestore, limit, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery';
import { Sheet } from 'react-modal-sheet';
import useUserStore from '../../store/useUserStore';
import { fakerKO as faker } from "@faker-js/faker";

interface ChatParams {
  chatRoomId: string;
}

const Chat: React.FC = () => {
  const match = useMatch({from: '/chat/$chatRoomId',});

  const { chatRoomId } = match.params as ChatParams;

  const db = getFirestore(app);
  const messagesRef = collection(db, `chatRooms/${chatRoomId}/messages`);
  const messages = useFirestoreQuery(query(messagesRef, orderBy('created_at'), limit(100)));
  const room: any = useFirestoreQuery(query(collection(db, `chatRooms`),  where('room_id', '==', Number(chatRoomId))));

  const { user } = useUserStore();

  console.log(chatRoomId, room, messages, typeof user.id);

  const [isOpen, setOpen] = useState(false);

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

  const handleParticipation = () => {
    const docData = {
      chat_id: messages.length + 1,
      text: "",
      created_at: Timestamp.fromDate(new Date()),
      message_type: "participate",
      sender_id: user.id
    }
    addDoc(collection(db, `chatRooms/${chatRoomId}/messages`), docData);

    const updateData = {
      last_message: "참여 요청", 
      last_message_at: Timestamp.fromDate(new Date())
    };
    updateDoc(doc(db, "chatRooms", `${chatRoomId}`), updateData)
  };

  const handleAcceptance = () => {
    const updateData = {
      accepted: true,
    };
    updateDoc(doc(db, "chatRooms", `${chatRoomId}`), updateData)
  }

  return (
    <>

    <div className="chatcontainer">
      <div className="fixednav">
        <div className="chatnav">

          {/* 사용자 정보 영역 */}
          <div className="chatnav__left">
            <Link to="/rooms"><IoChevronForwardSharp className="chatnav__left__back"/></Link>

            <div>
              <div className="chatnav__left__user">
                <div className="chatnav__left__user__name">보문산 메아리</div>
                <div className="chatnav__left__user__rate">
                  <div className="chatnav__left__user__rate__icon"><IoStar /></div>
                  <div className="chatnav__left__user__rate__num">4.5</div>
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
          <img src={faker.image.url()} alt="post.img" />

          <div className="content">
            <div className="content__top">
              <div className="content__top__title">빠른 북한산 1박 2일 글램핑 🏞️</div>
              <div className="content__top__tag">#동행</div>
            </div>
            <div className="content__date">2024-09-10</div>
            {!room[0]?.accepted ? (
              <button className="content__button" onClick={handleParticipation}>
                참여 신청
              </button>
            ): (
              <button className="content__button" onClick={() => setOpen(true)}>
                후기 작성
              </button>
            )
            }
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
          } else if (message.message_type === "participate") {
            return (
              <>
                <div key={idx} className="bubbles__participate__right">
                  <div className="bubbles__participate__main">
                    <div>🍀 참여 요청</div>
                  </div>
                  <div>
                    <div className="bubbles__participate__text">{user.username} 님으로 부터 참여 요청이 전송되었습니다.</div>
                    <div className="bubbles__participate__title">빠른 북한산 1박 2일 글램핑 🏞️</div>
                    <div className="bubbles__participate__admitq">참여 신청을 수락하시겠습니까?</div>
                  </div>
                  
                  {/* user.id 쪽은 추후 게시물 작성자 id 활용하도록 수정 예정 */}
                  {room.tobaek_id !== message.sender_id ? (
                    <div className="bubbles__participate__ban">
                      <FaBan className="bubbles__participate__ban__icon"/>
                      <div className="bubbles__participate__ban__text">수락하기 버튼은 토백이에게만 노출됩니다.</div>
                    </div>
                  ): ( <div style={{ display: "flex"}}>
                      <button onClick={handleAcceptance} className="bubbles__participate__button">수락 하기</button>                   
                      <div className="bubbles__participate__button__noti">버튼을 누르는 즉시 수락됩니다.</div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </>
            )
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

    <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>{/* Your sheet content goes here */}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>

    </>
  )
}

export const Route = createFileRoute('/chat/$chatRoomId')({
  component: Chat
})