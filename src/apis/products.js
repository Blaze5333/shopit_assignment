import axiosInstance from "./axios";
export const getProducts=()=>axiosInstance.get('products')