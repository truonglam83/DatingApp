import Splash from '@/components/login-layout/splash/splash';
import Messages from '@/components/main-layout/layout/messages/messages';
import { IChatContent, IMessage } from '@/interface/chat-interface';
import { ILoginPhone } from '@/interface/login-interface';
import { IUserMatch } from '@/interface/user-interface';
import store from '@/redux/configStore';
import { createNewMessageApi } from '@/redux/reducers/chatReducer';
import { setSocketChat } from '@/redux/reducers/socketReducer';
import { getUserById } from '@/redux/reducers/userReducer';
import { USER, http } from '@/utils/config';
import { DeleteOutlined } from '@ant-design/icons';
import { Input, message } from 'antd';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { DOMAttributes, useEffect, useRef, useState } from 'react';
import Dropzone from 'react-dropzone';
import InfiniteScroll from 'react-infinite-scroll-component';
import { io } from 'socket.io-client';
import Direction from '../../../components/main-layout/layout/direction';
import InfoItem from '../../../components/main-layout/layout/info-item';
import addIcon from '../../../public/icons/addIcon.svg';
import loadIcon from '../../../public/icons/loadIcon.svg';
import sendIcon from '../../../public/icons/sendIcon.svg';
import sendIconActive from '../../../public/icons/sendIconActive.svg';
import avatar from '../../../public/image//avatarChat/avatar_chat_1.png';
import defaultAvatar from '../../../public/images/home/default.jpg';
import style from './message.module.scss';
import TextAreaAutoSize from 'react-textarea-autosize';
import { getTimeDiff } from '@/utils/date';

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);

const user = {
  avatar: avatar,
  name: 'Cameron Greer',
  interval: '3 tuần',
};

