import GoBack from '../components/Goback';
import NotFound from '../components/NotFound';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const {
        cart,
        removeFromCart,
        totalAmount,
        totalItems,
    } = useCart();

    return (
        <div className='max-w-7xl mx-auto px-4'>
            <GoBack href='/' />

            {
                cart.length > 0 ?
                    <div className='grid lg:grid-cols-3 gap-6'>
                        {/* Cart Items */}
                        <div className='lg:col-span-2 space-y-4'>
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className='bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row gap-4'
                                >
                                    <img
                                        src={item?.images[0]}
                                        alt={item.title}
                                        className='w-full md:w-40 h-full md:h-44 object-cover rounded-xl'
                                    />

                                    <div className='flex-1'>
                                        <h2 className='text-lg font-bold mb-2'>
                                            {item.title}
                                        </h2>

                                        <p className='text-gray-600 mb-3'>
                                            {item.description}
                                        </p>

                                        <div className='flex gap-4 text-sm font-medium'>
                                            <p>Category: {item.category.name}</p>

                                            <p>Quantity: {item.quantity}</p>
                                        </div>

                                        <div className='mt-4 flex items-center justify-between'>
                                            <p className='text-2xl font-bold'>
                                                ${item.price * item.quantity}
                                            </p>

                                            <button
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                                className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className='bg-white rounded-2xl shadow-md p-6 h-fit'>
                            <h2 className='text-2xl font-bold mb-6'>
                                Order Summary
                            </h2>

                            <div className='space-y-4 border-b pb-4'>
                                <div className='flex justify-between'>
                                    <span>Total Items</span>
                                    <span>{totalItems}</span>
                                </div>

                                <div className='flex justify-between'>
                                    <span>Subtotal</span>
                                    <span>${totalAmount}</span>
                                </div>

                                <div className='flex justify-between'>
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                            </div>

                            <div className='flex justify-between items-center mt-6 text-2xl font-bold'>
                                <span>Total Amount</span>
                                <span>${totalAmount}</span>
                            </div>

                            <button className='w-full bg-black text-white py-3 rounded-xl mt-6 text-lg font-semibold hover:bg-black/80'>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                    :
                    <NotFound text='Your cart is empty' />

            }
        </div>
    );
};

export default Cart;