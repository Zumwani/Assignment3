import { Product } from "./Product";

export interface ProductList {
    all: Product[], 
    featured: Product[], 
    sale1: Product[], 
    sale2: Product[], 
    latest: Product[], 
    bestSelling: Product[], 
    topReacted: Product[] 
  }