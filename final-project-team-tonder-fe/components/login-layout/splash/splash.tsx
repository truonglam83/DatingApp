import React from 'react';
import styles from './splash.module.scss';
type Props = {};
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = (
  <LoadingOutlined
    style={{ fontSize: 28, color: '#7a56fe', marginTop: '1rem' }}
    spin
  />
);

const Splash = (props: Props) => {
  return (
    <section className={styles.splash}>
      <Spin indicator={antIcon} />
    </section>
  );
};

export default Splash;
