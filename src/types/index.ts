export interface ProductImage {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Product {
  image: ProductImage;
  name: string;
  category: string;
  price: number;
}

export interface CartItem {
  image: ProductImage;
  name: string;
  price: number;
  quantity: number;
}
