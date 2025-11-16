import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Post } from '../types/blog';
import blogApi from '../services/api';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await blogApi.getPost(id);
        setPost(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error || 'Post not found'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          to="/posts"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Back to Posts
        </Link>
      </div>
      
      <article className="bg-white rounded-lg shadow-lg p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex items-center justify-between text-gray-600 mb-4">
            <div className="flex items-center space-x-4">
              <span>By {post.author}</span>
              <span>{formatDate(post.publishedAt)}</span>
              {post.updatedAt !== post.publishedAt && (
                <span>Updated {formatDate(post.updatedAt)}</span>
              )}
            </div>
          </div>
          
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {post.content}
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
