import BarberCard from "./BarberCard";
import { Barber } from "../lib/barber";

interface Props {
  data: Barber;
  category?: string;
}
export default function SearchSalonCard({ data, category }: Props) {
  return (
    <div>
      <BarberCard
        orientation="row"
        className="shadow-2xl shadow-black border border-gray_001 dark:border-gray_004"
        data={data}
        category={category}
      />
    </div>
  );
}
