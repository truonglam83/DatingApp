import ChatFillIcon from '../main-layout/home/icon/chatFillIcon';
import ChatIcon from '../main-layout/home/icon/chatIcon';
import FeedFillIcon from '../main-layout/home/icon/feedFillIcon';
import FeedIcon from '../main-layout/home/icon/feedIcon';
import MapFillIcon from '../main-layout/home/icon/mapFillIcon';
import MapIcon from '../main-layout/home/icon/mapIcon';
import ProfileFillIcon from '../main-layout/home/icon/profileFillIcon';
import ProfileIcon from '../main-layout/home/icon/profileIcon';

interface INavbar {
  Icon: JSX.Element;
  label: string;
  active?: boolean;
  IconActive: JSX.Element;
  href?: string;
}

export const navbarItem: INavbar[] = [
  {
    Icon: <FeedIcon />,
    IconActive: <FeedFillIcon />,
    label: 'Lướt',
    href: '/home',
  },
  {
    Icon: <MapIcon />,
    IconActive: <MapFillIcon />,
    label: 'Map',
    href: '/map',
  },
  {
    Icon: <ChatIcon />,
    IconActive: <ChatFillIcon />,
    label: 'Trò chuyện',
    href: '/chat',
  },
  {
    Icon: <ProfileIcon />,
    IconActive: <ProfileFillIcon />,
    label: 'Cá nhân',
    href: '/profile',
  },
];
