import { ILocation } from '@/interface/location-interface';
import {
  getProfileUser,
  userSelectedAction,
} from '@/redux/reducers/userReducer';
import { Context } from '@/utils/context';
import { message } from 'antd';
import 'leaflet/dist/leaflet.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Circle, MapContainer, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../interface/user-interface';
import store, { AppDispatch, RootState } from '../../redux/configStore';
import { http } from '../../utils/config';
import AnchorBtn from './anchor-btn';
import FlashCard from './flash-card';
import LocationMarker from './location-marker';
import mapStyle from './map.module.scss';
import RadiusSlider from './radius-slider';
import Splash from '../login-layout/splash/splash';

const MapSSR = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Defined State in persist store
  const userState: any = store.getState().userReducer.userProfile;
  const locationState = store.getState().userReducer.userLocation;
  const userReducer = useSelector((state: RootState) => state.userReducer);
  const [userInfo, setUserInfo] = useState<IUser>();
  // Current User Profile

  const [position, setPosition] = useState<ILocation>({
    latitude: locationState.latitude,
    longitude: locationState.longitude,
  });

  const { radiusLength, setRadiusLength } = useContext(Context);

  // Other User
  const [listUser, setListUser] = useState<IUser[]>();

  const selectUser: IUser | null = store.getState().userReducer.selectUser;

  const getAllUserWithinRadius = useCallback(async () => {
    try {
      if (!position) {
        return;
      }
      const payload: ILocation = {
        latitude: position.latitude,
        longitude: position.longitude,
        radius: radiusLength, // 120 is the radius odd scan on the map.
      };
      const { data } = await http.post('/location/user-within-radius', payload);
      dispatch(getProfileUser());
      setListUser(data);
      // when radius change, set select user is first user in list user inside radius.
      // if not have user, set select user is null
      if (data && data.length > 0) {
        dispatch(userSelectedAction(data[0]));
      } else {
        dispatch(userSelectedAction(null));
      }
      setIsLoading(false);
    } catch (error) {
      messageApi.error('Đã xảy ra lỗi khi hiển thị mọi người xung quanh bạn');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, radiusLength]);

  useEffect(() => {
    if (userState && locationState) {
      setUserInfo({
        ...userState,
        ...locationState,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectUser]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          getAllUserWithinRadius();
        },
        (error) => console.error(error)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radiusLength]);

  return (
    <>
      {isLoading ? (
        <Splash />
      ) : (
        <>
          {contextHolder}
          <section className={mapStyle['map__container']}>
            {/* Slider edit radius to find user */}

            {selectUser && listUser && (
              <FlashCard
                userInfo={selectUser}
                listUser={listUser}
                setListUser={setListUser}
              />
            )}

            <MapContainer
              center={[
                userReducer.userLocation?.latitude,
                userReducer.userLocation?.longitude,
              ]}
              zoom={16}
              // scrollWheelZoom={false}
              doubleClickZoom={false}
              attributionControl={false}
              zoomControl={false}
              className={mapStyle['map__container--content']}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {listUser && <AnchorBtn listUser={listUser} />}
              <RadiusSlider radius={radiusLength} setRadius={setRadiusLength} />
              <Circle
                center={[
                  userReducer.userLocation?.latitude,
                  userReducer.userLocation?.longitude,
                ]}
                pathOptions={{ color: 'red' }}
                radius={radiusLength}
              />
              {/* Show Location current User */}
              {userInfo && <LocationMarker userInfo={userInfo} />}
              {/* Show other user */}
              {listUser?.map((user, index) => (
                <div key={index}>
                  <LocationMarker userInfo={user} />
                </div>
              ))}
            </MapContainer>
          </section>
        </>
      )}
    </>
  );
};

export default MapSSR;
