import { IHeart } from "../hearts/heart";
import style from "./style.module.scss";
type PropsT = {
  data: IHeart;
};

const SmallHeart = ({ data }: PropsT) => {
  return (
    <svg
      className={style[`little-heart`]}
      style={
        data.top
          ? {
              top: `${data.top}%`,
              left: `${data.left}%`,
              transform: `rotate(${data.tilt}deg)`,
            }
          : {
              bottom: `${data.bottom}%`,
              left: `${data.left}%`,
              transform: `rotate(${data.tilt}deg)`,
            }
      }
      width={data.width}
      height="27"
      viewBox="0 0 34 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.69228 3.73578C3.35174 1.2939 6.59005 0.148387 9.67571 1.13057C11.3726 1.6707 12.6408 2.82488 13.5132 4.18661C15.0127 3.57957 16.7145 3.37104 18.4112 3.91111C21.6419 4.93945 23.6613 7.96932 23.3985 11.0704C23.3797 11.553 23.2862 12.0179 23.137 12.4578C22.8232 13.3852 22.2864 14.2042 21.715 14.8866C20.0632 16.8614 17.7033 18.3638 15.3034 19.2633C12.9035 20.1629 10.4646 20.4949 8.51773 19.8752C6.57945 19.2582 4.79423 17.5904 3.36183 15.4822C1.93418 13.3811 0.881588 10.8138 0.648492 8.26243C0.422357 6.66926 0.792729 5.05891 1.69228 3.73578Z"
        fill="url(#paint0_linear_67_1715)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_67_1715"
          x1="23.5697"
          y1="-0.51665"
          x2="3.01989"
          y2="15.2848"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FD79AF" />
          <stop offset="1" stopColor="#FD65B7" />
        </linearGradient>
      </defs>
    </svg>
  );
};
export default SmallHeart;
