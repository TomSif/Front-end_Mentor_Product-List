const formatPrice = (price: number) => {
  const string = price.toLocaleString("en-US", { minimumFractionDigits: 2 });
  return `$${string}`;
};

export default formatPrice;
