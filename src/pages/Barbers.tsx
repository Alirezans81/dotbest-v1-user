import NavigationLayout from "../components/NavigationLayout";
import BarberCard from "../components/BarberCard";
import { defaultBarber } from "../lib/salon";

export default function Barbers() {
  return (
    <NavigationLayout label="آرایشگران مو">
      <div className="flex flex-col gap-[2dvh]">
        <div className="w-full grid grid-cols-2 gap-[4dvw]">
          <div className="col-span-1">
            <BarberCard data={defaultBarber} />
          </div>
          <div className="col-span-1">
            <BarberCard data={defaultBarber} />
          </div>
          <div className="col-span-1">
            <BarberCard data={defaultBarber} />
          </div>
          <div className="col-span-1">
            <BarberCard data={defaultBarber} />
          </div>
          <div className="col-span-1">
            <BarberCard data={defaultBarber} />
          </div>
          <div className="col-span-1">
            <BarberCard data={defaultBarber} />
          </div>
          <div className="col-span-1">
            <BarberCard data={defaultBarber} />
          </div>
          <div className="col-span-1">
            <BarberCard data={defaultBarber} />
          </div>
          <div className="col-span-1">
            <BarberCard data={defaultBarber} />
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
}
