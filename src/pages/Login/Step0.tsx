import Image1 from "../../images/Login/image1.webp";
import Image2 from "../../images/Login/image2.webp";
import Image3 from "../../images/Login/image3.webp";
import Button from "../../components/Button";
import Carousel from "../../components/Carousel";

interface ElementProps {
  img_alt: string;
  image: string;
  title1: string;
  title2: string;
  title3: string;
  desc: string;
}
const Element = ({ img_alt, image, title1, title2, title3, desc }: ElementProps) => {
  return (
    <div className="flex flex-col gap-y-[6dvw]">
      <img alt={img_alt} className="w-full" src={image} />
      <div className="w-full flex flex-col gap-y-[2dvw] px-[6dvw]">
        <div className="w-full flex flex-wrap gap-[1.75dvw]">
          <h3 className="text-[9dvw] leading-8">{title1}</h3>
          <h3 className="text-[9dvw] leading-8 text-primary">{title2}</h3>
          <h3 className="text-[9dvw] leading-8">{title3}</h3>
        </div>
        <span className="text-gray_004 dark:text-gray_001">{desc}</span>
      </div>
    </div>
  );
};
const elements = [
  <Element
    img_alt={"image3"}
    desc="دات‌بست با شناخت سلیقه، نیاز و تجربه‌ات، آرایشگرهایی رو بهت پیشنهاد می‌ده که دقیقاً مناسب تو هستن؛ بدون گشتن و سردرگمی."
    image={Image3}
    title1="ما می‌دونیم"
    title2="چی بهت میاد!"
    title3=""
  />,
  <Element
    img_alt={"image2"}
    desc="از بین آرایشگرهای مختلف، اونایی رو انتخاب کن که بیشترین رضایت رو داشتن. ما نظرات کاربران رو شفاف و دسته‌بندی‌شده بهت نشون می‌دیم."
    image={Image2}
    title1="نظرات واقعی،"
    title2="تجربه واقعی!"
    title3=""
  />,
  <Element
    img_alt={"image1"}
    desc="سیستم رزرو آنلاین دات‌بست بهت این امکان رو می‌ده که بدون تماس، هر زمان که خواستی وقت بگیری؛ حتی برای همون روز."
    image={Image1}
    title1="با"
    title2="چند کلیک"
    title3="وقت بگیر."
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
