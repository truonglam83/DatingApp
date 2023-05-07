import { useRouter } from 'next/router';
import styles from './style.module.scss';

interface IProps {
  Icon: JSX.Element;
  label: string;
  active?: boolean;
  IconActive: JSX.Element;
  href?: string;
}

export default function NavBarItem({
  Icon,
  label,
  IconActive,
  active,
  href,
}: IProps) {
  const router = useRouter();
  const handleClick = () => {
    if (href) router.push(href);
  };
  return (
    <div onClick={handleClick}>
      {active ? IconActive : Icon}
      <p className={`${active ? styles.active : styles.disabled}`}>{label}</p>
    </div>
  );
}
