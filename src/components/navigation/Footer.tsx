import Link from 'next/link';

export default function Footer() {
  const footerLinks = {
    product: [
      { name: 'Chat', href: '/chat' },
      { name: 'Resources', href: '/resources' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Emergency Support', href: '/emergency' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Privacy & Safety', href: '/privacy' },
      { name: 'Contact', href: '/contact' },
      { name: 'Help Center', href: '/help' },
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Phases
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your empathetic AI companion for mental wellness. Available 24/7 to provide 
              support, resources, and a safe space to talk.
            </p>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.017 0C8.396 0 7.932.013 6.706.072 5.48.131 4.65.333 3.927.63a5.98 5.98 0 00-2.16 1.407A5.98 5.98 0 00.36 4.196C.063 4.92-.139 5.75-.198 6.976-.257 8.202-.27 8.666-.27 12.287c0 3.62.013 4.085.072 5.311.059 1.226.261 2.056.558 2.78a5.98 5.98 0 001.407 2.159 5.98 5.98 0 002.159 1.407c.724.297 1.554.499 2.78.558 1.226.059 1.69.072 5.311.072 3.62 0 4.085-.013 5.311-.072 1.226-.059 2.056-.261 2.78-.558a5.98 5.98 0 002.159-1.407 5.98 5.98 0 001.407-2.159c.297-.724.499-1.554.558-2.78.059-1.226.072-1.69.072-5.311 0-3.62-.013-4.085-.072-5.311-.059-1.226-.261-2.056-.558-2.78A5.98 5.98 0 0020.946 1.44 5.98 5.98 0 0018.787.033C18.063-.264 17.233-.466 16.007-.525 14.781-.584 14.317-.597 10.696-.597L12.017 0zm-.136 2.71c3.56 0 3.983.013 5.384.068 1.299.06 2.005.279 2.476.464.622.242 1.065.53 1.531.996a4.123 4.123 0 01.996 1.531c.185.471.404 1.177.464 2.476.055 1.401.068 1.824.068 5.384 0 3.56-.013 3.983-.068 5.384-.06 1.299-.279 2.005-.464 2.476a4.123 4.123 0 01-.996 1.531 4.123 4.123 0 01-1.531.996c-.471.185-1.177.404-2.476.464-1.401.055-1.824.068-5.384.068-3.56 0-3.983-.013-5.384-.068-1.299-.06-2.005-.279-2.476-.464a4.123 4.123 0 01-1.531-.996 4.123 4.123 0 01-.996-1.531c-.185-.471-.404-1.177-.464-2.476-.055-1.401-.068-1.824-.068-5.384 0-3.56.013-3.983.068-5.384.06-1.299.279-2.005.464-2.476.242-.622.53-1.065.996-1.531a4.123 4.123 0 011.531-.996c.471-.185 1.177-.404 2.476-.464 1.401-.055 1.824-.068 5.384-.068z" clipRule="evenodd"/>
                  <path d="M12.017 15.33a3.043 3.043 0 110-6.086 3.043 3.043 0 010 6.086zM12.017 7.5a4.787 4.787 0 100 9.574 4.787 4.787 0 000-9.574zM17.764 7.291a1.12 1.12 0 11-2.24 0 1.12 1.12 0 012.24 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 Phases. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span>🌐 English</span>
              <span>•</span>
              <span>🌙 Theme</span>
              <span>•</span>
              <Link href="/accessibility" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-xs text-yellow-800 dark:text-yellow-200 text-center">
              <strong>Important:</strong> If you're experiencing a mental health crisis, please contact emergency services 
              or call a crisis hotline immediately. This AI is not a replacement for professional mental health care.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}