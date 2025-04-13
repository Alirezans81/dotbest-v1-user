import { createContext, useContext, useState } from "react";
import { User, defaultUser } from "../lib/common";

const UserState = createContext<User>(defaultUser);
type UserSetStateType = (value: User) => void;
const UserSetState = createContext<UserSetStateType>((value: User) => {});

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
