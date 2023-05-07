import { INoti, IUserNoti } from '@/interface/user-interface';
import {
  getNotification,
  updateNotification,
} from '@/redux/reducers/userReducer';
import { USER } from '@/utils/config';
import { BellOutlined, CheckOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import defaultImage from '../../../../public/images/home/default.jpg';
import headerStyle from './styles.module.scss';

function Header() {
  const [count, setCount] = useState(0);
  const [socket, setSocket] = useState<Socket | undefined>();
  const [messages, setMessages] = useState<INoti[]>([]);
  const [messError, setMessError] = useState<string[]>([]);

  const messageListener = (message: string) => {
    setMessError([...messError, message]);
  };

  const handleUpdateNoti = async (noti: string) => {
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
        if (
          message &&
          message.fromUser[1].id ===
            JSON.parse(localStorage.getItem(USER) || '{}').id
        ) {
          const data: INoti = {
            fromUser: message.fromUser[0],
            id: message.id,
            isSeen: message.isSeen,
          };
          setMessages([...messages, data]);
        }
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
    messages.length &&
    messages.map((noti) => {
      return (
        <div key={noti?.id} className="noti">
          <p
            className={noti.isSeen ? 'noti__seen' : 'noti__wrapper'}
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
            <a className="text__noti">{noti.fromUser?.name}</a>
            <span>vừa thích bạn.</span>
          </p>
          {!noti.isSeen ? (
            <CheckOutlined onClick={() => handleUpdateNoti(noti.id)} />
          ) : (
            ''
          )}
        </div>
      );
    });

  return (
    <div className={headerStyle.header__wrapper}>
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
