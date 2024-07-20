import axios from "axios";

let URL = "https://shopping-next-ivory.vercel.app";

export const API = axios.create({
 baseURL: `${URL}/api`,
//  withCredentials: true,
});
