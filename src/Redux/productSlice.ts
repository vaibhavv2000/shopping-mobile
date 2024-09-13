"use client";

import {type PayloadAction,createSelector,createSlice} from "@reduxjs/toolkit";
import type {product} from "../utils/types";
import type {RootState} from "../lib/store";

interface state {
 products: product[];
 orderHistory: product[];
 myOrders: product[];
 wishlist: product[];
};

const initialState: state = {
 products: [],
 orderHistory: [],
 wishlist: [],
 myOrders: [],
};

export const productSlice = createSlice({
 name: "product",
 initialState,
 reducers: {
  addProducts: (state, {payload}: PayloadAction<product[]>) => {
   state.products = payload;
  },
  addDetails: (state, {payload}: PayloadAction<product[]>) => {
   const filter = (category: product["category"]) => payload.filter(item => item.category === category);
   state.orderHistory = filter("history");
   state.wishlist = filter("wish");
   state.myOrders = filter("order");
  },
  addToWishlist: (state,{payload}) => {
   state.wishlist.push(payload);
  },
  removeFromWishlist: (state,{payload}) => {
   state.wishlist = state.wishlist.filter(({id}) => id !== payload);
  },
  addToBag: (state, {payload}) => {
   state.myOrders.push(payload);
  },
  removeFromBag: (state, {payload}) => {
   state.myOrders = state.myOrders.filter(({id}) => id !== payload);
  },
  changeQuantity: (state, {payload}) => {
   const {opt, id} = payload as {opt: "incr" | "decr"; id: number};
   const index = state.myOrders.findIndex(item => item.id === id);
 
   if(opt === "incr") state.myOrders[index].quantity += 1;
   if(opt === "decr" && state.myOrders[index].quantity > 1) {
    state.myOrders[index].quantity -= 1;
   };
  },
  emptyBag: (state) => {
   state.myOrders = [];
  },
  addToHistory: (state,{payload}: PayloadAction<product[]>) => {
   state.orderHistory = [...state.orderHistory, ...payload];
  },
  emptyData: (state) => {
   state.myOrders = [];
   state.orderHistory = [];
   state.wishlist = []; 
  },
 },
});

export const {
 addProducts,
 addDetails,
 addToWishlist,
 removeFromWishlist,
 addToBag,
 removeFromBag,
 emptyBag,
 addToHistory,
 changeQuantity,
 emptyData
} = productSlice.actions;

export default productSlice.reducer;

const selectSelf = (state: RootState) => state.product.products;
export const memoizedProducts = createSelector(selectSelf,(state: any) => [...state]);