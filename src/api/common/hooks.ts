import { deleteItem } from "./apis";

const useDeleteItem = () => {
  const fetch = async ({
    url,
    customFunction,
    onError,
  }: {
    url: string;
    customFunction?: (data: any) => void;
    onError?: (error: any) => void;
  }) => {
    deleteItem(url)
      .then((res: any) => {
        customFunction && customFunction(res.data);
      })
      .catch((error: any) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(error);
        onError && onError(error);
      });
  };

  return fetch;
};

export { useDeleteItem };
