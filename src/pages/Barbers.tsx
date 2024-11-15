import NavigationLayout from "../components/NavigationLayout";

import FilterLight from "../images/common/filter-light.svg";
import FilterDark from "../images/common/filter-dark.svg";
import BarbersFilterModal from "../components/modals/BarbersFilterModal";
import BarberCard from "../components/BarberCard";
import { useOpenModal } from "../hooks/Modal";

export default function Barbers() {
  const openModal = useOpenModal();
  const openBarbersFilterModal = () => openModal(<BarbersFilterModal />);

  return (
    <NavigationLayout label="">
      <div className="flex flex-col gap-[2dvh]">
        <div className="w-full flex justify-between items-center">
          <span className="text-[7dvw]">آرایشگران مو</span>
          <button className="ml-[0.5dvw]" onClick={openBarbersFilterModal}>
            <img
              alt="فیلتر"
              className="w-[6dvw] h-[6dvw] block dark:hidden"
              src={FilterLight}
            />
            <img
              alt="فیلتر"
              className="w-[6dvw] h-[6dvw] hidden dark:block"
              src={FilterDark}
            />
          </button>
        </div>
        <div className="w-full grid grid-cols-2 gap-[4dvw]">
          <div className="col-span-1">
            <BarberCard />
          </div>
          <div className="col-span-1">
            <BarberCard />
          </div>
          <div className="col-span-1">
            <BarberCard />
          </div>
          <div className="col-span-1">
            <BarberCard />
          </div>
          <div className="col-span-1">
            <BarberCard />
          </div>
          <div className="col-span-1">
            <BarberCard />
          </div>
          <div className="col-span-1">
            <BarberCard />
          </div>
          <div className="col-span-1">
            <BarberCard />
          </div>
          <div className="col-span-1">
            <BarberCard />
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
}
