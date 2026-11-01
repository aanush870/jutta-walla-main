import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('newest');
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || '';
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `/api/products?sort=${sort}`;
        if (category) url += `&category=${category}`;
        if (keyword) url += `&keyword=${keyword}`;
        
        const { data } = await axios.get(url);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, [category, keyword, sort]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              {keyword ? `Search Results for "${keyword}"` : category ? category : 'All Shoes'}
            </h1>
            <p className="mt-1 text-sm text-gray-500">{products.length} products found</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group">
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 text-xs font-bold rounded shadow uppercase tracking-wide">
                  {product.brand}
                </div>
                <div className="absolute top-3 right-3 bg-white px-2 py-1 text-xs font-bold rounded shadow text-gray-800 flex items-center">
                   ★ {product.rating.toFixed(1)}
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between h-40">
                <div>
                  <p className="text-xs text-blue-600 font-bold tracking-wide uppercase mb-1">{product.category}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-blue-600 font-semibold group-hover:underline">View details</span>
                </div>
              </div>
            </Link>
          ))}
          {products.length === 0 && (
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center py-20">
              <h3 className="text-xl text-gray-600">No products found matching your criteria.</h3>
              <Link to="/shop" className="mt-4 inline-block text-blue-600 hover:text-blue-800">Clear filters</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
