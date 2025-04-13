import { useCategoriesState } from "../../providers/CategoriesProvider";
import CategoryComponent from "../Category";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useModalDataClose } from "../../providers/ModalProvider";

export default function SearchFilterModal() {
  const categories = useCategoriesState();
  const navigate = useNavigate();
  const closeModal = useModalDataClose();

  return (
    <div className="w-full flex flex-col gap-[4dvw]">
      <div className="flex flex-col gap-[2dvw]">
        <span className="text-[5.5dvw]">خدمات</span>
        <div className="grid grid-cols-4 gap-y-[3dvw]">
          {categories
            .filter((e) => e.parent === null)
            .map((category, i) => (
              <div
                key={category.title}
                className="col-span-1 flex justify-center items-center"
              >
                <CategoryComponent
                  onClick={() => {
                    navigate("/services/" + category.slug);
                    closeModal();
                  }}
                  data={category}
                />
              </div>
            ))}
        </div>
      </div>
      <Button label="تایید" onClick={() => {}} type="button" />
    </div>
  );
}
