import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import { getProductById } from '../api/productApi';
import NotFound from '../components/NotFound';
import LoadingState from '../components/LoadingState';

const ProductDetail = () => {
    const { id } = useParams();

    const { addToCart } = useCart();

    const [product, setProduct] =
        useState<Product | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id as string)

                setProduct(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <LoadingState />
        );
    }

    if (!product) {
        return (
            <NotFound text='Product Not Found?' />
        );
    }

    return (
        <div className='max-w-6xl mx-auto p-6'>
            <div className='grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-md p-6'>
                <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className='w-full h-[500px] object-cover rounded-xl'
                />

                <div>
                    <h1 className='text-4xl font-bold mb-4'>
                        {product.title}
                    </h1>

                    <p className='text-sm text-gray-500 mb-2'>
                        {product.category?.name}
                    </p>

                    <p className='text-gray-600 mb-6'>
                        {product.description}
                    </p>

                    <p className='text-3xl mb-6'>
                        ${product.price}
                    </p>

                    <button
                        onClick={() => addToCart(product)}
                        className='bg-black text-white px-6 py-2 rounded-xl hover:bg-black/80'
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;