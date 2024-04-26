import { createContext } from 'react';
import { GlobalContext } from './type';

export const AppContext = createContext<GlobalContext>(undefined);
