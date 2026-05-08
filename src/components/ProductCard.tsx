import { Link } from 'react-router-dom';
import { ProductCardProps } from '../types/Product';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();

    return (
        <div className='bg-white rounded-2xl shadow-md overflow-hidden '>
            <img
                src={product.images?.[0]}
                alt={product.title}
                className='h-56 w-full object-cover '
            />

            <div className='p-3'>
                <h2 className='text-lg font-bold line-clamp-1'>
                    {product.title}
                </h2>

                <div className="flex items-center justify-between py-2">
                    <p className='text-lg'>
                        ${product.price}
                    </p>

                    <p className='text-gray-500 text-sm line-clamp-1'>
                        {product.category?.name}
                    </p>
                </div>

                <div className='flex items-center justify-between py-3'>
                    <Link
                        to={`/product/${product.id}`}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg'
                    >
                        View
                    </Link>

                    <button
                        onClick={() => addToCart(product)}
                        className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg'
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;