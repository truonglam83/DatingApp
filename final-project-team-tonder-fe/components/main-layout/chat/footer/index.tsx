import { Col, Row } from 'antd';
import Image from 'next/image';
import React from 'react';
import styleFooter from './styles.module.scss';
import { useRouter } from "next/router";

const data = [
  {
    image: '/images/home/feed.svg',
    text: 'Feed',
    link: '/home'
  },
  {
    image: '/images/home/map.svg',
    text: 'Map',
    link: '/map'
  },
  {
    image: '/images/home/chat.svg',
    text: 'Chat',
    link: 'map'
  },
  {
    image: '/images/home/profile.svg',
    text: 'Profile',
    link: '/profile'
  },
]



function Footer() {
    const router = useRouter();

    const linkTo = (res : string) => {
      router.push(res)
    }

    return (
     <footer className={styleFooter.footer}>
        <Row >
          {data.map((item, index) => (
            <Col key={index} span={6} >
              <Image src={item.image} alt={''} width={24} height={24} onClick={() => linkTo(item.link)} />
              <p>{item.text}</p>
            </Col>
          ))}
        </Row>
     </footer>
    );
  }
  
export default Footer