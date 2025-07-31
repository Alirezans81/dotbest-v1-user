/* eslint-disable react-hooks/exhaustive-deps */
import FakeAvatar from "../images/common/fake-avatar.svg";

import Button from "../components/Button";

import Edit from "../images/Profile/edit.svg";
import BackLight from "../images/common/back-light.svg";
import BackDark from "../images/common/back-dark.svg";
import { useOpenModal, useOpenToast } from "../hooks/popups";
import EditInfoModal from "../components/modals/EditInfoModal";
import SupportModal from "../components/modals/SupportModal";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../components/modals/LogoutModal";
import { useUserState } from "../providers/UserProvider";
import { useEffect, useRef, useState } from "react";
import { useUpdateAvatar } from "../api/user/hooks";
import { useLoadingSetState } from "../providers/LoadingProvider";

export default function Profile() {
  const user = useUserState();
  const setLoading = useLoadingSetState();
  const openModal = useOpenModal();
  const openEditInfoModal = () => openModal(<EditInfoModal />);
  const openSupportModal = () => openModal(<SupportModal />);
  const openLogoutModal = () => openModal(<LogoutModal />);

  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: `.Best | بهترین زیبایی ها`,
        text: ``,
        url: document.location.href.replace("/about", ""),
      });
    }
  };

  const navigate = useNavigate();
  const navigateToAbout = () => navigate("/about");

  const inputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const { updateAvatar, loading: updateAvatarLoading } = useUpdateAvatar();
  useEffect(() => setLoading(updateAvatarLoading), [updateAvatarLoading]);

  const openToast = useOpenToast();

  useEffect(() => {
    if (avatar) {
      updateAvatar({
        file: avatar,
        onError(error) {
          openToast(error.message);
        },
      });
    }
  }, [avatar]);

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col justify-between gap-[2dvh] px-[5dvw] py-[4dvw]">
      <div className="w-full pt-[7dvh] flex justify-center items-center">
        <div className="flex flex-col items-center gap-[2dvw]">
          <div className="w-[30dvw] h-[30dvw] relative">
            <img
              alt="عکس پروفایل شما"
              className="w-full h-full rounded-full object-cover border border-gray_001 dark:border-gray_004"
              src={user.avatar_url || FakeAvatar}
            />
            <input
              ref={inputRef}
              accept="image/*"
              type="file"
              className="hidden"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
            />
            <button
              className="absolute top-0 right-0 p-[2dvw] bg-primary rounded-full"
              onClick={() => inputRef.current?.click()}
            >
              <img alt="ویرایش" className="w-[5dvw] h-[5dvw]" src={Edit} />
            </button>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[7dvw] leading-8">
              {user.first_name + " " + user.last_name}
            </span>
            <span className="text-gray_002">{user.phone}</span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-[3dvw]">
        {/* <Button
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
        </Button> */}
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
        className="!bg-transparent !text-error !border-error hover:!bg-error hover:!border-error hover:!text-white py-[3dvw]"
        onClick={openLogoutModal}
      />
    </div>
  );
}
