import React, { createContext, useContext, useEffect, useState } from "react";
import { CreateProduct, Product } from "../models/Product";
import { ProductList } from "../models/ProductList";
import { useUser } from "./UserUtility";
import { useQuery, useMutation, gql } from '@apollo/client';
import { useLazyQuery } from "@apollo/client/react";

export interface ProductContext {
  cachedProducts: ProductList, 
  list: () => Promise<Product[]>;
  getProduct: (_id: string) => Product | null;
  createProduct: (product: CreateProduct) => Promise<string>;
  readProduct: (_id: string) => Promise<Product>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (product: Product|string|null) => Promise<void>;
}

const Context = createContext<ProductContext | null>(null);

export const useProducts = () => useContext(Context);

export const ProductProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  
  const baseURL = "http://localhost:5000/api/";
  const productURL = baseURL + "products/";
  const tagsURL = productURL + "tags/";
  const GET_PRODUCTS_QUERY = gql`{ products { _id, name, price, tag, rating, description, imageName, category } }`

  const GET_PRODUCT_QUERY = gql
  `
    query ReadProduct($ID: ID!) {
      product(id: $ID) { _id, name, price, tag, rating, description, imageName, category }
    }
  `;

  const ADD_PRODUCT_QUERY = gql
  `
    mutation AddProduct($name: String!, $price: String!, $category: String!, $tag: String, $rating: Int!, $description: String!, $imageName: String!) {
      addProduct(name: $name, price: $price, category: $category, tag: $tag, rating: $rating, description: $description, imageName: $imageName) {
        name
      }
    }
  `;

  const UPDATE_PRODUCT_QUERY = gql
  `
    mutation UpdateProduct($ID: ID!, $name: String, $price: String, $category: String, $tag: String, $rating: Int, $description: String, $imageName: String) {
      updateProduct(ID: $ID, name: $name, price: $price, category: $category, tag: $tag, rating: $rating, description: $description, imageName: $imageName) {
        name
      }
    }
  `;
  
  const DELETE_PRODUCT_QUERY = gql
  `
    mutation RemoveProduct($ID: ID!) {
      removeProduct(ID: $ID) {
        _id
      }
    }
  `;
  
  const user = useUser();

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
  
  const getProduct = (_id: string): Product | null =>
    cachedProducts.all.find(p => p._id === _id || p.name.replaceAll(" ", "-").toLowerCase() === _id) ?? null;
  
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

  const productsQuery:any = useQuery(GET_PRODUCTS_QUERY);

  const [addProduct] = useMutation(ADD_PRODUCT_QUERY, {
    refetchQueries: [
      { query: GET_PRODUCTS_QUERY },
      "GetProducts"
    ]
  });

  const [_updateProduct] = useMutation(UPDATE_PRODUCT_QUERY, {
    refetchQueries: [
      { query: GET_PRODUCTS_QUERY },
      "GetProducts"
    ]
  });

  const [_readProduct] = useLazyQuery(GET_PRODUCT_QUERY);

  const [removeProduct] = useMutation(DELETE_PRODUCT_QUERY, {
    refetchQueries: [
      { query: GET_PRODUCTS_QUERY },
      "GetProducts"
    ]
  });

  const sleep = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

  const list = async () => {
    
    while (productsQuery.loading)
      await sleep(100);

    if (productsQuery.error)
      throw productsQuery.error;

    return productsQuery.data.products ?? [];

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

   const result = await addProduct({ variables: {
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      tag: product.tag,
      rating: product.rating,
      description: product.description,
      imageName: product.imageName
    }});

    if (result.errors)
      throw result.errors;

    return result.data.addProduct.name;
    
  }
  
  const readProduct = async (_id: string) => {
    
    if (!_id)
      throw new Error("Article number cannot be null.");

    const result = await _readProduct({ variables: { ID: _id } });
    if (result.error)
      throw result.error;

    return result.data.product;
  
  }
  
  const updateProduct = async (product: Product) => {

    const result = await _updateProduct({ variables: {
      ID: product._id,
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      tag: product.tag,
      rating: product.rating,
      description: product.description,
      imageName: product.imageName
    }});

    if (result.errors)
      throw result.errors;

    return result.data.updateProduct.name;

  }
  
  const deleteProduct = async (product: Product|string|null) => {
    
    const _id = product as string ?? (product as Product)?._id;
    const result = await removeProduct({ variables: { ID: _id }});

    if (result.errors)
      throw result.errors;

    return result.data.removeProduct.name;

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
