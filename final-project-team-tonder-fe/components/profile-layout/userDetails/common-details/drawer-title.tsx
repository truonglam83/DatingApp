import React from 'react'
import detailsStyle from '../userDetails.module.scss'

interface IDrawerTitle {
    drawerTitle: string;
}

const DrawerTitle = ({ drawerTitle }: IDrawerTitle) => {
    return (
        <>
            <i className={detailsStyle["temp"]}></i>
            <span className={detailsStyle["purpose__tile"]}>{drawerTitle}</span>
            <p className={detailsStyle["purpose__description"]}>
                Chúng tôi sẽ chia sẻ điều này trên hồ sơ của bạn. Bạn có thể thay đổi bất kỳ lúc nào
            </p>
        </>
    )
}

export default DrawerTitle