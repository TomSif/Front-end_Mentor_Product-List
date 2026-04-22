import { Product } from "../types/index.ts";
import formatPrice from "../utils/formatPrice";

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
            srcSet={product.image.desktop}
            type="image/jpeg"
            media="(min-width: 1280px)"
          />
          <source
            srcSet={product.image.tablet}
            type="image/jpeg"
            media="(min-width: 768px)"
          />
          <img src={product.image.mobile} alt={product.name} />
        </picture>
        <button className="flex items-center justify-center gap-2 text-preset-4-bold text-rose-900">
          <span>
            <img src="/assets/images/icon-add-to-cart.svg" alt="" />
          </span>
          Add to Cart
        </button>
      </section>
      <section>
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
