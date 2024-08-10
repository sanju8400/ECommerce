export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category | null | undefined;
  stock: number;
  imageUrl: string;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
}
