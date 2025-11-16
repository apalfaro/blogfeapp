import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              My Blog
            </Link>
          </div>
          <nav className="flex space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/posts"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Posts
            </Link>
            <Link
              to="/create"
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Write Post
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
