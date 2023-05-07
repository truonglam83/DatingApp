import { IChatList } from '@/interface/chat-interface';
import {
  getAllListChatApi,
  setOnlineUsers,
} from '@/redux/reducers/chatReducer';
import { getUserBlackList } from '@/redux/reducers/userReducer';
import { Avatar, List } from 'antd';
import noConversation from '../../../../public/images/chat/no-conversation.png';
import moment from 'moment';
import { useEffect, useState } from 'react';
import style from './list-chat.module.scss';
import store from '@/redux/configStore';
import avatarDefault from '../../../../public/images/home/default.jpg';
import 'moment/locale/vi';
import { getTimeDiff } from '../../../../utils/date';
moment.locale('vi');

type Props = {
  OnClick: (id: string) => void;
  idBlock: string;
};
export function ListChat({ OnClick, idBlock }: Props) {
  const socket = store.getState().socketReducer.socketChat;
  const [conversation, setConversation] = useState<IChatList[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onlineUsers: string[] = store.getState().chatReducer.onlineUsers;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const chat = await getAllListChatApi();
      if (chat) {
        // map find user has id not equal idBlock
        const chatFilter = chat?.filter((item: any) => {
          return item.user?.id !== idBlock;
        });
        setConversation(chatFilter);
      } else {
        setConversation([]);
      }
    };
    socket?.on('fetchingMessage', () => {
      fetchData();
    });

    socket?.on('onlineUsers', (users: string[]) => {
      store.dispatch(setOnlineUsers(users));
    });

    fetchData();
    setLoading(false);
  }, [socket, idBlock]);

  if (!conversation?.length) {
    return (
      <div className={style.no__conversation}>
        <img src={`${noConversation.src}`} alt="no conversation" />
        <p>Không có cuộc trò chuyện</p>
      </div>
    );
  } else {
    return (
      <List
        className={style.list__chat}
        itemLayout="horizontal"
        dataSource={conversation}
        renderItem={(item) => {
          return (
            <List.Item
              onClick={() => OnClick(item?.conversationId)}
              key={item?.conversationId}
            >
              <List.Item.Meta
                className={style.list__item}
                avatar={
                  <div className={style['item__container']}>
                    <Avatar
                      className={style.avatar}
                      src={
                        item.user?.avatar ? item.user.avatar : avatarDefault.src
                      }
                      alt="avatar"
                    />

                    <div
                      className={
                        style[
                          `item__container--${
                            onlineUsers?.includes(item.user.id)
                              ? 'online'
                              : 'offline'
                          }`
                        ]
                      }
                    ></div>
                  </div>
                }
                title={
                  <a className={style.name} href="#">
                    {item.user?.name.length > 20
                      ? item.user?.name.substring(0, 15) + '...'
                      : item.user?.name}
                  </a>
                }
                description={
                  item?.infoLastMess?.content?.startsWith(
                    'https://storage.googleapis.com/'
                  ) ? (
                    <p className={style.message}>Hình ảnh</p>
                  ) : (
                    <p className={style.message}>
                      {item?.infoLastMess?.content.length > 10
                        ? item?.infoLastMess?.content.substring(0, 20) + '...'
                        : item?.infoLastMess?.content}
                    </p>
                  )
                }
              />
              <span className={style.time}>
                {/* {getTimeDiff(item.infoLastMess.createdAt)} */}
              </span>
            </List.Item>
          );
        }}
      />
    );
  }
}
// }

export default ListChat;
