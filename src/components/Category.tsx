import { Category } from "../lib/common";

interface Props {
  data: Category;
  onClick: () => void;
  selected?: boolean;
}
const CategoryComponent = ({ data, onClick, selected = false }: Props) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-[2dvw]">
      <div
        className={`bg-gray_000 dark:bg-gray_006 rounded-[6dvw] p-[3dvw] border border-transparent transition-all duration-200 ${
          selected ? "!border-primary" : ""
        }`}
      >
        <img alt="عکس" className="w-[10dvw] h-[10dvw]" src={data.image_url} />
      </div>
      <span className="text-[5.5dvw] leading-[7dvw]">{data.title}</span>
    </button>
  );
};

export default CategoryComponent;
