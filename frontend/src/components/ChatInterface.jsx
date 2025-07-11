import { SendBox } from './SendBox';
import { ChatBubbleTo } from './ChatBubbleTo';
import {ChatBubbleYou} from "./ChatBubbleYou";
import { Profile } from './Profile';
import React from 'react';
export const ChatInterface = React.memo(function ChatInterface({ user, personName, onSend, reference, messages }) {
  function getTimeStamp(key){
    
    
    const date = new Date(parseInt(key.slice(0,13))); 
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    
    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    return formattedTime;


  }
  
  return (
    <div className="bg-blue-500 flex-grow flex flex-col h-screen sleek-scrollbar">
      <div>
        <Profile personName={personName}/>
      </div>
      <div className="flex flex-col-reverse overflow-y-auto flex-grow p-4 space-y-reverse space-y-2 no-scrollbar">
        {messages &&
          Object.entries(messages).reverse().map(([key, message]) => (
            (key.slice(13)==user) ? (
              <ChatBubbleYou key={key} user={user} message={message} now={getTimeStamp(key)} />
            ) : (
              <ChatBubbleTo key={key} user={personName} message={message} now={getTimeStamp(key)} />
            )
          ))
        }
      </div>
      <SendBox onSend={onSend} reference={reference} />
    </div>
  );
});