import ProductCard from "./ProductCard";
import data from "../data/data.json" with { type: "json" };
import { Product } from "../types/index.ts";

const ProductList = () => {
  return (
    <main className="flex flex-col p-6 gap-8 w-full ">
      <h1 className="text-preset-1 text-rose-900">Desserts</h1>
      <section className="w-full">
        <ul className="grid  md:grid-cols-[repeat(3,1fr)] w-full gap-y-8 gap-x-6 ">
          {data.map((product: Product) => (
            <li key={product.name}>
              <ProductCard key={product.name} product={product} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ProductList;
