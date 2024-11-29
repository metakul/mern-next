import { allProducts } from "@/data/products";
// import { openCartModal } from "@/utlis/openCartModal";
// import { openCart } from "@/utlis/toggleCart";
import React, { useEffect, ReactNode } from "react";
import { useContext, useState } from "react";

interface Product {
  title: ReactNode;
  imgHoverSrc: any;
  imgSrc: any;
  isLookBookProduct: any;
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ContextProps {
  children: ReactNode;
}

interface ContextElement {
  cartProducts: Product[];
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  totalPrice: number;
  addProductToCart: (id: number, qty?: number) => void;
  isAddedToCartProducts: (id: number) => boolean;
  removeFromWishlist: (id: number) => void;
  addToWishlist: (id: number) => void;
  isAddedtoWishlist: (id: number) => boolean;
  quickViewItem: Product;
  wishList: number[];
  setQuickViewItem: React.Dispatch<React.SetStateAction<Product>>;
  quickAddItem: number;
  setQuickAddItem: React.Dispatch<React.SetStateAction<number>>;
  addToCompareItem: (id: number) => void;
  isAddedtoCompareItem: (id: number) => boolean;
  removeFromCompareItem: (id: number) => void;
  compareItem: number[];
  setCompareItem: React.Dispatch<React.SetStateAction<number[]>>;
}

const dataContext = React.createContext<ContextElement | undefined>(undefined);

export const useContextElement = () => {
  const context = useContext(dataContext);
  if (!context) {
    throw new Error("useContextElement must be used within a ContextProvider");
  }
  return context;
};

export default function Context({ children }: ContextProps) {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [wishList, setWishList] = useState<number[]>([1, 2, 3]);
  const [compareItem, setCompareItem] = useState<number[]>([1, 2, 3]);
  const [quickViewItem, setQuickViewItem] = useState<any>(allProducts[0]);
  const [quickAddItem, setQuickAddItem] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      return accumulator + product.quantity * product.price;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  const addProductToCart = (id: number, qty?: number) => {
    if (!cartProducts.some((elm) => elm.id === id)) {
      const product = allProducts.find((elm: { id: number; }) => elm.id === id);
      if (!product) return;
      const item: any = {
        ...product,
        quantity: qty ? qty : 1,
      };
      setCartProducts((prev) => [...prev, item]);
      // openCartModal();
      // openCart();
    }
  };

  const isAddedToCartProducts = (id: number) => {
    return cartProducts.some((elm) => elm.id === id);
  };

  const addToWishlist = (id: number) => {
    if (!wishList.includes(id)) {
      setWishList((prev) => [...prev, id]);
    } else {
      setWishList((prev) => prev.filter((elm) => elm !== id));
    }
  };

  const removeFromWishlist = (id: number) => {
    setWishList((prev) => prev.filter((elm) => elm !== id));
  };

  const addToCompareItem = (id: number) => {
    if (!compareItem.includes(id)) {
      setCompareItem((prev) => [...prev, id]);
    }
  };

  const removeFromCompareItem = (id: number) => {
    setCompareItem((prev) => prev.filter((elm) => elm !== id));
  };

  const isAddedtoWishlist = (id: number) => {
    return wishList.includes(id);
  };

  const isAddedtoCompareItem = (id: number) => {
    return compareItem.includes(id);
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartList") || "[]");
    if (items.length) {
      setCartProducts(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (items.length) {
      setWishList(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const contextElement: ContextElement = {
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    compareItem,
    setCompareItem,
  };

  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}