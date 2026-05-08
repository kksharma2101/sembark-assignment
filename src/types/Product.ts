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

// there is product sorting types
export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Low to High' },
    { value: 'price-desc', label: 'High to Low' },
];

export const headerNavItems = [
    { label: "Home", href: "/", value: "home" },
    { label: "Services", href: "/", value: "services" },
    { label: "Products", href: "/", value: "products" },
    { label: "About", href: "/", value: "about" },
]

export interface GoBackButtonProps {
    href?: string;
    className?: string;
    containerClassName?: string;
}