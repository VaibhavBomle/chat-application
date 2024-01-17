import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import './Messages.css'
import Message from './Message/Message';

const Messages = ({messages,name}) => {
  console.log("Messages ====>",messages)
 return(
  <div>
    <ScrollToBottom className='messages'>
      {messages.map((message, i) => <div key = {i}><Message message = {message} name = {name}/></div>)}
    </ScrollToBottom>
  </div>
   
  )
}

export default Messages;
