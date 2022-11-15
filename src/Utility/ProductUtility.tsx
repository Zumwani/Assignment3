import React, { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import { Product } from "../models/Product";
import { ProductList } from "../models/ProductList";

const url = "https://win22-webapi.azurewebsites.net/api/products/";

interface ProductContext {
  products: ProductList, 
  getProduct: (articleNumber: string) => Product | null;
}

export const Context = createContext<ProductContext | null>(null);

export const useProducts = () => {
  return useContext(Context);
}

export const getProduct = async (articleNumber:string) => {
  let result = await fetch(url + articleNumber);
  return await result.json();
}

type Param = {
  children: ReactNode
}

export const ProductProvider: React.FC<Param> = ({ children }) => {
  
    const [products, setProducts] = useState<ProductList>(
    {
      all: [], 
      featured: [], 
      sale1: [], 
      sale2: [], 
      latest: [], 
      bestSelling: [], 
      topReacted: [] 
    });
  
    const getProduct = (articleNumber: string): Product | null =>
      products.all.find(p => p.articleNumber === articleNumber || p.name.replaceAll(" ", "-").toLowerCase() === articleNumber) ?? null;
    
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
  
      const fetchAllProducts = async () => {
  
        let result = await fetch(url);
        let json = await result.json();
  
        setProducts({...products, 
          all: json, 
          featured: json.slice(0, 8), 
          sale1: json.slice(0, 4), 
          sale2: json.slice(0, 4), 
          latest: json.slice(0, 3), 
          bestSelling: json.slice(0, 3),
          topReacted: json.slice(0, 3)
        });
  
      }
      
      fetchAllProducts();
      forceUpdate();
  
    }, [setProducts, products]);

  return (
    <Context.Provider value={{ products, getProduct }}>
        {children}
    </Context.Provider>
  );

}

export const productURL = (product: Product) =>
  product == null ? null : "/product/" + product.name.replaceAll(" ", "-").toLowerCase();

export const categoryURL = (product: Product) =>
  product == null ? null : "/products/" + product.category.replaceAll(" ", "-").toLowerCase();
