import { createContext, useContext, useState } from "react";
import { Category } from "../lib/common";

const CategoriesState = createContext<Category[]>([]);
type CategoriesSetStateType = (value: Category[]) => void;
const CategoriesSetState = createContext<CategoriesSetStateType>(
  (value: Category[]) => {}
);

interface Props {
  children: React.ReactNode;
}
const CategoriesProvider = ({ children }: Props) => {
  const [Categories, setCategories] = useState<Category[]>([]);

  return (
    <CategoriesState.Provider value={Categories}>
      <CategoriesSetState.Provider value={setCategories}>
        {children}
      </CategoriesSetState.Provider>
    </CategoriesState.Provider>
  );
};

const useCategoriesState = () => {
  return useContext(CategoriesState);
};
const useCategoriesSetState = () => {
  return useContext(CategoriesSetState);
};

export { CategoriesProvider, useCategoriesState, useCategoriesSetState };
