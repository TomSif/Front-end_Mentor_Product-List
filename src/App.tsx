import { useState } from "react";
import ProductList from "./components/ProductList";

function App() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const onIncrement = (name: string) =>
    setQuantities((prev) => ({ ...prev, [name]: prev[name] + 1 }));
  const onDecrement = (name: string) =>
    setQuantities((prev) => ({ ...prev, [name]: Math.max(0, prev[name] - 1) }));
  return (
    <div className="min-h-screen bg-rose-50 max-w-304 ">
      <ProductList
        quantities={quantities}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </div>
  );
}

export default App;
