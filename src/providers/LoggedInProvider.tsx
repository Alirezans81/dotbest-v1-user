import { createContext, useContext, useState } from "react";

const LoggedInState = createContext<boolean>(false);
type LoggedInSetStateType = (value: boolean) => void;
const LoggedInSetState = createContext<LoggedInSetStateType>(
  (value: boolean) => {}
);

interface Props {
  children: React.ReactNode;
}
const LoggedInProvider = ({ children }: Props) => {
  const [LoggedIn, setLoggedIn] = useState(false);

  return (
    <LoggedInState.Provider value={LoggedIn}>
      <LoggedInSetState.Provider value={setLoggedIn}>
        {children}
      </LoggedInSetState.Provider>
    </LoggedInState.Provider>
  );
};

const useLoggedInState = () => {
  return useContext(LoggedInState);
};
const useLoggedInSetState = () => {
  return useContext(LoggedInSetState);
};

export { LoggedInProvider, useLoggedInState, useLoggedInSetState };
