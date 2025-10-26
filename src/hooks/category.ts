import { Category } from "../lib/common";
import { useCategoriesState } from "../providers/CategoriesProvider";

const findHighestParent = (
  categories: Category[],
  category_url: string
): Category | null => {
  const category = categories.find((e) => e.url === category_url);

  if (category) {
    if (category.parent) {
      return findHighestParent(categories, category.parent);
    } else {
      return category;
    }
  } else {
    return null;
  }
};
export const useFindHighestParent = () => {
  const categories = useCategoriesState();

  return (category_url: string) => findHighestParent(categories, category_url);
};

const isCategoryRelatedToService = (
  categories: Category[],
  category_url: string,
  service_category: string
): boolean => {
  const foundCategory = categories.find((e) => e.url === service_category);

  if (foundCategory) {
    if (category_url === foundCategory.url) {
      return true;
    } else if (foundCategory.parent) {
      return isCategoryRelatedToService(
        categories,
        category_url,
        foundCategory.parent
      );
    }
    return false;
  }
  return false;
};
export const useIsCategoryRelatedToService = () => {
  const categories = useCategoriesState();

  return (category_url: string, service_category: string) =>
    isCategoryRelatedToService(categories, category_url, service_category);
};
