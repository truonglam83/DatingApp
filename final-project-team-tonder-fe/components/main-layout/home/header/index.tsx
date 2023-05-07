import { BellOutlined, CheckOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { useEffect, useState } from 'react';
import headerStyle from './styles.module.scss';
import { io, Socket } from 'socket.io-client';
import {
  getNotification,
  updateNotification,
} from '@/redux/reducers/userReducer';
import defaultImage from '../../../../public/images/home/default.jpg';
import { INoti, IUserNoti } from '@/interface/user-interface';
import { USER } from '@/utils/config';
import Image from 'next/image';

export interface IHeader {
  title: string;
}

function Header({ title }: IHeader) {
  const [count, setCount] = useState(0);
  const [socket, setSocket] = useState<Socket | undefined>();
  const [messages, setMessages] = useState<INoti[]>([]);
  const [messError, setMessError] = useState<string[]>([]);

  const messageListener = (message: string) => {
    setMessError([...messError, message]);
  };

  const handleUpdateNoti = async (noti: string, isSeen: boolean) => {
    if (isSeen) return;
    const data = await updateNotification(noti);
    if (data) {
      const notification = messages.map((message) => {
        if (message.id === noti) {
          setCount(count - 1);
          message.isSeen = true;
        }
        return message;
      });
      setMessages(notification);
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('noti', (message: IUserNoti) => {
        const userLocal = JSON.parse(localStorage.getItem(USER) || '')?.id;
        if (message.receiverId !== userLocal) return;

        const userIndex: number = message.fromUser.findIndex(
          (user) => user.id === userLocal
        );

        if (userIndex === -1) return;

        const data: INoti = {
          fromUser: message.fromUser[message.fromUser.length - userIndex - 1],
          id: message.id,
          isSeen: message.isSeen,
        };

        setMessages([...messages, data]);
      });

      return () => {
        socket?.off('noti', (message) => messageListener(message));
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageListener]);

  useEffect(() => {
    setSocket(io(process.env.API_URL));

    const getNoti = async () => {
      try {
        const data = await getNotification();

        if (data) {
          setMessages(data);
        }
      } catch (error) {
        return error;
      }
    };
    getNoti();
  }, []);

  useEffect(() => {
    if (messages?.length) {
      const newData = (messages || [])?.filter((item: any) => !item.isSeen);
      setCount(newData.length);
    }
  }, [messages]);

  const data =
    messages.length > 0 ? (
      messages?.map((noti) => {
        return (
          <div
            key={noti?.id}
            className="noti"
            onClick={() => handleUpdateNoti(noti.id, noti.isSeen)}
          >
            <p
              className={!noti.isSeen ? 'noti__wrapper' : 'noti__seen'}
              key={noti.id}
            >
              <Image
                className="image__noti"
                width={20}
                height={20}
                src={
                  noti.fromUser?.avatar
                    ? `${noti.fromUser.avatar}`
                    : `${defaultImage.src}`
                }
                alt="avatar"
              />
              <a className="text__noti">
                {' '}
                {noti.fromUser?.name.length > 10
                  ? noti.fromUser?.name.substring(0, 10) + '...'
                  : noti.fromUser?.name}
              </a>
              <span>vừa thích bạn.</span>
            </p>
            {!noti.isSeen ? <CheckOutlined /> : ''}
          </div>
        );
      })
    ) : (
      <p className="noti__exist">Không có thông báo mới</p>
    );

  return (
    <div className={headerStyle.header__wrapper}>
      <h1
        className={
          title === 'Tonder'
            ? `${headerStyle.title__main}`
            : `${headerStyle.title__subMain}`
        }
      >
        {title}
      </h1>
      <Popover
        overlayClassName={headerStyle.noti__popover}
        placement="bottomLeft"
        title={'Thông báo'}
        content={data}
        trigger="click"
      >
        <div className="wrapper__bell">
          <p className={headerStyle.noti__length}>{count}</p>
          <BellOutlined />
        </div>
      </Popover>
    </div>
  );
}

export default Header;
