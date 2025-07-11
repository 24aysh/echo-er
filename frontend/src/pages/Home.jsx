import { useEffect, useState,useRef } from 'react';
import { ChatInterface } from '../components/ChatInterface';
import { Welcome } from '../components/Welcome';
import { ContactCard } from '../components/ContactCard';
import io from 'socket.io-client';
import { SearchBox } from '../components/SearchUser';

const GET_ROOM_URL = import.meta.env.VITE_GET_ROOM_URL;
const SEARCH_USER_URL = import.meta.env.VITE_SEARCH_USER_URL
const ADD_USER_URL = import.meta.env.VITE_ADD_USER_URL
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
const RECEIVE_MESSAGE_URL = import.meta.env.VITE_RECEIVE_MESSAGE_URL;
const UPDATE_MESSAGE_URL = import.meta.env.VITE_UPDATE_MESSAGE_URL;

export function Home() {
  const [room, setRoom] = useState([]);
  const [currentMessage,setCurrentMessage] = useState({})
  const [activePersonRoom, setActivePerson] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [allMessage,setAllMessage] = useState({})
  const [loadingChat,setLoadingChat] = useState(true);

  const ref = useRef([]);
  const socketRef = useRef(null);
  const searchRef = useRef();
  const sendMessageBoxRef = useRef();

  const username =  sessionStorage.getItem("username");
  const JWT = sessionStorage.getItem("token")
  async function fetchRooms() {
    if (!username) {
      
      return;
    }
    try {
      setLoadingChat(true);
      const params = new URLSearchParams({ username, token: JWT });
      const response = await fetch(`${GET_ROOM_URL}?${params.toString()}`); 
      const res_json = await response.json();
      
      if (res_json) {
        
        const roomNames = Object.keys(res_json[0].rooms);
        setAllMessage(res_json[0].rooms)
        setRoom(roomNames);
        setLoadingChat(false)
      }
     
    } catch (e) {
      console.error("need a gf");
    }
  }

  useEffect(() => {
    
    fetchRooms();
    const socket = io(SOCKET_URL)
    socketRef.current = socket;
    if (username) {
      socket.emit('register', username);
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (activePersonRoom) {
      fetchMessageFromDb(username, activePersonRoom);
    }
  }, [activePersonRoom]);

  async function findUser(){
    if(!searchRef.current.value){
      alert("Please enter username to use explore...")
      return;
    }
    const userName = searchRef.current.value;
  
    
    searchRef.current.value = ""
    const params = new URLSearchParams({ username : userName, token: JWT });
    const response = await fetch(`${SEARCH_USER_URL}?${params.toString()}`);
    
    const data = await response.json();
    if(data[0]){
      const result = confirm(`Do you want to add ${userName}`);
      if(result){
        addUserToChats(userName)
      }
      
    }else{
      alert("User does not Exist")
    }


  }
  async function addUserToChats(to) {
    const newRoomName = [username,to].sort().join("#")
    const reqOptions =  {
                          method: 'POST', 
                          headers: {
                          'Content-Type': 'application/json' 
                          },
                          body: JSON.stringify({
                            username,
                            newRoomName,
                            to:to
                          })
                        }
                    
    const response = await fetch(`${ADD_USER_URL}?token=${JWT}`,reqOptions)
    const data = await response.json()
    if(data.message){
      fetchRooms()
      alert(`${to} added to your friends`)
    }
    else{
      alert(`${to} is already your friend`)
    }

    
  }
  function getPersonNameFromRoom(rName) {
    const [userA, userB] = rName.split("#");
    return userA === username ? userB : userA;
  }
  
async function connectWithPersonToChatWith(withUser){
  if(socketRef.current){
    
    setLoadingMessages(true); 
    setActivePerson(withUser);
    
    socketRef.current.emit('join private', { withUser });
    
    socketRef.current.on('private', function({from, message}){
      const newKey = `${Date.now()}${from}`;
      const newMessage = { ...currentMessage, [newKey]: message };
      setCurrentMessage(prev => ({
        ...prev,
        [newKey]: message
      }));
      setAllMessage(prevAll => {
        const updatedRoom = {
          ...(prevAll[withUser] || {}),
          [newKey]: message
        };
        return {
          ...prevAll,
          [withUser]: updatedRoom
        };
      });
    });
  }
}

  async function messageSender(){
    if(sendMessageBoxRef.current.value){
      socketRef.current.emit('private', {
        to: activePersonRoom,
        message: sendMessageBoxRef.current.value
      });
      const messageToSend = sendMessageBoxRef.current.value;
      const newKey = `${Date.now()}${username}`;
      
      setCurrentMessage(prevMessages => ({
        ...prevMessages,
        [newKey]: messageToSend
      }));
      setAllMessage(prevAll => {
        const updatedRoom = {
          ...(prevAll[activePersonRoom] || {}),
          [newKey]: messageToSend
        };
        return {
          ...prevAll,
          [activePersonRoom]: updatedRoom
        };
      });
      sendMessageBoxRef.current.value = "";
      
      
      const requestOptionsForSenderDb = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromUser:username,
          username: username,
          timeStamp: Date.now(),
          to: getPersonNameFromRoom(activePersonRoom),
          message: messageToSend
        })
      };
      
      const requestOptionsForReceiverDb = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromUser:username,
          username: getPersonNameFromRoom(activePersonRoom),
          timeStamp: Date.now(),
          to: getPersonNameFromRoom(activePersonRoom),
          message: messageToSend
        })
      };
      await fetch(`${UPDATE_MESSAGE_URL}?token=${JWT}`, requestOptionsForSenderDb);
      await fetch(`${UPDATE_MESSAGE_URL}?token=${JWT}`, requestOptionsForReceiverDb);
    }
  }
  async function fetchMessageFromDb(username, activePersonRoom) {
    try {
      
      const params = new URLSearchParams({ username , token: JWT ,to:getPersonNameFromRoom(activePersonRoom)});
      const response = await fetch(`${RECEIVE_MESSAGE_URL}?${params.toString()}`);
      const data = await response.json();
      setCurrentMessage(data[activePersonRoom]);
    } catch (e) {
        console.log("need a gf")
    } finally {
        setLoadingMessages(false); 
    }
  }
  return (
    <div className="flex">
      <div className="bg-blue-950 w-[600px] h-screen overflow-y-auto sleek-scrollbar">
        
        <div className='flex items-center justify-between px-3 gap-2 mt-3'>
          <div className="flex flex-col items-center justify-center gap-1 w-full ">
            <div className="text-white bg-slate-500 text-2xl rounded-xl w-fit px-3 py-2 truncate max-w-full">
              hello, {username}
            </div>
            <SearchBox onClick={findUser} reference={searchRef} />
          </div>
        </div>
        
        <div>
          {loadingChat ? (
            <div className='flex justify-center'>
              <div className='text-white text-2xl bg-blue-500 rounded-lg w-fit p-3 m-5'>Loading chats...</div>
            </div>
            
          ):(
            <div>
              {room.length === 0 ? (
                <div>
                  <div className="text-2xl mx-5 text-white italic">Ain't got any friends...  &lt;/3 </div>
                  <div className="text-2xl mx-5 text-white italic">search for them </div>
                </div>
                
              ) : (
                room.map((roomName, index) => {
                  const messages = allMessage[roomName] || {};
                  const messageEntries = Object.entries(messages).filter(
                    ([key]) => key !== "welcomeMessage"
                  );

                  const lastEntry = messageEntries.at(-1);
                  let lastMessage = "";

                  if (lastEntry) {
                    const [key, msg] = lastEntry;
                    const sender = key.slice(key.length - username.length);
                    lastMessage = sender === username
                      ? `You : ${msg}`
                      : `${msg}`;
                  } else {
                    lastMessage = messages?.welcomeMessage || "";
                  }

                  return (
                    <ContactCard
                      key={roomName}
                      onClick={() => connectWithPersonToChatWith(roomName)}
                      selected={activePersonRoom === roomName}
                      reference={(e) => (ref.current[index] = e)}
                      name={getPersonNameFromRoom(roomName)}
                      lastMessage={lastMessage}
                    />
                  );
                })

              )}
            </div>
          )}
                         
        </div>
      </div>
      {activePersonRoom ? (
        loadingMessages ? (
          <div className="flex flex-grow items-center justify-center bg-blue-500 text-white text-3xl">
            Loading chat...
          </div>
        ) : (
          <ChatInterface
            user={username}
            onSend={messageSender}
            personName={getPersonNameFromRoom(activePersonRoom)}
            reference={sendMessageBoxRef}
            messages={currentMessage}
          />
        )
      ) : (
        <Welcome />
      )}
    </div>
  );
}
