import { ReactNode } from 'react';
import Footer from './footer/index';
import Header from './header/index';

type Props = {
  title: string;
  children?: ReactNode;
};

export default function MainLayout({ children, title }: Props) {
  return (
    <section>
      <Header title={title} />
      {children}
      <Footer />
    </section>
  );
}
