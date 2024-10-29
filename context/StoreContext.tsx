import { createContext, useContext } from "react";
import StoreService from "@/services/Store";

const StoreContext = createContext(StoreService);
export const useStore = () => useContext(StoreContext);

export default StoreContext;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <StoreContext.Provider value={StoreService}>
      {children}
    </StoreContext.Provider>
  );
};
