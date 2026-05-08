import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { headerNavItems } from '../types/Product';

const Header = () => {
    const { totalItems } = useCart();

    return (
        <main className="w-full">
            <header className='fixed top-0 left-0 w-full z-50 bg-white px-2 md:px-6 py-4'>
                <div className='max-w-7xl mx-auto flex justify-between items-center'>
                    <Link to='/' className='text-sm py-2 px-4 text-white rounded-full bg-blue-600 font-bold'>
                        {/* <img src='/sembark_logo.png' width={120} height={120} /> */}Sem-Ecommerce
                    </Link>

                    <div className="flex items-center gap-5">
                        <ul className="flex items-center gap-3">
                            {
                                headerNavItems.map((item) => (
                                    <Link to={item.href}>
                                        <li className="font-bold cursor-pointer hover:text-blue-500" key={item.value}>{item.label}</li>
                                    </Link>
                                ))
                            }
                        </ul>
                        <Link to='/cart' className='font-semibold relative'>
                            <ShoppingCart color='black' />
                            <span className="absolute -right-1 -top-4 text-orange-400 ">{totalItems > 0 && totalItems}</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="pt-20" />
        </main>
    );
};

export default Header;