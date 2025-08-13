import { useCategoriesState } from "../../providers/CategoriesProvider";
import CategoryComponent from "../Category";
import { useNavigate } from "react-router-dom";
import { useModalDataClose } from "../../providers/ModalProvider";

export default function SearchFilterModal() {
  const categories = useCategoriesState();
  const navigate = useNavigate();
  const closeModal = useModalDataClose();

  return (
    <div className="grid grid-cols-4 gap-y-[3dvw]">
      {categories
        .filter((e) => e.parent === null)
        .map((category, i) => (
          <div
            key={category.title}
            className="col-span-1 flex justify-center"
          >
            <CategoryComponent
              onClick={() => {
                navigate("/category/" + category.slug, { state: "reports" });
                closeModal();
              }}
              data={category}
            />
          </div>
        ))}
    </div>
  );
}
