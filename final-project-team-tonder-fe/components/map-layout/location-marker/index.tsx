import blueIcon from '@/public/images/map/bluepoint.svg';
import profileLocationIcon from '@/public/images/map/ellipseLocation.png';
import heartIcon from '@/public/images/map/heartpoint.png';
import store from '@/redux/configStore';
import { Context } from '@/utils/context';
import L from 'leaflet';
import { useContext } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import { IUser } from '../../../interface/user-interface';
import { userSelectedAction } from '@/redux/reducers/userReducer';
type UserProps = {
  userInfo: IUser;
};

const LocationMarker: React.FC<UserProps> = ({ userInfo }) => {
  const userState = store.getState().userReducer.userProfile;
  const selectUser: IUser | null = store.getState().userReducer.selectUser;
  const position = {
    latitude: userInfo.latitude,
    longitude: userInfo.longitude,
  };

  const getIconMarker = (imageUrl: string) => {
    return L.icon({
      iconUrl: imageUrl,
      iconSize: [50, 50],
    });
  };

  const handleClickMarker = () => {
    if (userInfo.id !== userState?.id) {
      store.dispatch(userSelectedAction(userInfo));
    }
  };

  return (
    <div>
      <Marker
        position={[position.latitude, position.longitude]}
        icon={getIconMarker(
          userInfo.id === userState?.id
            ? profileLocationIcon.src
            : selectUser?.id === userInfo.id
            ? blueIcon.src
            : heartIcon.src
        )}
        eventHandlers={{
          click: handleClickMarker,
        }}
      />
    </div>
  );
};

export default LocationMarker;
