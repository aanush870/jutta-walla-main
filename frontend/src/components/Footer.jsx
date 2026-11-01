import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 tracking-tight">Juttawalla<span className="text-blue-500">.</span></h3>
            <p className="text-gray-400 text-sm">
              Premium shoes for every occasion. Step into comfort and style with our curated collection of top brands.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebook className="text-xl"/></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter className="text-xl"/></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram className="text-xl"/></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaYoutube className="text-xl"/></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/shop?category=Sneakers" className="hover:text-white transition">Sneakers</Link></li>
              <li><Link to="/shop?category=Sports Shoes" className="hover:text-white transition">Sports</Link></li>
              <li><Link to="/shop?category=Formal Shoes" className="hover:text-white transition">Formal</Link></li>
              <li><Link to="/shop?category=Casual Shoes" className="hover:text-white transition">Casual</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition">Shipping & Returns</Link></li>
              <li><Link to="/track" className="hover:text-white transition">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 w-full text-black rounded-l focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Juttawalla. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
