import { createContext, useContext, useState } from "react";
import { CommonUser, defaultUser } from "../lib/common";

const UserState = createContext<CommonUser>(defaultUser);
type UserSetStateType = (value: CommonUser) => void;
const UserSetState = createContext<UserSetStateType>((value: CommonUser) => {});

interface Props {
  children: React.ReactNode;
}
const UserProvider = ({ children }: Props) => {
  const [User, setUser] = useState(defaultUser);

  return (
    <UserState.Provider value={User}>
      <UserSetState.Provider value={setUser}>{children}</UserSetState.Provider>
    </UserState.Provider>
  );
};

const useUserState = () => {
  return useContext(UserState);
};
const useUserSetState = () => {
  return useContext(UserSetState);
};

export { UserProvider, useUserState, useUserSetState };
