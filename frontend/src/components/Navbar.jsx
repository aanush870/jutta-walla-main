import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.search.value;
    if (keyword.trim()) {
      navigate(`/shop?keyword=${keyword}`);
    } else {
      navigate('/shop');
    }
  };

  const logoutHandler = () => {
    logout();
    navigate('/');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
              Juttawalla.
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/shop" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">Shop All</Link>
            <Link to="/shop?category=Sneakers" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">Sneakers</Link>
            <Link to="/shop?category=Sports Shoes" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">Sports</Link>
            <Link to="/shop?category=Formal Shoes" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">Formal</Link>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden lg:flex relative">
              <input
                type="text"
                name="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 transition-all duration-300 focus:w-64"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </form>

            <Link to="/cart" className="text-gray-700 hover:text-blue-600 relative">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="relative group hover-trigger">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 focus:outline-none">
                  <FaUser className="text-xl" />
                  <span className="hidden sm:block text-sm font-medium">{userInfo.name.split(' ')[0]}</span>
                </button>
                <div className="hover-target hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                <FaUser className="text-xl" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
