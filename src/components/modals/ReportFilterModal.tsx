import { useState } from "react";
import { useCategoriesState } from "../../providers/CategoriesProvider";
import Button from "../Button";
import CategoryComponent from "../Category";

export default function ReportFilterModal() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] =
    useState<number>(-1);

  const categories = useCategoriesState();

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
                  onClick={() => setSelectedCategoryIndex(i)}
                  data={category}
                  selected={selectedCategoryIndex === i}
                />
              </div>
            ))}
        </div>
      </div>
      <Button label="تایید" onClick={() => {}} type="button" />
    </div>
  );
}
