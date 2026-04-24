import ProductCard from "./ProductCard";
import { Product } from "../types/index.ts";

interface ProductListProps {
  quantities: Record<string, number>;
  onIncrement: (name: string) => void;
  onDecrement: (name: string) => void;
  data: Product[];
}
const ProductList = ({
  quantities,
  onIncrement,
  onDecrement,
  data,
}: ProductListProps) => {
  return (
    <main className="flex flex-col p-6 gap-8 w-full">
      <h1 className="text-preset-1 text-rose-900">Desserts</h1>
      <section className="w-full">
        <ul className="grid  md:grid-cols-[repeat(3,1fr)] w-full gap-y-8 gap-x-6 ">
          {data.map((product: Product) => (
            <li key={product.name}>
              <ProductCard
                product={product}
                quantity={quantities[product.name] ?? 0}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ProductList;
