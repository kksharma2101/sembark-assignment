import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
    const { totalItems } = useCart();

    return (
        <main className="w-full">
            <header className='fixed top-0 left-0 w-full z-50 bg-white px-2 md:px-6 py-4'>
                <div className='max-w-7xl mx-auto flex justify-between items-center'>
                    <Link to='/' className='text-sm py-2 px-4 text-white rounded-full bg-blue-600 font-bold'>
                        {/* <img src='/sembark_logo.png' width={120} height={120} /> */}Sem-Ecommerce
                    </Link>

                    <Link to='/cart' className='font-semibold relative'>
                        <ShoppingCart color='black' />
                        <span className="absolute -right-1 -top-4 text-orange-400 ">{totalItems > 0 && totalItems}</span>
                    </Link>
                </div>
            </header>

            <div className="pt-20" />
        </main>
    );
};

export default Header;