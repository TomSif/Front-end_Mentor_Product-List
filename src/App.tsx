import { useState } from "react";
import data from "./data/data.json" with { type: "json" };
import ProductList from "./components/ProductList";
import ConfirmationModal from "./components/ConfirmationModal";
import Cart from "./components/Cart";

function App() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onIncrement = (name: string) =>
    setQuantities((prev) => ({ ...prev, [name]: (prev[name] ?? 0) + 1 }));

  const onDecrement = (name: string) =>
    setQuantities((prev) => ({
      ...prev,
      [name]: Math.max(0, (prev[name] ?? 0) - 1),
    }));

  const cartItems = data
    .filter((product) => quantities[product.name] >= 1)
    .map((product) => ({ ...product, quantity: quantities[product.name] }));

  const removeItemFromCart = (name: string) =>
    setQuantities((prev) => ({ ...prev, [name]: 0 }));

  const onStartNewOrder = () => {
    setQuantities({});
  };

  const isCartEmpty = cartItems.length === 0;

  function onClose() {
    return setIsOpen(false);
  }

  return (
    <>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        cartItems={cartItems}
        onStartNewOrder={onStartNewOrder}
      />
      <main className="bg-rose-50 max-w-304 flex flex-col xl:flex-row xl:items-start gap-8">
        <ProductList
          data={data}
          quantities={quantities}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
        <Cart
          cartItems={cartItems}
          removeItemFromCart={removeItemFromCart}
          setIsOpen={setIsOpen}
          isCartEmpty={isCartEmpty}
        />
      </main>
    </>
  );
}

export default App;
