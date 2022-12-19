import React, { createContext, useContext, useEffect, useState } from "react";
import { CreateProduct, Product } from "../models/Product";
import { ProductList } from "../models/ProductList";
import { useUser } from "./UserUtility";
import { useMutation, gql } from '@apollo/client';
import { useLazyQuery } from "@apollo/client/react";

//#region Queries and mutations

const LIST_PRODUCTS_QUERY = gql
` query q($tag: String) {
    products(tag: $tag) { _id, name, price, tag, rating, description, imageName, category } 
}`

const LIST_TAGS_QUERY = gql
` query {
    tags { name } 
}`

const GET_PRODUCT_QUERY = gql
`
  query ReadProduct($ID: ID!) {
    product(id: $ID) { _id, name, price, tag, rating, description, imageName, category }
  }
`;

const CREATE_PRODUCT_QUERY = gql
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

const RESET_PRODUCTS_QUERY = gql
`
  mutation {
    resetAllProducts {
      _id
    }
  }
`;

//#endregion

export interface ProductContext {
  cachedProducts: ProductList, 
  listProducts: (tag?: string) => Promise<Product[]>;
  listTags: () => Promise<string[]>;
  getProduct: (_id: string) => Product | null;
  createProduct: (product: CreateProduct) => Promise<string>;
  readProduct: (_id: string) => Promise<Product>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (product: Product|string|null) => Promise<void>;
  resetProducts: () => Promise<boolean>;
}

const Context = createContext<ProductContext | null>(null);

export const useProducts = () => useContext(Context);

export const ProductProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  
  const user = useUser();

  //#region Crud

  const [listProductsQuery] = useLazyQuery(LIST_PRODUCTS_QUERY);
  const [listTagsQuery] = useLazyQuery(LIST_TAGS_QUERY);

  const [createProductMutation] = useMutation(CREATE_PRODUCT_QUERY, {
    refetchQueries: [{ query: LIST_PRODUCTS_QUERY }],
    context: {
      headers: {
        "Authorization": `Bearer ${user?.user?.token}`
      }
    }
  });

  const [readProductQuery] = useLazyQuery(GET_PRODUCT_QUERY);

  const [updateProductMutation] = useMutation(UPDATE_PRODUCT_QUERY, {
    refetchQueries: [{ query: LIST_PRODUCTS_QUERY }],
    context: {
      headers: {
        "Authorization": `Bearer ${user?.user?.token}`
      }
    }
  });

  const [deleteProductMutation] = useMutation(DELETE_PRODUCT_QUERY, {
    refetchQueries: [{ query: LIST_PRODUCTS_QUERY }],
    context: {
      headers: {
        "Authorization": `Bearer ${user?.user?.token}`
      }
    }
  });

  const [resetProductsMutation] = useMutation(RESET_PRODUCTS_QUERY, {
    refetchQueries: [{ query: LIST_PRODUCTS_QUERY }],
    context: {
      headers: {
        "Authorization": `Bearer ${user?.user?.token}`
      }
    }
  });
  
  const listProducts = async (tag?: string) => {
    
    const result = await listProductsQuery({ variables: { tag: tag } });
    if (result.error)
      throw result.error;

      console.log(result.data);
    return result.data.products ?? [];

  }
  
  const listTags = async () => {
    
    const result = await listTagsQuery();
    if (result.error)
      throw result.error;

    return result.data.tags.map((t:any) => t.name) ?? [];

  }
  
  const createProduct = async (product: CreateProduct) => {

   const result = await createProductMutation({ variables: {
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

    const result = await readProductQuery({ variables: { ID: _id } });
    if (result.error)
      throw result.error;

    return result.data.product;
  
  }
  
  const updateProduct = async (product: Product) => {

    const result = await updateProductMutation({ variables: {
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
    const result = await deleteProductMutation({ variables: { ID: _id }});

    if (result.errors)
      throw result.errors;

    return result.data.removeProduct.name;

  }

  const resetProducts = async () => {
    
    const result = await resetProductsMutation();

    if (result.errors)
      throw result.errors;

    return result.errors == null;

  }

  //#endregion
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
  
        const allProducts = await listProducts(); 
        const featured = await listProducts("featured");
        const flashSale = await listProducts("flash-sale");
        const latest = await listProducts("latest");
        const bestSelling = await listProducts("best-selling");
        const topReacted = await listProducts("top-reacted");
        
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

  return (
    <Context.Provider value={{ cachedProducts, getProduct, listProducts, listTags, createProduct, readProduct, updateProduct, deleteProduct, resetProducts }}>
        {children}
    </Context.Provider>
  );

}

export const productURL = (product: Product) =>
  product == null ? null : "/product/" + product.name.replaceAll(" ", "-").toLowerCase();

export const categoryURL = (product: Product) =>
  product == null ? null : "/products/" + product.category.replaceAll(" ", "-").toLowerCase();
