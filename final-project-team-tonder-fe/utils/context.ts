import { IUser } from '@/interface/user-interface';
import { createContext } from 'react';

interface ContextType {
  isMatchDrawer: boolean;
  setIsMatchDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  isInteract: boolean;
  setIsInteract: React.Dispatch<React.SetStateAction<boolean>>;
  radiusLength: number;
  setRadiusLength: React.Dispatch<React.SetStateAction<number>>;
}

const initialContext: ContextType = {
  isMatchDrawer: false,
  setIsMatchDrawer: () => {},
  isInteract: false,
  setIsInteract: () => {},
  radiusLength: 0,
  setRadiusLength: () => {},
};

export const Context = createContext<ContextType>(initialContext);
