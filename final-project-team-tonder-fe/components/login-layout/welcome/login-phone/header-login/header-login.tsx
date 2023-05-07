import React from 'react'
import styles from './header-login.module.scss'
import arrowRight from '../../../../../public/images/loginPhone/arrowRight.png'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
type Props = {
    title: string;
    desc: string;
    image: StaticImageData;
    href: string;
}

const HeaderLogin = ({ title, desc, image, href }: Props) => {
    const router = useRouter();

    const handleRedirect = (href: string) => {
        router.push(href)
    }

    return (
        <header className={styles.phone__header}>
            <Image onClick={() => handleRedirect(href)} className={styles.header__arrow} src={arrowRight} alt='arrowRight' width={20} />
            <p><Image className={styles.body__image} src={image} alt='loginPhone' /></p>
            <p className={styles.body__title}>{title}</p>
            <span className={styles.body__desc}>{desc}</span>
        </header>)
}

export default HeaderLogin