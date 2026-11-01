import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, getCartTotal, getCartCount } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login?redirect=cart');
    } else {
      // In a real app, route to shipping/payment. For now, alert success.
      alert(`Proceeding to checkout for total $${getCartTotal()}`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/shop" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-md">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item._id} className="p-6 flex flex-col sm:flex-row shadow-sm hover:shadow transition items-center">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md bg-gray-100" />
                      <div className="ml-0 sm:ml-6 mt-4 sm:mt-0 flex-1 w-full">
                        <div className="flex justify-between">
                          <Link to={`/product/${item._id}`} className="text-lg font-bold text-gray-900 hover:text-blue-600 transition truncate">
                            {item.name}
                          </Link>
                          <p className="text-lg font-extrabold text-gray-900 ml-4">₹{item.price.toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 capitalize">{item.category}</p>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <span className="px-3 py-1 text-sm bg-gray-50 text-gray-600 border-r border-gray-300">Qty</span>
                            <select 
                              value={item.qty} 
                              onChange={(e) => addToCart(item, Number(e.target.value))}
                              className="block w-16 pl-2 py-1 bg-white focus:outline-none focus:ring-blue-500 font-medium rounded-r-md text-center"
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                              ))}
                            </select>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item._id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition"
                            title="Remove from cart"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({getCartCount()} items)</span>
                    <span className="font-medium text-gray-900">₹{getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-medium text-gray-900">$0.00</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-extrabold text-blue-600">₹{getCartTotal()}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-right">Includes all taxes and duties</p>
                </div>

                <button 
                  onClick={checkoutHandler}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
                >
                  Proceed to Checkout
                </button>
                
                {!userInfo && (
                   <p className="text-xs text-center text-gray-500 mt-4">
                     You will be asked to <Link to="/login?redirect=cart" className="text-blue-600 hover:underline">login or register</Link> on the next step.
                   </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
