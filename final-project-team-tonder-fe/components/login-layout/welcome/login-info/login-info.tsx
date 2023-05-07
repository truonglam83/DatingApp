import React, { useState } from 'react'
import styles from './login-info.module.scss'

type Props = {
    children: React.ReactNode;
    label: string;
    value: string | undefined;
}

const InputInfo = ({ children, label, value }: Props) => {
    const [focus, setFocus] = useState(false);

    const labelClass = focus || (value && value.length !== 0) ? `${styles.label} ${styles.label__float}` : `${styles.label}`;

    return (

        <section className={styles.info__body}>
            <div
                className={styles.float__label}
                onBlur={() => setFocus(false)}
                onFocus={() => setFocus(true)}
            >
                {children}
                <label className={labelClass}>{label}</label>
            </div>
        </section>

    )
}

export default InputInfo