import Splash from '@/components/login-layout/splash/splash';
import { Context } from '@/utils/context';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import noSupportImg from '../public/images/welcome/Nosupport.png';
import store, { persistor } from '../redux/configStore';
import '../styles/globals.scss';
import { io } from 'socket.io-client';
import { setSocketChat } from '@/redux/reducers/socketReducer';
import { IUser } from '../interface/user-interface';

// interface AppProps {
//   Component: React.ComponentType;
//   pageProps: any;
// }

export default function App({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [radiusLength, setRadiusLength] = useState<number>(300);
  const [isInteract, setIsInteract] = useState<boolean>(false);
  const [isMatchDrawer, setIsMatchDrawer] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    store.dispatch(
      setSocketChat(
        io(process.env.API_URL, {
          query: {
            token: localStorage.getItem('accessToken'),
          },
        })
      )
    );
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Splash />} persistor={persistor}>
        {isMobile ? (
          <Context.Provider
            value={{
              isInteract,
              setIsInteract,
              radiusLength,
              setRadiusLength,
              isMatchDrawer,
              setIsMatchDrawer,
            }}
          >
            <Component {...pageProps} />
          </Context.Provider>
        ) : (
          <Image
            src={noSupportImg}
            alt=""
            style={{ height: '100vh', width: '100%', backgroundSize: '100%' }}
          />
        )}
      </PersistGate>
    </Provider>
  );
}
