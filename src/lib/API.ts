import axios from "axios";
import * as SecureStore from 'expo-secure-store';

let URL = "https://shopping-next-ivory.vercel.app";
let url = "http://192.168.45.174:3000"

export const API = axios.create({
 baseURL: `${URL}/api`,
 headers: {
  'Content-Type': 'application/json',
 },
});
   
API.interceptors.request.use(
 async (config) => {
  const token = await SecureStore.getItemAsync('shopping-token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
 },
 (error) => Promise.reject(error)
);