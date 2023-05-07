import Image from 'next/image'
import headerStyle from './styles.module.scss'

function Header() {
  return (
      <p className={headerStyle.body__title}>Tonder</p>
  );
}

export default Header