import { Category } from "../lib/common";
import { useCategoriesState } from "../providers/CategoriesProvider";

const getCategoriesByUrlArray = (
  categories: Category[],
  url_array: string[]
): Category[] => {
  // return categories.filter((category) => url_array.includes(category.url));
  return categories;
};

const useGetCategoriesByUrlArray = () => {
  const categories = useCategoriesState();

  return (url_array: string[]) =>
    getCategoriesByUrlArray(categories, url_array);
};

export { useGetCategoriesByUrlArray };
