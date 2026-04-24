import { CartItem } from "../types/index.ts";
import formatPrice from "../utils/formatPrice.ts";
interface CartProps {
  cartItems: CartItem[];
  removeItemFromCart: (name: string) => void;
}

const Cart = ({ cartItems, removeItemFromCart }: CartProps) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return (
    <section className="bg-white w-full flex flex-col p-6 gap-6 rounded-2xl h-auto">
      <h5 className="text-preset-2 text-red">
        Your Cart
        <span>
          {"("}
          {cartItems.length}
          {")"}
        </span>
      </h5>
      <ul className="flex flex-col ">
        {cartItems.map((item: CartItem) => {
          const itemTotal = item.quantity * item.price;
          return (
            <li
              className="flex flex-col py-4 border-b border-b-rose-100 "
              key={item.name}
            >
              <h6 className="text-preset-4-bold text-rose-900">{item.name}</h6>
              <div className="flex justify-between">
                <div className="flex gap-2 ">
                  <span className="text-red text-preset-4-bold">
                    {item.quantity}x
                  </span>
                  <span className="text-preset-4 text-rose-500">
                    @ {formatPrice(item.price)}
                  </span>
                  <span className="text-preset-4-bold text-rose-500">
                    {formatPrice(itemTotal)}
                  </span>
                </div>
                <button
                  className="border-2 border-rose-400 rounded-full w-4.5 h-4.5 flex items-center justify-center"
                  onClick={() => {
                    removeItemFromCart(item.name);
                  }}
                  type="button"
                  aria-label="remove item from cart"
                >
                  <img src="/assets/images/icon-remove-item.svg" alt="" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="text-preset-4 text-rose-900 flex justify-between items-center ">
        Order Total{" "}
        <span className="text-preset-2 text-rose-900">
          {formatPrice(total)}
        </span>
      </div>
      <div className="bg-rose-50 rounded-md flex text-preset-4 text-rose-900 p-4 items-center justify-center">
        <span className="pr-2.5">
          <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
        </span>
        <span>This is a </span>
        <span className="text-preset-4-bold px-1.5"> carbon-neutral </span>
        <span> delivery</span>
      </div>
      <button
        className="bg-red text-white text-preset-3 flex items-center justify-center p-4 rounded-full"
        type="button"
      >
        Confirm Order
      </button>
    </section>
  );
};

export default Cart;
