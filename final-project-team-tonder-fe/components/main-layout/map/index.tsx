import { ReactNode } from 'react';
import Footer from './footer/index';

type Props = {
  children?: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <section>
      {children}
      <Footer />
    </section>
  );
}
