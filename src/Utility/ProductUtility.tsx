import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { CreateProduct, Product } from "../models/Product";
import { ProductList } from "../models/ProductList";

const url = "https://win22-webapi.azurewebsites.net/api/products/";

export interface ProductContext {
  products: ProductList, 
  getProducts: () => Promise<Product[]>;
  getProduct: (articleNumber: string) => Product | null;
  createProduct: (product: CreateProduct) => Promise<Product>;
  readProduct: (articleNumber: string) => Promise<Product>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (product: Product|string|null) => Promise<void>;
}

const Context = createContext<ProductContext | null>(null);

export const useProducts = () => useContext(Context);

export const getProduct = async (articleNumber:string) => {
  let result = await fetch(url + articleNumber);
  return await result.json();
}

export const ProductProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  
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
    
    let result = await fetch(baseURL, {
      method: "post",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    if (result.status == 201)
      return await result.json() as Product;
    else
      throw new Error("The product could not be created.");


  }
  
  const readProduct = async (articleNumber: string) => {
    
    if (!articleNumber)
      throw new Error("Article number cannot be null.");

    let result = await fetch(baseURL + articleNumber, {
      method: "get"
    });

    if (result.status == 200)
      return await result.json() as Product;
    else
      throw new Error("The product '" + articleNumber + "' could not be found.");

  }
  
  const updateProduct = async (product: Product) => {

    let result = await fetch(baseURL + product.articleNumber, {
      method: "put",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    if (result.status !== 200)
      throw new Error("Product '" + product.articleNumber + "' could not be updated.");

  }
  
  const deleteProduct = async (product: Product|string|null) => {
    
    const articleNumber = product as string ?? (product as Product)?.articleNumber;

    let result = await fetch(baseURL + articleNumber, {
      method: "delete"
    });
    
    if (result.status !== 204)
      throw new Error("Product '" + articleNumber + "' could not be deleted.");

  }

  const getProducts = async () => {
    
    let result = await fetch(baseURL, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },
    });

    return await result.json();

  }
  
  //#endregion
    
  return (
    <Context.Provider value={{ products, getProduct, getProducts, createProduct, readProduct, updateProduct, deleteProduct }}>
        {children}
    </Context.Provider>
  );

}

export const productURL = (product: Product) =>
  product == null ? null : "/product/" + product.name.replaceAll(" ", "-").toLowerCase();

export const categoryURL = (product: Product) =>
  product == null ? null : "/products/" + product.category.replaceAll(" ", "-").toLowerCase();
