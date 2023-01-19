import { useEffect, useState, useRef, useCallback } from "react";
import { socket, SocketContext, SOCKET_EVENT } from "./service/socket";
import NicknameForm from "./components/NicknameForm";
import ChatRoom from "./components/ChatRoom";

function App() {
  const prevNickname = useRef(null);
  const [nickname, setNickname] = useState("김첨지");

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.emit(SOCKET_EVENT.JOIN_ROOM, { nickname }); // JOIN_ROOM event type과 nickname data를 서버에 전송한다.
  }, [nickname]);

  useEffect(() => {
    if (prevNickname.current) {
      socket.emit(SOCKET_EVENT.UPDATE_NICKNAME, {
        // 서버에는 이전 닉네임과 바뀐 닉네임을 전송해줍니다.
        prevNickname: prevNickname.current,
        nickname,
      });
    } else {
      socket.emit(SOCKET_EVENT.JOIN_ROOM, { nickname });
    }
  }, [nickname]);

  const handleSubmitNickname = useCallback(
    (newNickname) => {
      prevNickname.current = nickname;
      setNickname(newNickname);
    },
    [nickname]
  );

  return (
    <SocketContext.Provider value={socket}>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <NicknameForm handleSubmitNickname={handleSubmitNickname} />
        <ChatRoom nickname={nickname} />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
