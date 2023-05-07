import { AppDispatch } from '@/redux/configStore';
import { useEffect, useState } from 'react';
import MainLayout from '../../components/main-layout/home/index';
// import Image from "next/image";
import { Alert, Image } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import LocationSvg from '../../public/images/home/location.svg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';

// import required modules
import InteractBtn from '@/components/interact-btn';
import Splash from '@/components/login-layout/splash/splash';
import { IUser } from '@/interface/user-interface';
import { updateLocation } from '@/redux/reducers/locationReducer';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { EffectCreative } from 'swiper';
import {
  getUserByRadius,
  setLocationUser,
} from '../../redux/reducers/userReducer';
import withAuth from '../../utils/hoc/auth';
import HomeInfo from './home-info';
import styleHome from './home.module.scss';

const HomePage = () => {
  const [listUsers, setListUsers] = useState<IUser[]>();
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const radiusLength = 3000;

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAge = (birthday: string | undefined) => {
    if (!birthday) return 0;
    const now = moment();
    const birth = moment(birthday, 'DD/MM/YYYY');
    const data = now.diff(birth, 'years');
    return data;
  };

  const getUser = () => {
    const id = JSON.parse(`${localStorage.getItem('user')}`).id;

    navigator.geolocation.getCurrentPosition(async (position) => {
      // Update my location save to database
      const { latitude, longitude } = position.coords;
      if (position) {
        const listUsers = await dispatch(
          getUserByRadius(latitude, longitude, radiusLength)
        );
        setListUsers(listUsers);
        await updateLocation(id, latitude, longitude);
        dispatch(
          setLocationUser({
            latitude: latitude,
            longitude: longitude,
          })
        );
        dispatch(
          setLocationUser({
            latitude: latitude,
            longitude: longitude,
          })
        );
        setLoading(false);
      }
    });
  };

  return (
    <>
      {loading ? (
        <MainLayout title="Tonder">
          <Splash />
        </MainLayout>
      ) : (
        <MainLayout title="Tonder">
          <section className={`${styleHome.home}`}>
            {listUsers?.length ? (
              <>
                <Swiper
                  grabCursor={true}
                  effect={'creative'}
                  creativeEffect={{
                    prev: {
                      shadow: true,
                      translate: ['-130%', 0, -500],
                    },
                    next: {
                      shadow: true,
                      translate: ['130%', 0, -500],
                    },
                  }}
                  modules={[EffectCreative]}
                  className="mySwiper2"
                >
                  {listUsers?.map((item: IUser, index: number) => (
                    <div key={item.id}>
                      <SwiperSlide
                        key={item.id}
                        id={item.id}
                        className={styleHome.slide}
                      >
                        <section className={styleHome.content} id={item.id}>
                          <Image
                            className={styleHome[`avatar--user`]}
                            src={`${
                              item.avatar == '' || item.avatar == null
                                ? '/images/home/default.jpg'
                                : item.avatar
                            }`}
                            alt={''}
                          />
                          <section className={styleHome[`info--user`]}>
                            <section className={styleHome[`info--detail`]}>
                              <p className={styleHome.bio__name}>
                                {item.name.length > 12
                                  ? item.name.substring(0, 12) + '...'
                                  : item.name}{' '}
                                , {handleAge(item.age)}t
                              </p>
                              <section className={styleHome.info__distance}>
                                <Image
                                  src={LocationSvg.src}
                                  alt="path"
                                  preview={false}
                                />
                                Cách {item.distance?.toFixed(0)}m
                              </section>
                            </section>
                            <HomeInfo
                              listUser={listUsers}
                              setListUser={setListUsers}
                              user={item}
                            ></HomeInfo>
                          </section>
                        </section>

                        <InteractBtn
                          user={item}
                          listUser={listUsers}
                          setListUser={setListUsers}
                        />
                      </SwiperSlide>
                    </div>
                  ))}
                </Swiper>
              </>
            ) : (
              <>
                <section className={`${styleHome.nodata}`}>
                  <p>Không có ai ở quanh đây.</p>
                  <p>Bạn quay lại sau nhé💜</p>
                </section>
              </>
            )}
          </section>
        </MainLayout>
      )}
    </>
  );
};

export default withAuth(HomePage);
