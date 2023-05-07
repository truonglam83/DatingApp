import { Typography } from 'antd';
import Image from 'next/image';
import style from './info-item.module.scss';
import loveIcon from '../../../../public/icons/loveIcon.svg';
import arrowRight from '../../../../public/icons/arrowRight.svg';

type Props = {
  image: string | undefined;
  name: string | undefined;
  age: string | undefined;
  interval: string | undefined;
};
function InfoItem({ image, name, interval, age }: Props) {
  const ageTransformation = (age?: string) => {
    return new Date().getFullYear() - Number(age?.slice(6));
  };

  return (
    <div className={style.info__item}>
      <div className={style.avatar__wrap}>
        <img className={style.avatar} src={`${image}`} alt="Avatar" />
        <Image className={style.loveIcon} alt="loveIcon" src={loveIcon} />
      </div>
      <div className={style.infomation__wrap}>
        <Typography.Title className={style.name}>
          {name},{ageTransformation(age)}t
        </Typography.Title>
        <Typography.Text className={style.status}>
          Đã kết đôi {interval}
        </Typography.Text>
      </div>
      <Image
        className={style.arrowRight}
        alt="arrowRightIcon"
        src={arrowRight}
      />
    </div>
  );
}

export default InfoItem;
