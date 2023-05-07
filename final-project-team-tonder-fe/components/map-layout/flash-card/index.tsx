import { IUser } from '@/interface/user-interface';
import HomeInfo from '@/pages/home/home-info';
import defaultAvatar from '@/public/images/home/default.jpg';
import { http } from '@/utils/config';
import { Context } from '@/utils/context';
import { Image, message } from 'antd';
import moment from 'moment';
import { Dispatch, SetStateAction, useContext } from 'react';
import locationIcon from '../../../public/images/map/location.png';
import mapStyle from '../map.module.scss';

type UserProp = {
  userInfo: IUser;
  listUser: IUser[];
  setListUser: Dispatch<SetStateAction<IUser[] | undefined>>;
};

const FlashCard: React.FC<UserProp> = ({ userInfo, listUser, setListUser }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const ageTransform = (birthday: string): number => {
    const today = moment();
    const age = moment(birthday, 'DD/MM/YYYY');
    return today.diff(age, 'years');
  };

  return (
    <div className={mapStyle['map__container--flashcard']}>
      {contextHolder}
      <Image
        className={mapStyle['flashcard__avatar']}
        preview={false}
        src={userInfo.avatar ? userInfo.avatar : defaultAvatar.src}
        alt="avatar"
      />

      <div className={mapStyle['flashcard__info']}>
        <div className={mapStyle['flashcard__info--name']}>
          {userInfo?.name}, {userInfo.age && ageTransform(userInfo?.age)}t
        </div>
        <div className={mapStyle['flashcard__info--distance']}>
          <Image
            preview={false}
            className={mapStyle['flashcard__info--location']}
            src={locationIcon.src}
            alt="locationIcon"
          />
          Cách {userInfo.distance?.toFixed(0)}m
        </div>
      </div>
      <div className={mapStyle['flashcard__icon']}>
        <HomeInfo
          user={userInfo}
          listUser={listUser}
          setListUser={setListUser}
        />
      </div>
    </div>
  );
};

export default FlashCard;