const Message = () => {
  const router = useRouter();
  const socket = store.getState().socketReducer.socketChat;
  const { id } = router.query;

  const [messageApi, contextHolder] = message.useMessage();
  const [messages, setMessages] = useState<IChatContent[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [receiverId, setReceiverId] = useState<string>('');

  const [roomInfo, setRoomInfo] = useState<any>();
  const [infoReceiver, setInfoReceiver] = useState<string>('');
  const [fileUpload, setFileUpload] = useState<File[]>([]);

  const [isOpenEmoji, setIsOpenEmoji] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [userChatting, setUserChatting] = useState<IUserMatch | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  let currentUser: ILoginPhone;
  if (typeof window !== 'undefined') {
    currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  }
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleOnchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const pattern = /^\s/;
    const isSpace = pattern.test(e.target.value);
    if (isSpace) {
      e.preventDefault();
    } else {
      setInputValue(e.target.value);
    }
  };

  const handleDeleteImage = (index: number) => () => {
    const newFiles = [...fileUpload];
    newFiles.splice(index, 1);
    setFileUpload(newFiles);
  };

  const onDrop = (files: any) => {
    if (files) {
      let isFile = true;
      if (files.length > 10) {
        isFile = false;
        messageApi.error('Bạn chỉ được upload tối đa 10 hình');
      }
      // if file not image, show error
      const newFiles = [...files];
      newFiles.forEach((file) => {
        if (file.type.split('/')[0] !== 'image') {
          isFile = false;
          message.open({
            type: 'error',
            content: 'Bạn chỉ được upload file ảnh',
          });
        }

        const checkedSize = file.size / 1024 / 1024;
        if (checkedSize > 5) {
          isFile = false;
          message.open({
            type: 'error',
            content: 'Ảnh không được vượt quá 5MB',
          });
        }
      });

      if (isFile) {
        setFileUpload([...fileUpload, ...newFiles]);
      }
    }
  };

  const handleOnClick = async () => {
    setIsDisabled(true);
    if (isDisabled) {
      return;
    }
    if (fileUpload.length > 0) {
      for (let image of fileUpload) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('conversationId', id as string);
        formData.append('sender', currentUser.id as string);
        formData.append('receiver', roomInfo.userId);
        formData.append('type', 'image');
        try {
          const message = await createNewMessageApi(formData);
          socket?.emit('sendMessage', message);
          setFileUpload([]);
          setIsDisabled(false);
        } catch (error) {
          console.log(error);
        }
      }
    }
    setIsDisabled(false);
    if (inputValue.trim() === '') {
      return;
    }
    if (!inputValue && inputValue === '') {
      return false;
    }
    const message: IMessage = {
      sender: currentUser.id,
      receiver:
        roomInfo?.userId === currentUser.id
          ? roomInfo?.receiver
          : roomInfo?.userId,
      content: inputValue,
      conversationId: id,
      type: 'text',
    };
    try {
      // await http.post('/message', message);
      socket?.emit('sendMessage', message);
      setIsOpenEmoji(false);
      setInputValue('');
    } catch (error) {
      console.log(error);
    }
  };

  const handlePagingMessage = () => {
    if (currentPage <= totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await http.get(
          `/message?conversationId=${id}&pages=${currentPage}&limit=10`
        );
        setMessages([...messages, ...response.data.data.messages]);
      }
    };
    fetchData();
  }, [currentPage]);

  const [isReceiveMessage, setIsReceiveMessage] = useState<boolean>(false);

  useEffect(() => {
    if (socket) {
      socket.on('recMessage', (message: any) => {
        setMessages((prevMessages) => [message, ...prevMessages]);
        setIsReceiveMessage(!isReceiveMessage);
      });

      return () => {
        socket.off('recMessage');
      };
    }
  }, [socket]);

  useEffect(() => {
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [isReceiveMessage]);

  // get info user chatting
  useEffect(() => {
    const fetchUser = async () => {
      let userInfo: string = '';
      const userLocal = JSON.parse(localStorage.getItem(USER) || '')?.id;

      userInfo =
        roomInfo?.receiver === userLocal
          ? roomInfo?.userId
          : roomInfo?.receiver;

      if (roomInfo?.receiver) {
        const data = await getUserById(userInfo);
        if (data) {
          const user = {
            id: data.id,
            name: data.name,
            avatar: data.avatar,
          };
          setUserChatting(user);
        }
      }
    };
    fetchUser();
  }, [roomInfo]);

  const handleEmojiSelect = (emojiObject: any) => {
    setInputValue((prevInput) => prevInput + emojiObject?.emoji);
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (id) {
          const roomInfo = await http.post(`conversation/room`, { roomId: id });
          setRoomInfo(roomInfo.data);
          const userInfo = await http.post(`user/${roomInfo.data.receiver}`);
          setInfoReceiver(userInfo.data.age);
          const response = await http.get(
            `/message?conversationId=${id}&pages=${currentPage}&limit=10`
          );
          setTotalPages(response.data.data.totalPages);
          setMessages(response.data.data.messages);
          socket?.emit('joinRoom');
        }
      } catch (error) {
        console.log(error);
      }
    };

    store.dispatch(
      setSocketChat(
        io(process.env.API_URL, {
          query: {
            token: localStorage.getItem('accessToken'),
            room: id,
          },
        })
      )
    );

    getMessages();
    setIsLoading(false);
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Splash />
      ) : (
        <div className={style.message__wrapper}>
          {contextHolder}
          <div className={style.mess__header}>
            <Direction />
            <InfoItem
              image={
                userChatting?.avatar ? userChatting.avatar : defaultAvatar.src
              }
              age={infoReceiver}
              name={userChatting?.name}
              interval={getTimeDiff(roomInfo?.createdAt)}
            />
          </div>
          <div className={style.chat__message}>
            <div
              id="scrollableDiv"
              style={{
                height: `72vh`,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
              }}
              ref={messageContainerRef}
            >
              <InfiniteScroll
                dataLength={messages.length}
                style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                hasMore={true}
                inverse={true}
                loader={currentPage === totalPages && <p>Loading....</p>}
                scrollableTarget="scrollableDiv"
                next={handlePagingMessage}
              >
                {messages?.map((message: IChatContent) => (
                  <React.Fragment key={message.id}>
                    <Messages
                      data={message}
                      own={message.sender === currentUser.id}
                      setReceiverId={setReceiverId}
                    />
                  </React.Fragment>
                ))}
              </InfiniteScroll>
            </div>
          </div>

          <div className={style.set__message}>
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Image
                      className={style.add__icon}
                      src={addIcon}
                      alt="loadIcon"
                    />
                  </div>
                </section>
              )}
            </Dropzone>
            <div className={style.box__image}>
              {fileUpload.map((file, index) => (
                <div className={style.image__preview} key={index}>
                  <Image
                    alt="img"
                    className=""
                    width={100}
                    height={100}
                    src={URL.createObjectURL(file)}
                  />
                  <button
                    className={`${style.button__delete}`}
                    onClick={handleDeleteImage(index)}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              ))}
            </div>
            <div className={style.input}>
              <TextAreaAutoSize
                minRows={1}
                maxRows={5}
                autoFocus
                onChange={handleOnchange}
                className={`${style.input__message}`}
                value={inputValue}
                onClick={() => setIsOpenEmoji(false)}
              />
              <Image
                className={style.load__icon}
                src={loadIcon}
                alt="loadIcon"
                onClick={() => setIsOpenEmoji(!isOpenEmoji)}
              />
            </div>

            <Image
              onClick={handleOnClick}
              className={
                isDisabled ? style.send__icon__active : style.send__icon
              }
              src={isDisabled ? sendIconActive : sendIcon}
              alt="sendIcon"
            />
          </div>
          {isOpenEmoji && (
            <div className={style.input__emoji}>
              <Picker onEmojiClick={handleEmojiSelect} autoFocusSearch />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Message;
