import style from './chat.module.scss';
import { Typography } from 'antd';
import ListFavorite from '@/components/main-layout/layout/list-favorite';
import ListChat from '@/components/main-layout/layout/list-chat';
import { useRouter } from 'next/router';
import Footer from '../../components/main-layout/home/footer/index';
import MainLayout from '@/components/main-layout/home';
import { useEffect, useState } from 'react';
import Splash from '@/components/login-layout/splash/splash';
import withAuth from '@/utils/hoc/auth';

const { Title } = Typography;

function Chat() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [idBlock, setIdBlock] = useState<string>('');
  const handleOnclick = (id: string) => {
    router.push(`/chat/message/${id}`);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);

  const setIdBlockHandler = (id: string) => {
    setIdBlock(id);
  };

  return (
    <>
      {loading ? (
        <>
          <MainLayout title={'Trò chuyện'}>
            <Splash />
          </MainLayout>
        </>
      ) : (
        <>
          <MainLayout title={'Trò chuyện'}>
            <div className={style.chat__wrapper}>
              <Title level={2} className={style.favorite__title}>
                Danh sách lượt thích
              </Title>
              <ListFavorite onChange={setIdBlockHandler} />
              <Title level={2} className={style.chatbox__title}>
                Trò chuyện
              </Title>
              <ListChat OnClick={handleOnclick} idBlock={idBlock} />
            </div>
          </MainLayout>
        </>
      )}
    </>
  );
}

export default withAuth(Chat);
