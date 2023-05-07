import Image from "next/image";
import style from "./direction.module.scss";
import backIcon from "../../../../public/icons/back.svg";
import settingIcon from "../../../../public/icons/setting.svg";
import { useRouter } from "next/router";
function Direction() {

  const router = useRouter();

  return (
    <div className={style.direction__wrap}>
      <Image onClick={() => router.push('../../../../../chat')} className={style.icon__back} src={backIcon} alt="backIcon" />
      <Image
        className={style.icon__setting}
        src={settingIcon}
        alt="settingIcon"
      />
    </div>
  );
}

export default Direction;
