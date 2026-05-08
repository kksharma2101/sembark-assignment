import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';

import { Product } from '../types/Product';
import LoadingState from '../components/LoadingState';
import { getProducts } from '../api/productApi';

// Supported sort options
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A–Z' },
    { value: 'name-desc', label: 'Name: Z–A' },
];

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategories: string[] = useMemo(() => {
        const raw = searchParams.get('categories');
        return raw ? raw.split(',').filter(Boolean) : [];
    }, [searchParams]);

    const selectedSort: SortOption = useMemo(() => {
        const raw = searchParams.get('sort') as SortOption | null;
        return SORT_OPTIONS.some((o) => o.value === raw) ? (raw as SortOption) : 'default';
    }, [searchParams]);

    const handleSelectCategories = (categories: string[]) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (categories.length === 0) {
                next.delete('categories');
            } else {
                next.set('categories', categories.join(','));
            }
            return next;
        });
    };

    const handleSelectSort = (sort: SortOption) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (sort === 'default') {
                next.delete('sort');
            } else {
                next.set('sort', sort);
            }
            return next;
        });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = useMemo(() => {
        return Array.from(new Set(products.map((p) => p.category?.name).filter(Boolean))) as string[];
    }, [products]);

    const filteredProducts = useMemo(() => {
        const filtered =
            selectedCategories.length === 0
                ? products
                : products.filter((p) => {
                    const name = p.category?.name;
                    return name !== undefined && selectedCategories.includes(name);
                });

        const sorted = [...filtered];
        switch (selectedSort) {
            case 'price-asc':
                sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
                break;
            case 'price-desc':
                sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
                break;
            case 'name-asc':
                sorted.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''));
                break;
            case 'name-desc':
                sorted.sort((a, b) => (b.title ?? '').localeCompare(a.title ?? ''));
                break;
            default:
                break;
        }

        return sorted;
    }, [products, selectedCategories, selectedSort]);

    if (loading) {
        return <LoadingState />;
    }

    return (
        <div className='max-w-7xl mx-auto px-4 py-6'>
            {/* Filters + Sort row */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
                <CategoryFilter
                    categories={categories}
                    selected={selectedCategories}
                    onSelect={handleSelectCategories}
                />

                {/* Sort dropdown */}
                <select
                    value={selectedSort}
                    onChange={(e) => handleSelectSort(e.target.value as SortOption)}
                    className='self-start sm:self-auto px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black'
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Product grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;