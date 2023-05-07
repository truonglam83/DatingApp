import { ReactNode } from 'react';
import Header from '../home/header';
import Footer from '../home/footer';

type Props = {
  children?: ReactNode;
  title: string;
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
