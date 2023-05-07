import React from 'react';
import Image from 'next/image';
import arrow from '../../../public/images/button/arrow.png';
import styles from './custom-button.module.scss';
import { Button } from 'antd';
type Props = {
  title: string | JSX.Element;
  image: boolean;
  classname: string;
  handleClick?: () => void;
  loading: boolean;
};

const CustomButton = ({ title, image, classname, handleClick, loading }: Props) => {
  return (
    <Button
      disabled={loading}
      htmlType="submit"
      onClick={handleClick}
      className={loading ? `${styles.button__loading} ${classname}` : `${styles.button__custom} ${classname}`}
    >
      <p className={styles.button__text}>{title}</p>
      {image && <Image src={arrow} alt="arrow" />}
    </Button>
  );
};

export default CustomButton;
