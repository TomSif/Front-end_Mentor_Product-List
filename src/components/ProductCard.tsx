import { Product } from "../types/index.ts";
import formatPrice from "../utils/formatPrice.ts";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const priceFormated = formatPrice(product.price);
  return (
    <article className="flex flex-col gap-4">
      <section className="flex flex-col items-center">
        <picture>
          <source
            srcSet={product.image.mobile}
            type="image/jpeg"
            media="(max-width: 375px)"
          />
          <source
            srcSet={product.image.tablet}
            type="image/jpeg"
            media="(max-width: 768px)"
          />
          <img
            src={product.image.desktop}
            alt={product.name}
            className="rounded-2xl"
          />
        </picture>
        <button className="flex items-center justify-center gap-2 text-preset-4-bold text-rose-900">
          <span>
            <img src="/assets/images/icon-add-to-cart.svg" alt="" />
          </span>
          Add to Cart
        </button>
      </section>
      <section className="flex flex-col items-start text-left">
        <h2 className="text-preset-4 text-rose-500">{product.category}</h2>
        <h3 className="text-preset-3 text-rose-900">{product.name}</h3>
        <p className="text-preset-3 text-red">
          <data itemProp="price" value={product.price}>
            {priceFormated}
          </data>
        </p>
      </section>
    </article>
  );
}

export default ProductCard;
