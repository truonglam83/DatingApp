import HeaderLogin from '@/components/login-layout/welcome/login-phone/header-login/header-login';
import React, { useEffect, useState } from 'react';
import styles from './login-otp.module.scss';
import loginOtp from '../../../public/images/loginPhone/loginOTP.png';
import CustomButton from '@/components/login-layout/button/cusom-button';
import authLogin from '../../../utils/hoc/auth-login';
import OtpInput from 'react18-input-otp';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/configStore';
import { userLoginPhoneApi } from '@/redux/reducers/loginReducer';
import { useRouter } from 'next/router';
import { Spin, message } from 'antd';
import { ShowError } from '@/components/login-layout/show-error/show-error';

const LoginOtp = () => {
  const dispatch: AppDispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [otp, setOtp] = useState<string>('');
  const [checkInput, setCheckInput] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  // function handle input otp
  const handleChangeOtp = (value: string): void => {
    setOtp(value);
  };
  // function handle verify otp
  const handleVerifyOtp = async () => {
    setLoading(true);
    setCheckInput(true);
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then(async (result: any) => {
        // User signed in successfully.
        const storage = localStorage.getItem('userSocial');

        if (storage) {
          const { email, name } = JSON.parse(storage);

          const user = { email: email, name: name };
          dispatch(userLoginPhoneApi(user, result._tokenResponse.idToken));
        }
        const data: any = await dispatch(
          userLoginPhoneApi(null, result._tokenResponse.idToken)
        );
        if (data?.data?.user?.isPhoneConfirmed) {
          router.push('/home');
        } else {
          router.push('/login/login-info');
        }
      })
      .catch((error: string) => {
        setLoading(false);
        setCheckInput(false);
        ShowError({
          text: 'Sai mã OTP. Vui lòng thử lại',
          messageApi,
          contextHolder,
        });
      });
  };

  const handleResendOtp = (): void => {
    ShowError({
      text: 'Có lỗi xảy ra vui lòng thử lại sau',
      messageApi,
      contextHolder,
    });
  };

  useEffect(() => {
    if (!otp || otp.length < 6) {
      setCheckInput(true);
    } else {
      setCheckInput(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  return (
    <>
      {contextHolder}
      <div className={`${styles.login__otp} container`}>
        <HeaderLogin
          title="Mã xác thực"
          desc="Vui lòng nhập mã OTP được gửi về số điện thoại của bạn, để hoàn thành đăng nhập."
          image={loginOtp}
          href="/login"
        />
        <section className={styles.otp__body}>
          <div className={styles.body__input}>
            <div className={styles.body__board}>
              <OtpInput
                value={otp}
                onChange={handleChangeOtp}
                numInputs={6}
                isInputNum={true}
              />
            </div>
          </div>

          <p className={styles.otp__link}>
            <u onClick={handleResendOtp}>Gửi lại OTP</u>
          </p>
          <CustomButton
            loading={loading}
            handleClick={handleVerifyOtp}
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
