import { createContext, useContext, useState } from "react";
import { Wallet, defaultWallet } from "../lib/common";

const WalletState = createContext<Wallet>(defaultWallet);
type WalletSetStateType = (value: Wallet) => void;
const WalletSetState = createContext<WalletSetStateType>((value: Wallet) => {});

interface Props {
  children: React.ReactNode;
}
const WalletProvider = ({ children }: Props) => {
  const [Wallet, setWallet] = useState(defaultWallet);

  return (
    <WalletState.Provider value={Wallet}>
      <WalletSetState.Provider value={setWallet}>
        {children}
      </WalletSetState.Provider>
    </WalletState.Provider>
  );
};

const useWalletState = () => {
  return useContext(WalletState);
};
const useWalletSetState = () => {
  return useContext(WalletSetState);
};

export { WalletProvider, useWalletState, useWalletSetState };
