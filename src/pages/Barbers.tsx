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
    <NavigationLayout label="آرایشگران مو">
      <div className="flex flex-col gap-[2dvh]">
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
