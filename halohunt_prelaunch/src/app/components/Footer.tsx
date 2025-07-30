import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">HaloHunt</h3>
            <p className="mt-4 text-sm text-gray-600">
              Revolutionizing live commerce with real-time product tagging and seamless shopping experiences.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Platform</h3>
            <ul className="mt-4 space-y-2">
              {['Features', 'How It Works', 'Pricing', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              {['About Us', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Legal</h3>
            <ul className="mt-4 space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} HaloHunt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 