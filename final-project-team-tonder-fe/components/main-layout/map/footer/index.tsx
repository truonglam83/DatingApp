import { Col, Row } from 'antd';
import React from 'react';
import styleFooter from './styles.module.scss';
import { useRouter } from 'next/router';
import NavBarItem from './detail-item';
import { navbarItem } from '@/components/item-footer';

function Footer() {
  const router = useRouter();
  const currentRoute = router.pathname;

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
