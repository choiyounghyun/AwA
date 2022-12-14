import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dbService } from "../../fbase";
import { Message, User } from "../../Interface";
import style from "./ChatBoard.module.css";
import socketIOClient from "socket.io-client";
import ChatInput from "./ChatInput";
import { chatPartnerActions } from "../../store";
import api from "../../api/api";

const SOCKET = socketIOClient("https://awa24.site:4002/");

function ChatBoard() {
  const dispatch = useDispatch();
  const [messageList, setMessageList] = useState<Message[]>([]);
  const userObject = useSelector(
    (state: { userObject: User }) => state.userObject
  );
  const chatPartner = useSelector(
    (state: { chatPartner: string }) => state.chatPartner
  );
  const [partnerNickname, setPartnerNickname] = useState<string>("");

  const getChats = async () => {
    const roomName = [userObject.email, chatPartner];
    roomName.sort();
    const realRoomName: string = roomName[0] + roomName[1];

    const q = query(
      collection(dbService, "Chatting"),
      where("roomName", "==", realRoomName),
      orderBy("createdDate", "asc")
    );

    const chats = await getDocs(q);

    const loadMessages: Message[] = chats.docs.map((doc) => {
      const { sender, receiver, message, createdDate } = doc.data();
      return { sender, receiver, message, createdDate };
    });

    setMessageList(loadMessages);
  };

  const onBackClick = () => {
    dispatch(chatPartnerActions.setPartner(""));
  };

  const setNickname = async () => {
    const response = await api.chatting.getUserList([chatPartner]);
    setPartnerNickname(response.data[0].nickname);
  };

  useEffect(() => {
    /* eslint-disable */
    getChats();
  }, [chatPartner]);

  useEffect(() => {
    const roomName = [userObject.email, chatPartner];
    roomName.sort();
    const realRoomName: string = roomName[0] + roomName[1];

    SOCKET.emit("enter_room", realRoomName);
  }, [chatPartner]);

  useEffect(() => {
    SOCKET.on("receive message", (data) => {
      setMessageList((prev) => prev.concat(data));
    });
  }, []);

  useEffect(() => {
    var chattingBox = document.getElementById("chatBox");
    if (chattingBox) {
      chattingBox.scrollTop = chattingBox.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    if (chatPartner) {
      setNickname();
    }
  }, [chatPartner]);

  return (
    <div className={style.ChatBoard}>
      <div className={style.Header}>
        <div className={style.backButton} onClick={onBackClick}>
          {"<"}
        </div>
        <div className={style.partnerNickname}>{partnerNickname}</div>
        <div></div>
      </div>
      <div id="chatBox" className={style.Body}>
        {messageList.map((item, i) => {
          const t = new Date(item.createdDate);
          const hour = t.getHours();
          const minute = t.getMinutes();

          const now = new Date();
          const date = Math.floor(
            (now.getTime() - t.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (item.sender === chatPartner) {
            return (
              <div className={style.yourMessageBox} key={i}>
                <span className={style.message}>{item.message}</span>
                {date < 1 ? (
                  <span className={style.time}>
                    {hour}??? {minute}???
                  </span>
                ) : (
                  <span className={style.time}>{date}??? ???</span>
                )}
              </div>
            );
          } else if (item.sender === userObject.email) {
            return (
              <div className={style.myMessageBox} key={i}>
                {date < 1 ? (
                  <span className={style.time}>
                    {hour}??? {minute}???
                  </span>
                ) : (
                  <span className={style.time}>{date}??? ???</span>
                )}
                <span className={style.message}>{item.message}</span>
              </div>
            );
          }
        })}
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatBoard;
