import { IUser } from '@/interface/user-interface';
import { http } from '@/utils/config';
import { Context } from '@/utils/context';
import type { DrawerProps } from 'antd';
import { Drawer, Image } from 'antd';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import alcohol from '../../../public/images/home/alcohol.svg';
import child from '../../../public/images/home/child.svg';
import defaultImg from '../../../public/images/home/default.jpg';
import down from '../../../public/images/home/down.svg';
import quote from '../../../public/images/home/text-icon.png';
import education from '../../../public/images/home/education.svg';
import gender from '../../../public/images/home/gender.svg';
import info from '../../../public/images/home/icon.svg';
import path from '../../../public/images/home/location.svg';
import marriage from '../../../public/images/home/marriage.svg';
import styles from './home-info.module.scss';
import InteractBtn from '@/components/interact-btn';
import { GENDER } from '@/types/user-types';
const colorHobby = ['#FFF0F0', '#EDF7FF', '#d9f7e6'];
interface IHome {
  user: IUser;
  listUser: IUser[];
  setListUser: Dispatch<SetStateAction<IUser[] | undefined>>;
}
function HomeInfo({ user, listUser, setListUser }: IHome) {
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState([]);
  const placement = 'bottom';

  const getAllPhotos = async (id: string) => {
    const data = await http.get(`/photo/${id}`);
    setPhoto(data.data);
  };

  const showDrawer = (id: string) => {
    setOpen(true);
    getAllPhotos(id);
  };

  const onClose = () => {
    setOpen(false);
  };

  const convertGender = (gender: string) => {
    switch (gender) {
      case GENDER.MALE:
        return 'Nam';
      case GENDER.FEMALE:
        return 'Nữ';
      case GENDER.OTHER:
        return 'Khác';
    }
  };

  return (
    <div className={styles.home__drawer}>
      <Image
        src={info.src}
        preview={false}
        onClick={() => showDrawer(user.id)}
        style={{ width: '100%' }}
        alt=""
      />
      <Drawer
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        height={'92%'}
        key={placement}
        className={styles.drawer}
      >
        <div className={`${styles.home__info}`}>
          <section className={styles.buttonBack}>
            <Image src={down.src} preview={false} onClick={onClose} alt="" />
          </section>
          <section className={styles.info__image}>
            <Image
              preview={false}
              className={styles.image__main}
              src={!user.avatar ? defaultImg.src : user.avatar}
              alt="home-image"
            />
          </section>
          <InteractBtn
            user={user}
            listUser={listUser}
            setListUser={setListUser}
            // setOpenDrawer={setOpen}
          />
          <section className={styles.info__bio}>
            <p className={styles.bio__name}>{user.name}</p>
            <section className={styles.bio__distance}>
              <Image src={path.src} alt="path" preview={false} />
              <span>Cách {user.distance && user.distance.toFixed(1)}m</span>
            </section>
            <div className={styles.bio__desc}>
              <Image src={quote.src} alt={`${quote}`} preview={false} />
              <p>{user.bio}</p>
            </div>
            <div className={styles.bio__fav}>
              <p className={styles.fav__title}>Thông tin của {user.name}</p>

              {user.alcohol && (
                <div className={styles.fav__detail}>
                  <Image src={alcohol.src} alt={`${alcohol}`} preview={false} />
                  <span>{user.alcohol}</span>
                </div>
              )}

              {user.children && (
                <div className={styles.fav__detail}>
                  <Image preview={false} src={child.src} alt={`${child}`} />
                  <span>{user.children ? 'Có' : 'không'}</span>
                </div>
              )}

              {user.education && (
                <div className={styles.fav__detail}>
                  <Image preview={false} src={education.src} alt={`${path}`} />
                  <span>{user.education}</span>
                </div>
              )}

              {user.marriage && (
                <div className={styles.fav__detail}>
                  <Image
                    preview={false}
                    src={marriage.src}
                    alt={`${marriage}`}
                  />
                  <span>{user.marriage ? 'Đã kết hôn' : 'Độc thân'}</span>
                </div>
              )}

              <div className={styles.fav__detail}>
                <Image preview={false} src={gender.src} alt={`${gender}`} />
                <span>{convertGender(user.gender)}</span>
              </div>
            </div>
            <div className={styles.bio__tags}>
              <p className={styles.tags__title}>Tôi thích ...</p>
              {user.hobbies?.map((hobby, index) => (
                <p
                  style={{
                    backgroundColor: `${
                      colorHobby[Math.floor(Math.random() * colorHobby.length)]
                    }`,
                  }}
                  key={index}
                  className={styles.tags__detail}
                >
                  <span className={styles.hobby__text}>#{hobby}</span>
                </p>
              ))}
            </div>
          </section>
          <section className={styles.info__photos}>
            {user.avatar && (
              <Image
                preview={false}
                className={styles.image__main}
                src={user.avatar}
                alt="home-image"
              />
            )}

            {photo &&
              photo?.slice(-5)?.map((item: any, index: number) => {
                return (
                  <Image
                    preview={false}
                    className={styles.image__main}
                    key={index}
                    src={item.link}
                    alt=""
                  />
                );
              })}
          </section>
        </div>
      </Drawer>
    </div>
  );
}

export default HomeInfo;
