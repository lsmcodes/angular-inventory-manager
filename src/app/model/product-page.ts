import { Product } from './product';

export interface ProductPage {
  content: Product[];
  page: {
    totalElements: number;
    totalPages?: number;
  };
}
