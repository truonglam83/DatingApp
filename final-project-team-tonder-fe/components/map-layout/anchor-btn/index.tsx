import { IUser } from '@/interface/user-interface';
import { Context } from '@/utils/context';
import { BackwardOutlined, ForwardOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import React, { useContext, useState } from 'react';
import anchorStyle from './anchor.module.scss';
import locationIcon from '@/public/images/map/location.png';
import { useMapEvents } from 'react-leaflet';
import store from '@/redux/configStore';
import { userSelectedAction } from '@/redux/reducers/userReducer';

type selectProps = {
  listUser: IUser[];
};

const AnchorBtn: React.FC<selectProps> = ({ listUser }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex - 1;
      if (newIndex < 0) {
        newIndex = listUser.length - 1;
      }
      store.dispatch(userSelectedAction(listUser[newIndex]));
      return newIndex;
    });
  };

  const mapCurrent = useMapEvents({
    locationfound(e) {
      mapCurrent.flyTo(e.latlng, mapCurrent.getZoom());
    },
  });

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + 1;
      if (newIndex >= listUser.length) {
        newIndex = 0;
      }
      store.dispatch(userSelectedAction(listUser[newIndex]));
      return newIndex;
    });
  };

  return (
    <div className={anchorStyle['anchor__container']}>
      <Button
        block
        type="ghost"
        className={anchorStyle['anchor__container--current']}
        onClick={() => mapCurrent.locate()}
      >
        <Image
          preview={false}
          src={locationIcon.src}
          alt="current location"
          width={24}
        />
      </Button>

      <Button
        block
        type="ghost"
        className={anchorStyle['anchor__container--prevBtn']}
        onClick={handlePrev}
      >
        <BackwardOutlined />
      </Button>

      <Button
        block
        type="ghost"
        className={anchorStyle['anchor__container--nextBtn']}
        onClick={handleNext}
      >
        <ForwardOutlined />
      </Button>
    </div>
  );
};

export default AnchorBtn;
