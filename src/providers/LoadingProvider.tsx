import { createContext, useContext, useState } from "react";

const LoadingState = createContext<boolean>(false);
type LoadingSetStateType = (value: boolean) => void;
const LoadingSetState = createContext<LoadingSetStateType>(
  (value: boolean) => {}
);

interface Props {
  children: React.ReactNode;
}
const LoadingProvider = ({ children }: Props) => {
  const [Loading, setLoading] = useState(false);

  return (
    <LoadingState.Provider value={Loading}>
      <LoadingSetState.Provider value={setLoading}>
        {children}
      </LoadingSetState.Provider>
    </LoadingState.Provider>
  );
};

const useLoadingState = () => {
  return useContext(LoadingState);
};
const useLoadingSetState = () => {
  return useContext(LoadingSetState);
};

export { LoadingProvider, useLoadingState, useLoadingSetState };
