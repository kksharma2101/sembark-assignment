import { api } from './axios';
import { Product } from '../types/Product';

export const getProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch products");
    }
};

export const getProductById = async (id: string): Promise<Product> => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Product is not fund");
    }
};