import { IMessage } from '@/interface/chat-interface';
import { IUser, IUserMatch } from '@/interface/user-interface';
import likeIcon from '@/public/icons/likeIcon.svg';
import unlikeIcon from '@/public/icons/unlikeIcon.svg';
import close from '@/public/images/home/close.png';
import store from '@/redux/configStore';
import { createConversationApi } from '@/redux/reducers/chatReducer';
import { createMatch } from '@/redux/reducers/matchReducer';
import { setSocketChat } from '@/redux/reducers/socketReducer';
import {
  userMatchedInfoAction,
  userSelectedAction,
} from '@/redux/reducers/userReducer';
import { http } from '@/utils/config';
import { Context } from '@/utils/context';
import { Drawer, Image, Modal, message } from 'antd';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { io } from 'socket.io-client';
import title from '../../public/images/home/matchTitle.svg';
import sendHi from '../../public/images/home/sendHi.png';
import Heart from '../main-layout/match/heart-icon/hearts/heart';
import interactStyle from './interact.module.scss';
type userProps = {
  user: IUser;
  listUser: IUser[];
  setListUser: Dispatch<SetStateAction<IUser[] | undefined>>;
};

const InteractBtn: React.FC<userProps> = ({ user, listUser, setListUser }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { isMatchDrawer, setIsMatchDrawer } = useContext(Context);
  const router = useRouter();
  const socket = store.getState().socketReducer.socketChat;
  const userInfo: IUserMatch[] | null = store.getState().userReducer.userInfo;
  const [isModalOpen, setIsModalOpen] = useState(false);
  // handle close drawer, filter user when 2 user matches
  const handleSkip = () => {
    setIsMatchDrawer(false);
    const newList: IUser[] = listUser?.filter(
      (item: IUser) => item.id !== user.id
    );
    setListUser(newList);
    store.dispatch(userSelectedAction(null));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async (): Promise<void> => {
    messageApi.open({
      type: 'success',
      content: 'Bạn đã block người này',
    });
    try {
      const res = await http.patch(`/user/blacklist`, {
        id: user.id,
      });
      store.dispatch(userSelectedAction(null));
      if (res.status === 200) {
        const data = listUser?.filter((item) => item.id !== user.id);
        setListUser(data);
        setIsMatchDrawer(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const likeHandler = async () => {
    setIsLoading(true);
    messageApi.open({
      type: 'success',
      content: 'Bạn đã thích người này',
    });

    const res = await createMatch(user.id);
    // filter list user after like
    if (!res) {
      return;
    }
    if (res.data.length) {
      setIsMatchDrawer(true);
      store.dispatch(userMatchedInfoAction(res.data));
      const newList: IUser[] = listUser?.filter(
        (item: IUser) => item.id !== user.id
      );
      setListUser([...newList]);
    } else {
      store.dispatch(userSelectedAction(null));
      setIsMatchDrawer(false);
      const data: IUser[] = listUser?.filter(
        (item: IUser) => item.id !== user.id
      );
      setListUser([...data]);
    }
    setIsLoading(false);
  };

  const sendMessage = async () => {
    if (typeof window !== 'undefined') {
      let currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      let userId = userInfo?.filter((item) => item.id !== currentUser.id)[0].id;
      //  handle create conversation
      try {
        if (!userId) return;
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

        socket?.emit('sendMessage', message);
        setIsMatchDrawer(false);
        router.push(`/chat/message/${data.id}`);
      } catch (error) {}
    }
  };

  return (
    <>
      {contextHolder}
      <section className={interactStyle.button}>
        <Image
          src={unlikeIcon.src}
          alt="unlike-icon"
          preview={false}
          onClick={() => !isLoading && showModal()}
          className={interactStyle['button--icon']}
        />

        <Image
          src={likeIcon.src}
          alt="like-icon"
          preview={false}
          onClick={() => !isLoading && likeHandler()}
          className={interactStyle['button--icon']}
        />
      </section>

      <Modal
        title="Xóa người dùng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có thật sự muốn xóa người này?</p>
      </Modal>

      <Drawer
        placement="bottom"
        closable={false}
        open={isMatchDrawer}
        key="bottom"
        height={'100%'}
        bodyStyle={{ padding: '0px' }}
      >
        <section className={`${interactStyle.match} container`}>
          <section className={interactStyle[`match--close`]}>
            <Image
              src={close.src}
              alt="unlike-icon"
              preview={false}
              onClick={handleSkip}
            />
          </section>
          <section className={interactStyle[`match--images`]}>
            {userInfo && <Heart data={userInfo} />}
          </section>
          <section className={interactStyle[`match--content`]}>
            <Image alt="" src={title.src} preview={false}></Image>
            <p>Đừng để người ấy phải chờ đợi, gửi lời chào ngay</p>
          </section>
          <section className={interactStyle[`match--input`]}>
            <Image
              alt=""
              src={sendHi.src}
              preview={false}
              onClick={() => sendMessage()}
            ></Image>
            <p onClick={handleSkip}>skip</p>
          </section>
        </section>
      </Drawer>
    </>
  );
};

export default InteractBtn;
