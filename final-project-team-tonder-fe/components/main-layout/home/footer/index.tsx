import { Col, Row } from 'antd';
import Image from 'next/image';
import React from 'react';
import styleFooter from './styles.module.scss';
import { useRouter } from 'next/router';
import NavBarItem from './detailItem';
import FeedIcon from '../icon/feedIcon';
import MapIcon from '../icon/mapIcon';
import ProfileIcon from '../icon/profileIcon';
import ChatIcon from '../icon/chatIcon';
import ChatFillIcon from '../icon/chatFillIcon';
import FeedFillIcon from '../icon/feedFillIcon';
import MapFillIcon from '../icon/mapFillIcon';
import { navbarItem } from '@/components/item-footer';

function Footer() {
  const router = useRouter();
  const currentRoute = router.pathname;
  const linkTo = (res: string) => router.push(res);

  return (
    <footer className={styleFooter.footer}>
      <Row>
        {navbarItem.map((item, index) => (
          <Col key={index} span={6}>
            <NavBarItem
              label={item.label}
              href={item.href}
              active={currentRoute === item.href}
              IconActive={item.IconActive}
              Icon={item.Icon}
            />
          </Col>
        ))}
      </Row>
    </footer>
  );
}

export default Footer;
