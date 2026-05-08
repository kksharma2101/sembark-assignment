import { ShoppingCart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { headerNavItems } from '../types/Product';
import { useState } from 'react';

const Header = () => {
    const { totalItems } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <main className="w-full">
            <header className='fixed top-0 left-0 w-full z-50 bg-white px-2 md:px-6 py-4'>
                <div className='max-w-7xl mx-auto flex justify-between items-center'>
                    <Link to='/' className='text-sm py-2 px-4 text-white rounded-full bg-blue-600 font-bold'>
                        Sem-Ecommerce
                    </Link>

                    <div className="flex items-center gap-5">
                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex items-center gap-3">
                            {
                                headerNavItems.map((item) => (
                                    <Link to={item.href} key={item.value}>
                                        <li className="font-bold cursor-pointer hover:text-blue-500">{item.label}</li>
                                    </Link>
                                ))
                            }
                        </ul>

                        <Link to='/cart' className='font-semibold relative'>
                            <ShoppingCart color='black' />
                            <span className="absolute -right-1 -top-4 text-orange-400">{totalItems > 0 && totalItems}</span>
                        </Link>

                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden fixed inset-0 top-14 bg-white z-40 h-fit shadow-sm">
                        <div className="flex flex-col p-6 space-y-4">
                            {headerNavItems.map((item) => (
                                <Link
                                    to={item.href}
                                    key={item.value}
                                    onClick={closeMenu}
                                    className="py-3 px-4 font-bold text-lg hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            <div className="pt-24" />
        </main>
    );
};

export default Header;