import React from 'react';
import SmallHeart from '../small-heart/small-heart';
import styles from './heart.module.scss';
import BigHeart from '../big-heart/big-heart';
import defaultImg from '../../../../../public/images/home/default.jpg';
import { IUserMatch } from '@/interface/user-interface';
export interface IHeart {
  top?: number;
  left?: number;
  bottom?: number;
  tilt: number;
  width: number;
}

interface IProps {
  data: IUserMatch[];
}

const Heart = ({ data }: IProps) => {
  const smallHeart = [
    { top: -10, left: 10, tilt: -16, width: 30 },
    { top: -40, left: 35, tilt: -16, width: 15 },
    { top: -30, left: 48, tilt: 16, width: 20 },
    { top: -45, left: 70, tilt: 18, width: 25 },
    { top: -30, left: 89, tilt: 18, width: 15 },
    { bottom: -15, left: 10, tilt: -16, width: 30 },
    { bottom: -30, left: 35, tilt: 16, width: 15 },
    { bottom: -15, left: 48, tilt: 18, width: 20 },
    { bottom: -30, left: 70, tilt: 18, width: 25 },
    { bottom: -10, left: 90, tilt: -6, width: 15 },
  ];
  return (
    // Data is array 2 object. 0 and 1 is the index of array. If data[0] is undefined, it will return default image
    <div className={styles[`heart-container`]}>
      <div
        className={` ${styles[`container__img`]} ${styles[`container__img_left`]
          } `}
      >
        <BigHeart avatar={data[0]?.avatar ? data[0]?.avatar : defaultImg.src} />
      </div>
      <div
        className={`${styles.container__img} ${styles[`container__img_right`]}`}
      >
        <BigHeart avatar={data[1]?.avatar ? data[1]?.avatar : defaultImg.src} />
      </div>
      {/* Absolute */}
      <div>
        {smallHeart?.map((littleHeart, index) => {
          return <SmallHeart key={index} data={littleHeart} />;
        })}
      </div>
    </div>
  );
};

export default Heart;
