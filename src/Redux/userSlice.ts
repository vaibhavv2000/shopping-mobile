"use client";

import {createSlice,type PayloadAction} from "@reduxjs/toolkit";
import type {user} from "../utils/types";

interface state {
 showAuthModal: boolean;
 showSidebar: boolean;
 isDarkMode: boolean;
 user: user;
};

const user = {id: -1, email: "", name: ""};

const initialState: state = {
 showAuthModal: false,
 isDarkMode: false,
 showSidebar: false,
 user,
};

export const userSlice = createSlice({
 name: "user",
 initialState,
 reducers: {
  login: (state, {payload}: PayloadAction<user>) => {
   state.user = payload; 
  },
  logout: (state) => {
   state.user = user; 
  },
  toggleAuthModal: (state) => {
   state.showAuthModal = !state.showAuthModal; 
  },
  toggleSidebar: (state) => {
   state.showSidebar = !state.showSidebar; 
  },
  toggleDarkMode: (state)  => {
   state.isDarkMode = !state.isDarkMode;
  },
 },
});

export const {
 login,
 logout,
 toggleAuthModal,
 toggleDarkMode,
 toggleSidebar, 
} = userSlice.actions;

export default userSlice.reducer;