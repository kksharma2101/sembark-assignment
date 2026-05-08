import {
    createContext,
    useContext,
    useMemo,
    useState,
} from 'react';

import { Product } from '../types/Product';

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    totalItems: number;
    totalAmount: number;
}

const CartContext = createContext<
    CartContextType | undefined
>(undefined);

export const CartProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existingItem = prev.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );
            }

            return [
                ...prev,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    const totalItems = useMemo(() => {
        return cart.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }, [cart]);

    const totalAmount = useMemo(() => {
        return cart.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );
    }, [cart]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                totalItems,
                totalAmount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            'useCart must be used within CartProvider'
        );
    }

    return context;
};