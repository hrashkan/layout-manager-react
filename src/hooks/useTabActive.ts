import { createContext, useContext } from "react";

const TabActiveContext = createContext<boolean>(true);

export const TabActiveProvider = TabActiveContext.Provider;

export const useTabActive = (): boolean => useContext(TabActiveContext);
