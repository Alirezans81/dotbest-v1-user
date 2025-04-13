import BarberCard from "./BarberCard";
import { Barber } from "../lib/salon";

interface Props {
  data: Barber;
}
export default function SearchSalonCard({ data }: Props) {
  return (
    <div>
      <BarberCard
        data={data}
        orientation="row"
        className="shadow-2xl shadow-black border border-gray_001 dark:border-gray_004"
      />
    </div>
  );
}
