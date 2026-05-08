export interface Product {
    id: number;
    title: string;
    price: number;
    slug: string;
    description: string;
    images: string[];
    category: {
        id: number;
        name: string;
        image: string;
        slug: string;
    };
}

export interface ProductCardProps {
    product: Product;
}

export interface CategoryProps {
    categories: string[];
    selected: string[];
    onSelect: (category: string[]) => void;
}