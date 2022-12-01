import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { CreateProduct, Product } from "../models/Product";
import { ProductList } from "../models/ProductList";

export interface ProductContext {
  cachedProducts: ProductList, 
  list: () => Promise<Product[]>;
  getProduct: (articleNumber: string) => Product | null;
  createProduct: (product: CreateProduct) => Promise<Product>;
  readProduct: (articleNumber: string) => Promise<Product>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (product: Product|string|null) => Promise<void>;
}

const Context = createContext<ProductContext | null>(null);

export const useProducts = () => useContext(Context);

export const ProductProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  
  const baseURL = "http://localhost:5000/api/";
  const productURL = baseURL + "products/";
  const tagsURL = baseURL + "tags/";

  //#region Cached products

  const [cachedProducts, setCachedProducts] = useState<ProductList>(
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
    cachedProducts.all.find(p => p.articleNumber === articleNumber || p.name.replaceAll(" ", "-").toLowerCase() === articleNumber) ?? null;
  
  useEffect(() => {
    
    const getProducts = async () => {

      const allProducts = await list(); 
      const featured = await listTag("featured");
      const flashSale = await listTag("flash-sale");
      const latest = await listTag("latest");
      const bestSelling = await listTag("best-selling");
      const topReacted = await listTag("top-reacted");

      setCachedProducts({
        all: allProducts,
        featured: featured.slice(0, 8),
        sale1: flashSale.slice(0, 3),
        sale2: flashSale.slice(3, 8),
        latest: latest.slice(0, 8),
        bestSelling: bestSelling.slice(0, 8),
        topReacted: topReacted.slice(0, 8),
      });

    }

    getProducts();

  }, []);
    
  //#endregion
  //#region Crud

  const list = async () => {
    
    let result = await fetch(productURL, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },
    });

    return (await result.json() as Product[]) ?? [];

  }
  
  const listTag = async (tag: string) => {
    
    let result = await fetch(tagsURL + tag, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },
    });

    return (await result.json() as Product[]) ?? [];

  }
  
  const createProduct = async (product: CreateProduct) => {
    
    let result = await fetch(productURL, {
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

    let result = await fetch(productURL + articleNumber, {
      method: "get"
    });

    if (result.status == 200)
      return await result.json() as Product;
    else
      throw new Error("The product '" + articleNumber + "' could not be found.");

  }
  
  const updateProduct = async (product: Product) => {

    let result = await fetch(productURL + product.articleNumber, {
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

    let result = await fetch(productURL + articleNumber, {
      method: "delete"
    });
    
    if (result.status !== 204)
      throw new Error("Product '" + articleNumber + "' could not be deleted.");

  }

  //#endregion
    
  return (
    <Context.Provider value={{ cachedProducts, getProduct, list, createProduct, readProduct, updateProduct, deleteProduct }}>
        {children}
    </Context.Provider>
  );

}

export const productURL = (product: Product) =>
  product == null ? null : "/product/" + product.name.replaceAll(" ", "-").toLowerCase();

export const categoryURL = (product: Product) =>
  product == null ? null : "/products/" + product.category.replaceAll(" ", "-").toLowerCase();
