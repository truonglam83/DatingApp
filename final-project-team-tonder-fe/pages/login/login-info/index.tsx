import { ICreateUser } from '@/interface/login-interface';
import { AppDispatch } from '@/redux/configStore';
import { GENDER } from '@/types/user-types';
import { validation } from '@/utils/validation';
import { DatePicker, DatePickerProps, Input, Select, Space } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomButton from '../../../components/login-layout/button/cusom-button';
import InputInfo from '../../../components/login-layout/welcome/login-info/login-info';
import HeaderLogin from '../../../components/login-layout/welcome/login-phone/header-login/header-login';
import loginInfoPhoto from '../../../public/images/loginPhone/loginInfoPhoto.png';
import { createNewUserApi } from '../../../redux/reducers/loginReducer';
import authLogin from '../../../utils/hoc/auth-login';
import styles from './login-info.module.scss';
import dayjs from 'dayjs';

const LoginInfo = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [birthday, setBirthday] = useState<string>('');
  const [selectValue, setSelectValue] = useState(GENDER.MALE);
  const [checkInput, setCheckInput] = useState<boolean>(false);
  let userStorage;

  if (typeof window !== 'undefined') {
    userStorage = localStorage?.getItem('user');
  }
  const formik = useFormik<ICreateUser>({
    initialValues: {
      name: userStorage ? JSON.parse(userStorage).name : '',
      email: userStorage ? JSON.parse(userStorage).email : '',
      age: '',
      gender: '',
    },
    validationSchema: validation,
    onSubmit: async (values: ICreateUser) => {
      values.age = birthday;
      values.gender = selectValue;
      setCheckInput(true);
      dispatch(createNewUserApi(values));

      router.push('../home');
    },
  });
  const handleSelectGender = (value: GENDER) => {
    setSelectValue(value);
  };

  const handleChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    setBirthday(dateString);
  };

  return (
    <div className={`${styles.login__info} container`}>
      <HeaderLogin
        title="Nhập số điện thoại để tiếp tục"
        desc="Vui lòng nhập đầy đủ thông tin để hoàn thành việc đăng ký."
        image={loginInfoPhoto}
        href="otp"
      />
      <form onSubmit={formik.handleSubmit} className={styles.login__form}>
        <div className={styles.form__input}>
          <InputInfo label="Họ tên" value={formik.values.name}>
            <Input
              placeholder="Vd: Nguyễn Văn A"
              className={styles.info__input}
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </InputInfo>
          {formik.touched.name && formik.errors.name ? (
            <p className={styles.error}>{formik.errors.name}</p>
          ) : null}

          <InputInfo label="Email" value={formik.values.email}>
            <Input
              placeholder="user@gmail.com"
              className={styles.info__input}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </InputInfo>
          {formik.touched.email && formik.errors.email ? (
            <p className={styles.error}>{formik.errors.email}</p>
          ) : null}

          <InputInfo label="Năm sinh" value={birthday}>
            <Space
              className={styles.info__date}
              placeholder="none"
              direction="vertical"
              style={{ width: '100%' }}
            >
              <DatePicker
                format={'DD/MM/YYYY'}
                placeholder="Chọn ngày sinh"
                style={{ width: '100%' }}
                onChange={handleChangeDate}
                defaultValue={dayjs()}
                disabledDate={(current) => {
                  let customDate = moment().format('DD/MM/YYYY');
                  return current && current > moment(customDate, 'DD/MM/YYYY');
                }}
              />
            </Space>
          </InputInfo>

          <InputInfo label="Giới tính" value={selectValue}>
            <Select
              style={{ width: '100%' }}
              onChange={handleSelectGender}
              value={selectValue}
              options={[
                { value: GENDER.MALE, label: 'Nam' },
                { value: GENDER.FEMALE, label: 'Nữ' },
                { value: GENDER.OTHER, label: 'Khác' },
              ]}
            />
          </InputInfo>
        </div>
        <CustomButton
          loading={checkInput}
          title="Xong"
          image={false}
          classname="button__custom--center"
        />
      </form>
    </div>
  );
};

export default authLogin(LoginInfo);
