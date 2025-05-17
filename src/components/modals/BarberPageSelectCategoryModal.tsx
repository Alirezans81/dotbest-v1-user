/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import CategoryComponent from "../Category";
import { useModalDataClose } from "../../providers/ModalProvider";
import { useEffect, useState } from "react";
import { useGetBarberServices } from "../../api/barber/hooks";
import { useIsCategoryRelatedToService } from "../../hooks/category";
import { Category } from "../../lib/common";
import { useCategoriesState } from "../../providers/CategoriesProvider";
import { BarberService } from "../../lib/barber";

interface Props {
  pathname: string;
  barber_slug: string;
}
export default function BarberPageSelectCategoryModal({
  pathname,
  barber_slug,
}: Props) {
  const closeModal = useModalDataClose();
  const navigate = useNavigate();
  const navigateToCategory = (category_slug: string) =>
    navigate("/barber-category/" + category_slug, {
      state: { goToRoute: pathname, services },
    });

  const categories = useCategoriesState();

  const [filteredServiceCategories, setFilteredServiceCategories] = useState<
    Category[]
  >([]);

  const isCategoryRelatedToService = useIsCategoryRelatedToService();

  const getBarberServices = useGetBarberServices();
  const [services, setServices] = useState<BarberService[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  useEffect(() => {
    setServicesLoading(true);
    getBarberServices({
      barber_slug,
      setBarberServices: setServices,
      customFunction(services) {
        let temp = filteredServiceCategories;

        services.map((service) => {
          categories.map((category) => {
            if (
              isCategoryRelatedToService(category.url, service.category) &&
              !temp.find((e) => e.slug === category.slug)
            ) {
              temp.push(category);
            }
          });
        });

        setFilteredServiceCategories(temp);
      },
      onFinally() {
        setServicesLoading(false);
      },
    });
  }, [barber_slug]);

  return (
    <div className="grid grid-cols-4 gap-y-[3dvw] pt-[2dvw]">
      {!servicesLoading ? (
        filteredServiceCategories
          .filter((e) => e.parent === null)
          .map((category) => (
            <div
              key={category.title}
              className="col-span-1 flex justify-center items-center"
            >
              <CategoryComponent
                onClick={() => {
                  closeModal();
                  navigateToCategory(category.slug);
                }}
                data={category}
              />
            </div>
          ))
      ) : (
        <div className="w-full col-span-4 py-[9dvw] flex justify-center items-center">
          <span className="text-[5.5dvw] text-gray_002">
            در حال بارگذاری...
          </span>
        </div>
      )}
    </div>
  );
}
