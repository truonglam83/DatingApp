import Image, { StaticImageData } from 'next/image';
import closeIcon from '../../../../public/icons/close.svg';
import likeIcon from '../../../../public/icons/like.svg';
import style from './favorite-item.module.scss';
// import avatar from "../../../"
import { MouseEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { createConversationApi } from '@/redux/reducers/chatReducer';
import avatar from '../../../../public/images/home/default.jpg';
import { IMessage } from '@/interface/chat-interface';
import { Socket, io } from 'socket.io-client';
import store from '@/redux/configStore';
import { setSocketChat } from '@/redux/reducers/socketReducer';
import Splash from '@/components/login-layout/splash/splash';

type Props = {
  img: string | null | StaticImageData;
  OnClick: MouseEventHandler<HTMLButtonElement> | undefined;
  id: string;
};
function FavoriteItem({ id, img, OnClick }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const socket = store.getState().socketReducer.socketChat;

  const handleSendMessage = async (userId: string) => {
    let currentUser = null;
    // Get current user id
    if (typeof window !== 'undefined') {
      currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    }
    try {
      setLoading(true);

      const data = await createConversationApi(userId);

      // setSocket(
      store.dispatch(
        setSocketChat(
          io(`${process.env.API_URL}`, {
            query: {
              token: localStorage.getItem('accessToken'),
              room: data.id,
            },
          })
        )
      );

      const message: IMessage = {
        sender: currentUser.id,
        content: 'Hello',
        conversationId: data?.id,
        receiver: userId,
        type: 'text',
      };
      setLoading(false);
      socket?.emit('sendMessage', message);
      router.push(`../../../../../chat/message/${data.id}`);

    } catch (error) {
      console.log(error);
    }
  };


  return (

    <div className={style.profile}>
      <Image
        className={style.avatar}
        src={img ? `${img}` : `${avatar.src}`}
        alt="avatar"
        width={100}
        height={100}
      />
      <div className={style.icon__wrap}>
        <button onClick={OnClick}>
          <Image className={style.icon} src={closeIcon} alt="closeIcon" />
        </button>
        <button onClick={() => handleSendMessage(id)} disabled={loading}>
          <Image
            className={style.icon}
            src={likeIcon}
            alt="likeIcon"
          />
        </button>
      </div>
    </div>


  );
}

export default FavoriteItem;
