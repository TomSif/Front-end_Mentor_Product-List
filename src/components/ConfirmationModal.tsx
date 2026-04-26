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
      aria-labelledby="orderConfirmed"
      className="backdrop:bg-black/50  max-w-148 bg-white w-full my-auto mx-auto md:rounded-2xl p-10 min-h-screen xl:min-h-auto"
    >
      <div className="flex flex-col w-full gap-8 ">
        <header className="flex flex-col relative ">
          <button
            aria-label="close the modal"
            onClick={() => onClose()}
            className="absolute top-2 right-4 border border-rose-400 rounded-full w-4.5 h-4.5 flex items-center justify-center hover:cursor-pointer hover:border-rose-900 img-btn"
          >
            <img src="/assets/images/icon-remove-item.svg" alt="" />
          </button>
          <div>
            <img src="/assets/images/icon-order-confirmed.svg" alt="" />
          </div>
          <h2 id="orderConfirmed" className="text-preset-1 text-rose-900 ">
            Order Confirmed
          </h2>
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
                      <p className="text-preset-4-bold text-rose-900">
                        {item.name}
                      </p>
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
          className="bg-red text-white text-preset-3 flex items-center justify-center p-4 rounded-full big-btn"
          type="button"
        >
          <span>Start New Order</span>
        </button>
      </div>
    </dialog>
  );
};

export default ConfirmationModal;
