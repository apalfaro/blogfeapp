import { Link } from 'react-router-dom';
import type { Post } from '../types/blog';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <h2 className="text-xl font-bold mb-2">
        <Link
          to={`/post/${post.id}`}
          className="text-gray-900 hover:text-blue-600 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>By {post.author}</span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-gray-400 text-xs">+{post.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
