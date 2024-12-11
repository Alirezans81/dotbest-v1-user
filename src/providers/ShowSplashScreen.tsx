import { createContext, useContext, useState } from "react";

const ShowSplashScreenState = createContext<boolean>(false);
type ShowSplashScreenSetStateType = (value: boolean) => void;
const ShowSplashScreenSetState = createContext<ShowSplashScreenSetStateType>(
  (value: boolean) => {}
);

interface Props {
  children: React.ReactNode;
}
const ShowSplashScreenProvider = ({ children }: Props) => {
  const [ShowSplashScreen, setShowSplashScreen] = useState(true);

  return (
    <ShowSplashScreenState.Provider value={ShowSplashScreen}>
      <ShowSplashScreenSetState.Provider value={setShowSplashScreen}>
        {children}
      </ShowSplashScreenSetState.Provider>
    </ShowSplashScreenState.Provider>
  );
};

const useShowSplashScreenState = () => {
  return useContext(ShowSplashScreenState);
};
const useShowSplashScreenSetState = () => {
  return useContext(ShowSplashScreenSetState);
};

export {
  ShowSplashScreenProvider,
  useShowSplashScreenState,
  useShowSplashScreenSetState,
};
