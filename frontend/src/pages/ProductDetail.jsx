import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, qty);
      navigate('/cart');
    }
  };

  if (loading) return <div className="min-h-screen pt-20 text-center text-gray-500">Loading product details...</div>;
  if (!product) return <div className="min-h-screen pt-20 text-center text-red-500">Product not found.</div>;

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="text-blue-600 hover:text-blue-800 flex items-center mb-8 font-medium">
          &larr; Back to Shop
        </Link>
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Product Image */}
          <div className="md:w-1/2 rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover max-h-[600px] hover:scale-105 transition duration-700" 
            />
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 flex flex-col pt-4">
            <div className="mb-2">
              <span className="text-sm font-bold tracking-widest text-blue-600 uppercase">{product.brand}</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-gray-500 uppercase">{product.category}</span>
            </div>
            
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center text-yellow-400 text-xl mr-2">
                {'★'.repeat(Math.round(product.rating))}
                <span className="text-gray-300">{'★'.repeat(5 - Math.round(product.rating))}</span>
              </div>
              <p className="text-sm font-medium text-blue-600 capitalize break-words">{product.numReviews} custom reviews</p>
            </div>

            <p className="text-3xl font-extrabold text-gray-900 mb-8">₹{product.price.toFixed(2)}</p>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
            </div>

            <div className="border-t border-gray-200 pt-8 mb-8">
              <div className="flex items-center justify-between font-medium mb-4">
                <span className="text-gray-700">Status:</span>
                <span className={product.countInStock > 0 ? "text-green-600" : "text-red-600"}>
                  {product.countInStock > 0 ? `In Stock (${product.countInStock})` : 'Out of Stock'}
                </span>
              </div>

              {product.countInStock > 0 && (
                <div className="flex items-center justify-between font-medium">
                  <span className="text-gray-700">Quantity:</span>
                  <select 
                    value={qty} 
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="block w-24 pl-3 pr-10 py-2 border-gray-300 bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className={`w-full py-4 rounded-xl text-lg font-bold shadow-lg transition duration-300 ${
                product.countInStock === 0 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30'
              }`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
