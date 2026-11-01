import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setFeaturedProducts(data.slice(0, 4)); // Show top 4 products
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=2000"
            alt="Shoes background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Step Into <br/><span className="text-blue-500">Excellence</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-lg">
              Discover the perfect blend of comfort, durability, and style. Our premium collection is designed to elevate your everyday journey.
            </p>
            <div className="flex space-x-4">
              <Link to="/shop" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30">
                Shop Now
              </Link>
              <Link to="/shop?category=Sneakers" className="bg-transparent border border-gray-300 text-white hover:bg-gray-800 font-semibold py-3 px-8 rounded-full transition duration-300">
                View Sneakers
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Preview */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Shop by Category</h2>
            <div className="mt-2 w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Sneakers', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600' },
              { name: 'Sports Shoes', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600' },
              { name: 'Formal Shoes', img: 'https://images.unsplash.com/photo-1614252339475-531eba835eb1?auto=format&fit=crop&q=80&w=600' },
              { name: 'Casual Shoes', img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600' }
            ].map((cat, idx) => (
              <Link to={`/shop?category=${cat.name}`} key={idx} className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-64">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                    <span className="text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 inline-block mt-2">Explore &rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Trending Now</h2>
              <p className="mt-2 text-gray-600">Our most popular shoes right now</p>
            </div>
            <Link to="/shop" className="text-blue-600 font-semibold hover:text-blue-800 transition hidden sm:block">View All Products &rarr;</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? featuredProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden group">
                <div className="relative h-60 bg-gray-200 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 text-xs font-bold rounded shadow text-gray-800">
                    ★ {product.rating.toFixed(1)}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-blue-600 font-bold tracking-wide uppercase mb-1">{product.category}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-extrabold text-gray-900">₹{product.price.toFixed(2)}</span>
                    <span className="bg-gray-100 text-gray-800 p-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-4 text-center py-10 text-gray-500">Loading featured products...</div>
            )}
          </div>
          <div className="mt-8 text-center sm:hidden">
             <Link to="/shop" className="text-blue-600 font-semibold hover:text-blue-800 transition">View All Products &rarr;</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
