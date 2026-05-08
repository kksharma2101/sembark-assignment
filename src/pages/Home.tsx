import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';

import { Product, SortOption, SORT_OPTIONS } from '../types/Product';
import LoadingState from '../components/LoadingState';
import { getProducts } from '../api/productApi';
import { ChevronDown } from 'lucide-react';


const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectRange, setSelectRange] = useState("Defualt");

    const selectedCategories: string[] = useMemo(() => {
        const raw = searchParams.get('categories');
        return raw ? raw.split(',') : [];
    }, [searchParams]);

    const selectedSort: SortOption = useMemo(() => {
        const raw = searchParams.get('sort') as SortOption | null;
        return SORT_OPTIONS.some((o) => o.value === raw) ? (raw as SortOption) : 'default';
    }, [searchParams]);

    // this function manage the multiple category
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

    // this function hlp to select range
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
        let rangeVal = ""
        if (sort === "default") {
            rangeVal = "Default"
        } else if (sort === "price-asc") {
            rangeVal = "Low to High"
        } else if (sort === "price-desc") {
            rangeVal = "High to Low"
        }
        setSelectRange(rangeVal)
        setOpen(false)
    };

    // Here is fetch the product
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
        <div className='max-w-7xl mx-auto px-4 pb-6'>
            <div className='flex gap-2'>
                <CategoryFilter
                    categories={categories}
                    selected={selectedCategories}
                    onSelect={handleSelectCategories}
                />
                <div className="relative">
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        className='flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium min-w-[160px] justify-between'
                    >
                        <span>{selectRange}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                    </button>
                    {
                        open &&
                        <div className='absolute z-10 mt-2 w-56 rounded-lg bg-white border border-gray-200 shadow-lg overflow-hidden'>
                            {SORT_OPTIONS.map((range) => {
                                return (
                                    <button
                                        key={range.value}
                                        onClick={() => handleSelectSort(range.value)}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm"
                                    >
                                        {range.label}
                                    </button>
                                );
                            })}
                        </div>
                    }
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div >
    );
};

export default Home;