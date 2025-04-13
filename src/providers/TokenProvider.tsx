import React, { createContext, useContext, useState } from "react";

type TokenType = {
  refresh: string;
  access: string;
  exp_refresh: number;
  exp_access: number;
};

const TokenState = createContext<TokenType>({
  refresh: "",
  access: "",
  exp_refresh: 0,
  exp_access: 0,
});

type TokenSetStateType = (value: TokenType) => void;
const TokenSetState = createContext<TokenSetStateType>(
  (value: TokenType) => {}
);

interface Props {
  children: React.ReactNode;
}
const TokenProvider = ({ children }: Props) => {
  const [data, setData] = useState<TokenType>({
    refresh: "",
    access: "",
    exp_refresh: 0,
    exp_access: 0,
  });

  return (
    <TokenState.Provider value={data}>
      <TokenSetState.Provider value={setData}>
        {children}
      </TokenSetState.Provider>
    </TokenState.Provider>
  );
};

const useTokenState = () => {
  return useContext(TokenState);
};
const useTokenSetState = () => {
  return useContext(TokenSetState);
};

export type { TokenType, TokenSetStateType };
export { TokenProvider, useTokenState, useTokenSetState };
