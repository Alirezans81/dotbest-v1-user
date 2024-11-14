import Image1 from "../../images/Login/image1.png";
import Image2 from "../../images/Login/image2.png";
import Image3 from "../../images/Login/image3.png";
import Button from "../../components/Button";
import Carousel from "../../components/Carousel";

interface ElementProps {
  key: string;
  image: string;
  title1: string;
  title2: string;
  desc: string;
}
const Element = ({ key, image, title1, title2, desc }: ElementProps) => {
  return (
    <div className="flex flex-col gap-y-[4dvw]">
      <img alt={key} className="rounded-[6dvw] w-full" src={image} />
      <div className="w-full flex flex-col gap-y-[1dvw]">
        <div className="w-full flex flex-col">
          <h3 className="text-[10dvw] leading-10 text-primary">{title1}</h3>
          <span className="text-[10dvw] leading-10">{title2}</span>
        </div>
        <span>{desc}</span>
      </div>
    </div>
  );
};
const elements = [
  <Element
    key={"image1"}
    desc="شما می‌توانید حرفه‌ای ترین سالن های زیبایی را بر اساس خدمات مورد نیازتان انتخاب و نیز وقت خود را رزرو کنید."
    image={Image1}
    title1="حرفه‌ای ترین"
    title2="سالن های زیبایی"
  />,
  <Element
    key={"image2"}
    desc="شما می‌توانید منصف ترین سالن های زیبایی را انتخاب کنید و در هزینه‌های خود صرفه‌جویی کنید."
    image={Image2}
    title1="منصف ترین"
    title2="سالن های زیبایی"
  />,
  <Element
    key={"image3"}
    desc="شما می‌توانید نزدیک ترین سالن های زیبایی را پیدا کنید و با چند کلیک وقت خود را رزرو کنید."
    image={Image3}
    title1="نزدیک ترین"
    title2="سالن های زیبایی"
  />,
];

interface Props {
  nextStep: () => void;
}
export default function Step0({ nextStep }: Props) {
  return (
    <div className="w-full h-[100dvh] px-[6dvw] pt-[5dvw] pb-[10dvw] flex flex-col gap-y-[4dvw] justify-between">
      <Carousel className="h-full justify-between !gap-[4dvw]">
        {elements.map((element, index) => (
          <div key={index}>{element}</div>
        ))}
      </Carousel>
      <Button className="" label="شروع" type="button" onClick={nextStep} />
    </div>
  );
}
