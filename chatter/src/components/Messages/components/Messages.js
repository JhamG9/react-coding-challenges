import React, { useContext, useState } from 'react';
import { io } from 'socket.io-client';
import useSound from 'use-sound';
import config from '../../../config';
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import '../styles/_messages.scss';
import { useEffect } from 'react';
import initialBottyMessage from '../../../common/constants/initialBottyMessage';

const socket = io(
  config.BOT_SERVER_ENDPOINT,
  {
    transports: ['websocket', 'polling', 'flashsocket'],
    reconnection: true
  }
);

function Messages() {
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);
  const [message, setMessage] = useState('');
  const [messageBot, setMessageBot] = useState('');

  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    socket.on('connect', () => console.log('connected'))
    socket.on('error', console.error)
    socket.on('connect_error', console.error)

    socket.on('bot-typing', () => {
      setLatestMessage('bot', 'Typing...')
      const messageUser = { user: 'bot', message: 'Typing...', botTyping: true };
      setMessagesList(messagesList => [...messagesList, messageUser]);
    });

    socket.on('bot-message', (botMessage) => {
      setMessageBot(botMessage);
    });

    loadInitialMessageBot();
  }, []);

  /**
   * Method load inital message bot
   */
  const loadInitialMessageBot = () => {
    const initialMessage = { user: 'bot', message: initialBottyMessage, botTyping: false };
    setMessagesList(messagesList => [...messagesList, initialMessage]);
  }

  /**
   * Method start when messageBot change emit value
   */
  useEffect(() => {
    if (messageBot) {
      let messages = [...messagesList];
      let item = { ...messages[messagesList.length - 1] };
      item.message = messageBot;
      item.botTyping = false;
      messages[messagesList.length - 1] = item;
      setMessagesList(messages);
      playReceive();
      setLatestMessage('bot', messageBot)
    }
  }, [messageBot]);

  /**
   * Method send a message to socket user-message
   */
  const sendMessage = () => {
    const messageUser = { user: 'me', message: message, botTyping: false };
    setMessagesList(messagesList => [...messagesList, messageUser]);
    socket.emit('user-message', message);
    setMessage('');
    setLatestMessage('bot', `You: ${message}`)
    playSend();
  }

  const onChangeMessage = (message) => {
    setMessage(message.target.value);
  }

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        {
          messagesList.map((message, index) =>
            <Message key={index} message={message} botTyping={message.bothTyping} />
          )
        }
      </div>
      <Footer message={message} sendMessage={sendMessage} onChangeMessage={onChangeMessage} />
    </div>
  );
}

export default Messages;
