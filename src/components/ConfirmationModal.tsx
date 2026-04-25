import { useRef, useEffect } from "react";
import { CartItem } from "../types/index.ts";
import formatPrice from "../utils/formatPrice.ts";

interface ConfirmationModalProps {
  cartItems: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onStartNewOrder: () => void;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  cartItems,
  onStartNewOrder,
}: ConfirmationModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.addEventListener("close", onClose);
    return () => dialog?.removeEventListener("close", onClose);
  }, [onClose]);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/50  max-w-148 bg-white w-full my-auto mx-auto rounded-2xl p-10"
    >
      <div className="flex flex-col w-full gap-8">
        <header className="flex flex-col">
          <div>
            <img src="/assets/images/icon-order-confirmed.svg" alt="" />
          </div>
          <h1 className="text-preset-1 text-rose-900 ">Order Confirmed</h1>
          <p className="text-rose-500 text-preset-3">
            We hope you enjoy your food!
          </p>
        </header>
        <section className="bg-rose-50 w-full rounded-xl">
          <ul className="flex flex-col p-6 gap-4 ">
            {cartItems.map((item) => {
              const itemTotal = item.quantity * item.price;
              return (
                <li
                  className="flex flex-row items-center justify-between py-2 gap-4 border-b border-b-rose-100 "
                  key={item.name}
                >
                  <div className="flex flex-row justify-center gap-4 ">
                    <div className="w-16 ">
                      <img
                        src={item.image.thumbnail}
                        alt={`image of ${item.name}`}
                        className="rounded-md aspect-square object-cover"
                      />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                      <h6 className="text-preset-4-bold text-rose-900">
                        {item.name}
                      </h6>
                      <div className="flex justify-between items-center">
                        <p className="flex gap-2">
                          <span className="text-red text-preset-4-bold">
                            {item.quantity}x
                          </span>
                          <span className="text-preset-4 text-rose-500">
                            @ {formatPrice(item.price)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <strong className="text-preset-3 text-rose-900">
                    {formatPrice(itemTotal)}
                  </strong>
                </li>
              );
            })}
          </ul>
          <dl className="flex justify-between items-center text-rose-900  px-6 pb-6">
            <dt className="text-preset-4">Order Total</dt>
            <dd className="text-preset-2">{formatPrice(total)}</dd>
          </dl>
        </section>
        <button
          onClick={() => {
            onStartNewOrder();
            onClose();
          }}
          className="bg-red text-white text-preset-3 flex items-center justify-center p-4 rounded-full"
          type="button"
        >
          Start New Order
        </button>
      </div>
    </dialog>
  );
};

export default ConfirmationModal;
