import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Product } from "../models/Product";
import { ProductList } from "../models/ProductList";

const url = "https://win22-webapi.azurewebsites.net/api/products/";

export const ProductContext = createContext(null);

export const useProducts = () => {
  return useContext(ProductContext);
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
  
    const getProduct = (articleNumber: string) =>
      products.all.find(p => p.articleNumber == articleNumber || p.name.replaceAll(" ", "-").toLowerCase() == articleNumber);

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
  
    }, [setProducts]);

  return (
    <ProductContext.Provider value={{ products, getProduct } as any}>
        {children}
    </ProductContext.Provider>
  );

}

export const productURL = (product:Product) =>
  product == null ? null : "/product/" + product.name.replaceAll(" ", "-").toLowerCase();

export const categoryURL = (product:Product) =>
  product == null ? null : "/products/" + product.category.replaceAll(" ", "-").toLowerCase();
