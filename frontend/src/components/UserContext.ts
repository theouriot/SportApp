import { createContext, useContext } from 'react';
import Client from "../types/Client";
import Coach from "../types/Coach";

export type UserContextType = {
        user: Client | Coach | null;
        setUser: (User: any) => void;
    }

export const UserContext = createContext<UserContextType>({ user: null, setUser: user => console.warn('no user')});
export const useUser = () => useContext(UserContext);