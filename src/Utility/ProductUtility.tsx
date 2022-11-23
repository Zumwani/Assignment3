import React, { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import { CreateProduct, Product } from "../models/Product";
import { ProductList } from "../models/ProductList";

const url = "https://win22-webapi.azurewebsites.net/api/products/";

export interface ProductContext {
  products: ProductList, 
  getProduct: (articleNumber: string) => Product | null;
  createProduct: (product: CreateProduct) => void;
  readProduct: (articleNumber: number) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (product: Product|number) => void;
}

const Context = createContext<ProductContext | null>(null);

export const useProducts = () => useContext(Context);

export const getProduct = async (articleNumber:string) => {
  let result = await fetch(url + articleNumber);
  return await result.json();
}

type Param = {
  children: ReactNode
}

export const ProductProvider: React.FC<Param> = ({ children }) => {
  
  //#region Normal products

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
        
        // let result = await fetch(url);
        // let json = await result.json();
        
        // setProducts({...products, 
        //   all: json, 
        //   featured: json.slice(0, 8), 
        //   sale1: json.slice(0, 4), 
        //   sale2: json.slice(0, 4), 
        //   latest: json.slice(0, 3), 
        //   bestSelling: json.slice(0, 3),
        //   topReacted: json.slice(0, 3)
        // });
        
      }
      
      fetchAllProducts();
      forceUpdate();
      
    }, [setProducts, products]);
    
  //#endregion
  //#region Crud

  const baseURL = "http://localhost:5000/api/products/";

  const createProduct = async (product: CreateProduct) => {

    const result = await fetch(baseURL, {
      method: "post",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    if (result.status == 201)
        console.log("Product created:/n" + await result.json());
    else
        console.log("Product could not be created: " + result.status);

  }
  
  const readProduct = (articleNumber: number) => {
    return 200;
  }
  
  const updateProduct = (product: Product) => {
    return 200;
  }
  
  const deleteProduct = (product: Product|number) => {
    return 200;
  }
  
  //#endregion
    
  return (
    <Context.Provider value={{ products, getProduct, createProduct, readProduct, updateProduct, deleteProduct }}>
        {children}
    </Context.Provider>
  );

}

export const productURL = (product: Product) =>
  product == null ? null : "/product/" + product.name.replaceAll(" ", "-").toLowerCase();

export const categoryURL = (product: Product) =>
  product == null ? null : "/products/" + product.category.replaceAll(" ", "-").toLowerCase();
