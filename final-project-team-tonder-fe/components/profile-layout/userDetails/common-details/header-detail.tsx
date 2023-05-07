import { RightOutlined } from "@ant-design/icons";
import React from "react";
import detailsStyle from "../userDetails.module.scss";

interface IHeaderDetail {
    showPurposeDrawer: () => void;
    title: string;
    subTitle: string | null;
}

const HeaderDetail = ({ showPurposeDrawer, title, subTitle }: IHeaderDetail) => {
    return (
        <div className={detailsStyle["user__details--top"]} onClick={showPurposeDrawer}>
            <div>
                <label className={detailsStyle["user__details--purpose__title"]}>{title}</label>

                <label className={detailsStyle["user__details--purpose__body"]}>
                    <span className={detailsStyle.desc}>{subTitle}</span>
                </label>
            </div>
            <RightOutlined className={detailsStyle["user__details--icon"]} />
        </div>
    );
};

export default HeaderDetail;
