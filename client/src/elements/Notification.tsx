import clsx from "clsx";
import { ComponentPropsWithRef } from "react";
import { Transition } from "@headlessui/react";
// import { ReactComponent as CloseIcon } from "../assets/icons/common/cross-circle.svg";
import { useTradeNotification } from "../hooks/notifications/useTradeNotification";
import { useHarvestNotification } from "../hooks/notifications/useHarvestNotification";
import { useEmptyChestNotification } from "../hooks/notifications/useEmptyChestNotification";
import {
  useAttackedNotification,
  useEnemyRaidersAreTravelingNotification,
  useEnemyRaidersHaveArrivedNotification,
  useStolenResourcesNotification,
  useYourRaidersHaveArrivedNotification,
} from "../hooks/notifications/useCombatNotification";
import { EventType, NotificationType } from "../hooks/store/useNotificationsStore";
import { useCaravanHasArrivedAtBankNotification } from "../hooks/notifications/useBankNotification";
import { useCaravanHasArrivedAtHyperstructureNotification } from "../hooks/notifications/useHyperstructureNotification";

const notificationHandlers = {
  [EventType.AcceptOffer]: useTradeNotification,
  [EventType.DirectOffer]: useTradeNotification,
  [EventType.CancelOffer]: useTradeNotification,
  [EventType.Harvest]: useHarvestNotification,
  [EventType.EmptyChest]: useEmptyChestNotification,
  [EventType.StolenResource]: useStolenResourcesNotification,
  [EventType.Attacked]: useAttackedNotification,
  [EventType.ArrivedAtBank]: useCaravanHasArrivedAtBankNotification,
  [EventType.ArrivedAtHyperstructure]: useCaravanHasArrivedAtHyperstructureNotification,
  [EventType.YourRaidersHaveArrived]: useYourRaidersHaveArrivedNotification,
  [EventType.EnemyRaidersHaveArrived]: useEnemyRaidersHaveArrivedNotification,
  [EventType.EnemyRaidersArriving]: useEnemyRaidersAreTravelingNotification,
};

type NotificationProps = {
  notification: NotificationType;
  closedNotifications: Record<string, boolean>;
  id: string;
  type?: "danger" | "success" | "primary";
  onClose?: () => void;
} & ComponentPropsWithRef<"div">;

const STYLES = {
  base: "z-50 flex flex-col w-[330px] min-h-[50px] rounded-xl relative p-2 text-light-pink bg-black border-2 text-xxs",
  danger: "border-order-giants",
  success: "border-order-brilliance",
  primary: "border-gold",
};
export const Notification = ({ notification, className, onClose, type = "primary" }: NotificationProps) => {
  // todo: find a better way to handle close notifications
  // useEffect(() => {
  //   if (!closedNotifications[id]) {
  //     setIsShown(true);
  //   } else {
  //     setIsShown(false);
  //   }
  // }, [closedNotifications, id]);

  const handleNotification = notificationHandlers[notification.eventType];

  const { title, content, time } = handleNotification(notification);

  return (
    <Transition
      show={true}
      appear={true}
      enter="transition-all duration-300"
      enterFrom="opacity-0 -translate-y-full"
      enterTo="opacity-100 translate-y-0"
      leave="transition-all duration-300"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-full"
    >
      <div className={clsx(" pointer-events-auto p-", STYLES.base, STYLES[type], className)}>
        {/* {
          <CloseIcon
            className="absolute w-4 h-4 cursor-pointer top-2 right-2 fill-white opacity-30"
            onClick={onClose}
          />
        } */}
        {time && <div className="absolute bottom-2 right-2 fill-white opacity-30">{time}</div>}
        {title}
        {typeof content === "function" ? content(onClose) : content}
      </div>
    </Transition>
  );
};
