import { Product } from "../types/index.ts";
import formatPrice from "../utils/formatPrice.ts";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onIncrement: (name: string) => void;
  onDecrement: (name: string) => void;
}

function ProductCard({
  product,
  quantity,
  onDecrement,
  onIncrement,
}: ProductCardProps) {
  const priceFormated = formatPrice(product.price);
  return (
    <article className="flex flex-col gap-4">
      <section className="flex flex-col items-center">
        <picture>
          <source
            srcSet={product.image.mobile}
            type="image/jpeg"
            media="(max-width: 767px)"
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
        {quantity === 0 ? (
          <button
            onClick={() => {
              onIncrement(product.name);
            }}
            type="button"
            aria-label="Add to cart "
            className="flex items-center justify-center gap-2 text-preset-4-bold text-rose-900 bg-white rounded-full w-40 py-3 -mt-6"
          >
            <span>
              <img src="/assets/images/icon-add-to-cart.svg" alt="" />
            </span>
            Add to Cart
          </button>
        ) : (
          <div
            className="quantity-selector flex items-center justify-between  text-preset-4-bold text-white bg-red rounded-full w-40 py-3 px-4 -mt-6"
            role="spinbutton"
            aria-valuenow={quantity}
            aria-valuemin={1}
            aria-valuemax={99}
          >
            <button
              className="border-2 border-white rounded-full w-4.5 h-4.5 flex items-center justify-center"
              onClick={() => {
                onDecrement(product.name);
              }}
              type="button"
              aria-label="decrease product quantity"
            >
              <img src="/assets/images/icon-decrement-quantity.svg" alt="" />
            </button>
            <span
              className="text-preset-4-bold text-white text-center"
              aria-live="polite"
            >
              {quantity}
            </span>
            <button
              className="border-2 border-white rounded-full w-4.5 h-4.5 flex items-center justify-center"
              onClick={() => {
                onIncrement(product.name);
              }}
              type="button"
              aria-label="increase product quantity"
            >
              <img src="/assets/images/icon-increment-quantity.svg" alt="" />
            </button>
          </div>
        )}
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
