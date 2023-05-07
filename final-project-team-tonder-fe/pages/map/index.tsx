import MainLayout from '@/components/main-layout/map';
import dynamic from 'next/dynamic';

const MapSSR = dynamic(() => import('../../components/map-layout/index'), {
  ssr: false,
});

const Map = () => {
  return (
    <MainLayout>
      <MapSSR />
    </MainLayout>
  );
};

export default Map;
