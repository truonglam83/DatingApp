import Splash from '@/components/login-layout/splash/splash';
import Footer from '@/components/main-layout/home/footer';
import { ACCESS_TOKEN, USER } from '@/utils/config';
import withAuth from '@/utils/hoc/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProfileHeader from '../../components/profile-layout/header/index';
import ProfileContainer from '../../components/profile-layout/index';
import { AppDispatch } from '../../redux/configStore';
import { getProfileUser } from '../../redux/reducers/userReducer';
import profileStyle from './profile.module.scss';
import MainLayout from '@/components/main-layout/profile';

const Profile = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const FetchUser = async () => {
      await dispatch(getProfileUser());
      setIsLoading(false);
    };
    FetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout title={'Tài khoản'}>
      <section className={profileStyle['profile__container']}>
        {isLoading ? <Splash /> : <ProfileContainer />}
      </section>
    </MainLayout>
  );
};

export default withAuth(Profile);
