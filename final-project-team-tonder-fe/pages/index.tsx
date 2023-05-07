import authLogin from '../utils/hoc/auth-login';
import Image from 'next/image';
import apple from '../public/images/welcome/apple.png';
import facebookImage from '../public/images/welcome/facebook.png';
import googleImage from '../public/images/welcome/google.png';
import mainImage from '../public/images/welcome/welcomeImage.png';
import styles from '../styles/home.module.scss';
import { provider, providerFB } from '../utils/firebase';
import { useRouter } from 'next/router';
import { loginSocial } from '../utils/login-config/login-social';
import { useState } from 'react';
import { Spin } from 'antd';

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const loginGoogle = () => {
    loginSocial(provider);
  };

  const loginFacebook = () => {
    loginSocial(providerFB);
  };

  return (
    <div className={`${styles.welcome} container`}>
      {/* =============== BODY ================  */}
      <section className={styles.welcome__body}>
        <p className={styles.body__title}>Tonder</p>
        <Image src={mainImage} alt="main-image" />
        <p className={styles.body__text}>Đăng nhập</p>
        <span className={styles.body__description}>
          Vui lòng chọn hình thức đăng nhập để tiếp tục sử dụng
        </span>
        <button
          onClick={() => {
            setLoading(true);
            router.push('/login');
          }}
          className={`${styles.body__button} ${loading ? 'loading' : ''}}}`}
        >
          {loading ? <Spin /> : 'Đăng nhập bằng số điện thoại'}
        </button>
      </section>
      {/* =============== FOOTER ================  */}
      <section className={styles.welcome__footer}>
        <p className={styles.footer__text}>Hoặc đăng nhập với</p>
        <div className={styles.footer__social}>
          <Image onClick={loginFacebook} src={facebookImage} alt="facebook" />
          <Image onClick={loginGoogle} src={googleImage} alt="google" />
          <Image src={apple} alt="apple" />
        </div>
      </section>
    </div>
  );
};

export default authLogin(Home);
