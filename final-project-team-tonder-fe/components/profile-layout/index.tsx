import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';
import ProfilePicture from './profilePictures';
import ProfileSummary from './summary/index';
import UserDetails from './userDetails/index';

const ProfileContainer = () => {
  const { userProfile } = useSelector((state: RootState) => state.userReducer);

  return (
    <>
      {userProfile && (
        <>
          <ProfileSummary profile={userProfile} />
          <ProfilePicture />
          <UserDetails profile={userProfile} />
        </>
      )}
    </>
  );
};

export default ProfileContainer;
