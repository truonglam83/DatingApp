import style from './style.module.scss';
interface IProps {
  avatar?: string;
}

const BigHeart = ({ avatar }: IProps) => {
  const id = `abc${Math.random()}`;
  return (
    <>
      <svg className={style[`heart-main`]} viewBox="0 0 512 512">
        <defs>
          <pattern
            id={id}
            patternUnits="userSpaceOnUse"
            width="700"
            height="700"
          >
            <image
              href={avatar}
              x="0"
              y="-30"
              width="200"
              height="200"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        </defs>
        <path
          d="M6.94665 42.2498C13.4719 20.1941
          34.7272 4.03305 59.8627 4.03305C73.6857
          4.03305 85.7829 9.60637 95.442 17.6563C105.104
          9.60408 117.2 4.03305 131.021 4.03305C157.338
          4.03305 179.408 21.7595 184.765 45.4089C185.763
          49.0377 186.166 52.7105 186.098 56.3297C185.96
          63.9583 183.918 71.3092 181.298 77.7272C173.73
          96.2968 159.812 113.032 144.179 125.384C128.546
          137.736 111.288 145.967 95.429 145.967C79.64
          145.967 62.5088 137.801 46.9507 125.532C31.4442
          113.304 17.6144 96.7271 9.88355 78.3318C4.46006
          67.0355 3.40822 54.2017 6.94665 42.2498Z"
          fill={`url(#${id})`}
        />
      </svg>
    </>
  );
};
export default BigHeart;
