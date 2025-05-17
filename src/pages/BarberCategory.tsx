/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import NavigationLayout from "../components/NavigationLayout";
import { useCategoriesState } from "../providers/CategoriesProvider";
import apiProd from "../api/api-prod";
import apiDev from "../api/api-dev";
import Button from "../components/Button";

import BackLight from "../images/common/back-light.svg";
import BackDark from "../images/common/back-dark.svg";
import { useState } from "react";
import { useIsCategoryRelatedToService } from "../hooks/category";
import { BarberService } from "../lib/barber";

interface Props {
  backlink?: string;
}
export default function BarberCategory({ backlink }: Props) {
  const navigate = useNavigate();

  const { pathname, state } = useLocation();
  const [goToRoute, _setGoToRoute] = useState(state ? state.goToRoute : "");
  const [services, _setServices] = useState<BarberService[]>(
    state ? state.services : []
  );
  const pathnameArray = pathname.split("/");
  const servicesArray = pathnameArray.slice(
    pathnameArray.findIndex((e) => e === "barber-category") + 1,
    pathnameArray.length
  );

  const categories = useCategoriesState();
  const subCategories = categories.filter(
    (e) =>
      e.parent ===
      (process.env.REACT_APP_MODE === "PRODUCTION"
        ? apiProd()["category"]
        : apiDev()["category"]) +
        servicesArray[servicesArray.length - 1] +
        "/"
  );

  const isCategoryRelatedToService = useIsCategoryRelatedToService();

  return (
    <NavigationLayout
      label={
        servicesArray.length
          ? categories.find(
              (e) => e.slug === servicesArray[servicesArray.length - 1]
            )?.title || "دسته بندی ها"
          : "دسته بندی ها"
      }
      backlink={
        servicesArray.length !== 1
          ? "/barber-category/" +
            servicesArray.slice(0, servicesArray.length - 1).join("/")
          : goToRoute || backlink
      }
    >
      <div className="w-full flex flex-col gap-[3dvw]">
        {subCategories
          .filter((category) => {
            let result = false;

            for (let i = 0; i < services.length; i++) {
              const service: BarberService = services[i];
              if (isCategoryRelatedToService(category.url, service.category)) {
                result = true;
                break;
              }
            }

            return result;
          })
          .map((category) => (
            <Button
              key={category.slug}
              type="button"
              onClick={() =>
                category.has_children
                  ? navigate(pathname + "/" + category.slug)
                  : navigate((goToRoute || "/") + `?category=${category.slug}`)
              }
              className="text-start pr-[6dvw] pl-[4dvw] py-[3dvw] text-[5dvw]"
            >
              <div className="w-full h-full flex justify-between items-center">
                <span>{category.title}</span>
                <img
                  alt="فلش"
                  className="w-[5dvw] h-[5dvw] block dark:hidden"
                  src={BackDark}
                />
                <img
                  alt="فلش"
                  className="w-[5dvw] h-[5dvw] hidden dark:block"
                  src={BackLight}
                />
              </div>
            </Button>
          ))}
      </div>
    </NavigationLayout>
  );
}
