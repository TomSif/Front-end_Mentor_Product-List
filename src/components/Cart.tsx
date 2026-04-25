import { CartItem } from "../types/index.ts";
import formatPrice from "../utils/formatPrice.ts";

interface CartProps {
  cartItems: CartItem[];
  removeItemFromCart: (name: string) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCartEmpty: boolean;
}

const Cart = ({
  cartItems,
  removeItemFromCart,
  setIsOpen,
  isCartEmpty,
}: CartProps) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return (
    <>
      {isCartEmpty ? (
        <section className="bg-white w-full flex flex-col p-6 gap-6 rounded-2xl h-auto xl:max-w-96">
          <h5 className="text-preset-2 text-red">
            Your Cart
            <span>({cartItems.length}) </span>
          </h5>
          <div className="py-4 flex flex-col items-center gap-4">
            <div className="w-32 h-32">
              <img
                className="aspect-square object-cover"
                src="/assets/images/illustration-empty-cart.svg"
                alt="illustration of a cake"
              />
            </div>
            <p className="text-preset-4-bold text-rose-500">
              Your added items will appear here
            </p>
          </div>
        </section>
      ) : (
        <section className="bg-white w-full flex flex-col p-6 gap-6 rounded-2xl h-auto xl:max-w-96">
          <h5 className="text-preset-2 text-red">
            Your Cart
            <span>({cartItems.length}) </span>
          </h5>
          <ul className="flex flex-col ">
            {cartItems.map((item) => {
              const itemTotal = item.quantity * item.price;
              return (
                <li
                  className="flex flex-col py-4 border-b border-b-rose-100 "
                  key={item.name}
                >
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
                      <strong className="text-preset-4-bold text-rose-500">
                        {formatPrice(itemTotal)}
                      </strong>
                    </p>

                    <button
                      className="border-2 border-rose-400 rounded-full w-4.5 h-4.5 flex items-center justify-center"
                      onClick={() => removeItemFromCart(item.name)}
                      type="button"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <img src="/assets/images/icon-remove-item.svg" alt="" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <dl className="flex justify-between items-center text-rose-900">
            <dt className="text-preset-4">Order Total</dt>
            <dd className="text-preset-2">{formatPrice(total)}</dd>
          </dl>
          <div className="bg-rose-50 rounded-md flex text-preset-4 text-rose-900 p-4 items-center justify-center">
            <img
              src="/assets/images/icon-carbon-neutral.svg"
              alt=""
              className="mr-2.5"
            />
            <p>
              This is a{" "}
              <span className="text-preset-4-bold">carbon-neutral</span>{" "}
              delivery
            </p>
          </div>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="bg-red text-white text-preset-3 flex items-center justify-center p-4 rounded-full"
            type="button"
          >
            Confirm Order
          </button>
        </section>
      )}
    </>
  );
};

export default Cart;
