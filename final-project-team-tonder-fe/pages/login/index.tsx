import HeaderLogin from '@/components/login-layout/welcome/login-phone/header-login/header-login';
import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './login.module.scss';
import Image from 'next/image';
import flag from '../../public/images/loginPhone/vietnam.png';
import loginPhone from '../../public/images/loginPhone/loginPhone.png';
import CustomButton from '@/components/login-layout/button/cusom-button';
import authentication from '@/utils/firebase';
import { signInWithPhoneNumber } from 'firebase/auth';
import { useRouter } from 'next/router';
import { Spin, message } from 'antd';
import { ShowError } from '../../components/login-layout/show-error/show-error';
import { RecaptchaVerifier } from 'firebase/auth';
import authLogin from '../../utils/hoc/auth-login';

const LoginOtp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

  const [messageApi, contextHolder] = message.useMessage();
  const [checkInput, setCheckInput] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const handleInputPhone = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const generateRecapcha = () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => { },
        },
        authentication
      );
    } catch (error) {
      ShowError({
        text: 'Vượt quá số lần gửi',
        messageApi,
        contextHolder,
      });
    }
  };

  const handleSendOtp = async () => {
    generateRecapcha();

    if (!input.match(regexPhoneNumber)) {
      ShowError({
        text: 'Số điện thoại không đúng định dạng',
        messageApi,
        contextHolder,
      });
    } else {
      const appVerifier = window.recaptchaVerifier;
      setLoading(true);
      setCheckInput(true);
      try {
        const res = await signInWithPhoneNumber(
          authentication,
          `+84${input}`,
          appVerifier
        );

        window.confirmationResult = res;
        router.push('login/otp');
      } catch (error) {
        ShowError({
          text: 'Có lỗi xảy ra vui lòng thử lại sau',
          messageApi,
          contextHolder,
        });
      }
    }
  };

  useEffect(() => {
    if (!input || input.length > 0 && !input.match(regexPhoneNumber)) {
      setCheckInput(true);
    } else {
      setCheckInput(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <>
      {contextHolder}
      <div className={`${styles.login__phone} container`}>
        <HeaderLogin
          title="Nhập số điện thoại để tiếp tục"
          desc="Vui lòng nhập số điện thoại để đăng nhập và hẹn hò tại Tonder"
          image={loginPhone}
          href="/"
        />
        <section className={styles.phone__body}>
          <div className={styles.body__input}>
            <Image src={flag} alt="flag" />
            <input
              value={input}
              onChange={handleInputPhone}
              placeholder="Nhập số điện thoại"
              type="text"
            />
          </div>
          <div id="recaptcha-container" />

          <CustomButton
            loading={loading}
            handleClick={handleSendOtp}
            classname={
              loading ? 'button__custom--sb--loading' : 'button__custom--sb'
            }
            title={loading ? <Spin /> : 'Xác thực'}
            image={loading ? false : true}
          />
        </section>
      </div>
    </>
  );
};

export default authLogin(LoginOtp);
