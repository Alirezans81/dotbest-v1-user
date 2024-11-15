import Temp from "../images/temp.png";

import Button from "../components/Button";

import Edit from "../images/Profile/edit.svg";
import BackLight from "../images/common/back-light.svg";
import BackDark from "../images/common/back-dark.svg";
import { useOpenModal } from "../hooks/Modal";
import EditInfoModal from "../components/modals/EditInfoModal";
import SupportModal from "../components/modals/SupportModal";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const openModal = useOpenModal();
  const openEditInfoModal = () => openModal(<EditInfoModal />);
  const openSupportModal = () => openModal(<SupportModal />);

  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `.Best | بهترین زیبایی ها`,
          text: ``,
          url: document.location.href.replace("/about", ""),
        })
        .then(() => {})
        .catch((error) => {});
    }
  };

  const navigate = useNavigate();
  const navigateToAbout = () => navigate("/about");

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col justify-between gap-[2dvh] px-[5dvw] py-[4dvw]">
      <div className="w-full pt-[7dvh] flex justify-center items-center">
        <div className="flex flex-col items-center gap-[2dvw]">
          <div className="w-[30dvw] h-[30dvw] relative">
            <img
              alt="عکس پروفایل شما"
              className="w-full h-full rounded-full object-cover border border-gray_001 dark:border-gray_004"
              src={Temp}
            />
            <button
              className="absolute top-0 right-0 p-[2dvw] bg-primary rounded-full"
              onClick={() => {}}
            >
              <img alt="ویرایش" className="w-[5dvw] h-[5dvw]" src={Edit} />
            </button>
          </div>
          <span className="text-[7dvw]">ماهتیسا درویشی</span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-[3dvw]">
        <Button
          type="button"
          onClick={openEditInfoModal}
          className="text-start pr-[6dvw] pl-[4dvw] py-[3dvw] text-[5dvw]"
        >
          <div className="w-full h-full flex justify-between items-center">
            <span>تغییر مشخصات</span>
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
        <Button
          type="button"
          onClick={openSupportModal}
          className="text-start pr-[6dvw] pl-[4dvw] py-[3dvw] text-[5dvw]"
        >
          <div className="w-full h-full flex justify-between items-center">
            <span>پشتیبانی</span>
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
        <Button
          type="button"
          onClick={share}
          className="text-start pr-[6dvw] pl-[4dvw] py-[3dvw] text-[5dvw]"
        >
          <div className="w-full h-full flex justify-between items-center">
            <span>اشتراک گذاری</span>
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
        <Button
          type="button"
          onClick={navigateToAbout}
          className="text-start pr-[6dvw] pl-[4dvw] py-[3dvw] text-[5dvw]"
        >
          <div className="w-full h-full flex justify-between items-center">
            <span>درباره بِست</span>
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
      </div>
      <Button
        type="button"
        label="خروج از حساب کاربری"
        className="text-error !border-error py-[3dvw]"
        onClick={() => {}}
      />
    </div>
  );
}
