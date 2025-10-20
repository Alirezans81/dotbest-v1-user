/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useGetWallet, useGetWithdrawals } from "../api/common/hooks";
import Button from "../components/Button";
import WithdrawModal from "../components/modals/WithdrawModal";
import NavigationLayout from "../components/NavigationLayout";
import WithdrawalCard from "../components/WithdrawalCard";
import { useOpenModal } from "../hooks/popups";
import Abstarct from "../images/Wallet/abstract-background.png";
import Skeleton from "../components/Skeleton";
import { useUserState } from "../providers/UserProvider";
import { useWalletSetState, useWalletState } from "../providers/WalletProvider";
import { Withdrawal } from "../lib/common";
import EmptyListMessage from "../components/EmptyListMessage";

export default function WalletPage() {
  const openModal = useOpenModal();
  const openWithdrawModal = () =>
    openModal(<WithdrawModal refresh={refresh} />);

  const user = useUserState();
  const wallet = useWalletState();
  const setWallet = useWalletSetState();

  const [loading, setLoading] = useState(false);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);

  const getWallet = useGetWallet();
  const refresh = () => {
    setLoading(true);
    getWallet({
      setWallet,
      customFunction() {
        getWithdrawals({
          setWithdrawals,
          onFinally() {
            setLoading(false);
          },
        });
      },
      onError() {
        setLoading(false);
      },
    });
  };
  const getWithdrawals = useGetWithdrawals();
  useEffect(() => {
    refresh();
  }, []);

  return (
    <NavigationLayout label="کیف پول" backlink="/profile">
      <div className="w-full flex flex-col gap-[4dvw]">
        {!loading ? (
          <>
            <div className="w-full relative bg-primary overflow-hidden rounded-[8dvw]">
              <img
                alt=""
                className="absolute left-0 top-0 w-full h-full object-cover z-[0] opacity-70"
                src={Abstarct}
              />
              <div className="w-full flex flex-col gap-[6dvw] justify-between items-center px-[5dvw] py-[4dvw]">
                <span className="text-white z-10 text-[5dvw]">
                  {user.first_name + " " + user.last_name}
                </span>
                <div className="w-full flex flex-col items-center gap-[2dvw]">
                  <span className="text-white z-10 text-[7dvw]">
                    {(+wallet.balance).toLocaleString() + " تومان"}
                  </span>
                  <Button
                    onClick={openWithdrawModal}
                    label="برداشت"
                    type="button"
                    className="w-full bg-white dark:bg-black !text-error hover:!bg-error hover:!border-error hover:!text-white z-10"
                  />
                </div>
              </div>
            </div>

            {withdrawals.length ? (
              withdrawals.map((withdrawal) => (
                <WithdrawalCard key={withdrawal.slug} data={withdrawal} />
              ))
            ) : (
              <EmptyListMessage className="!text-[5.5dvw] !text-gray_002 mt-[1dvw]" />
            )}
          </>
        ) : (
          <>
            <Skeleton className="w-full h-[46dvw]" />

            <Skeleton className="w-full h-[61dvw]" />
            <Skeleton className="w-full h-[61dvw]" />
          </>
        )}
      </div>
    </NavigationLayout>
  );
}
