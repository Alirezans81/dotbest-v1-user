import Image1 from "../../images/Login/image1.png";
import Image2 from "../../images/Login/image2.png";
import Image3 from "../../images/Login/image3.png";
import Button from "../../components/Button";
import Carousel from "../../components/Carousel";

interface ElementProps {
  img_alt: string;
  image: string;
  title1: string;
  title2: string;
  desc: string;
}
const Element = ({ img_alt, image, title1, title2, desc }: ElementProps) => {
  return (
    <div className="flex flex-col gap-y-[4dvw]">
      <img alt={img_alt} className="w-full" src={image} />
      <div className="w-full flex flex-col gap-y-[1dvw] px-[6dvw]">
        <div className="w-full flex flex-wrap gap-[1.75dvw]">
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
    img_alt={"image1"}
    desc="شما می‌توانید حرفه‌ای ترین سالن های زیبایی را بر اساس خدمات مورد نیازتان انتخاب و نیز وقت خود را رزرو کنید."
    image={Image1}
    title1="حرفه‌ای ترین"
    title2="سالن های زیبایی"
  />,
  <Element
    img_alt={"image2"}
    desc="شما می‌توانید منصف ترین سالن های زیبایی را انتخاب کنید و در هزینه‌های خود صرفه‌جویی کنید."
    image={Image2}
    title1="منصف ترین"
    title2="سالن های زیبایی"
  />,
  <Element
    img_alt={"image3"}
    desc="شما می‌توانید نزدیک ترین سالن های زیبایی به تالار خود را پیدا کنید و با چند کلیک وقت خود را رزرو کنید."
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
    <div className="w-full h-[100dvh] pb-[10dvw] flex flex-col gap-y-[4dvw] justify-between">
      <Carousel className="h-full justify-between !gap-[4dvw]">
        {elements.map((element, index) => (
          <div key={index}>{element}</div>
        ))}
      </Carousel>
      <div className="w-full px-[6dvw]">
        <Button
          className="w-full"
          label="شروع"
          type="button"
          onClick={nextStep}
        />
      </div>
    </div>
  );
}
