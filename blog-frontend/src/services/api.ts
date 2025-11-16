import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { Post, CreatePostRequest, UpdatePostRequest, ApiResponse, PaginatedResponse } from '../types/blog';

class BlogApiService {
  private client: AxiosInstance;

  constructor(baseURL: string = import.meta.env.VITE_API_URL || 'http://localhost:3001/api') {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Posts endpoints
  async getPosts(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Post>> {
    const response = await this.client.get(`/posts?page=${page}&limit=${limit}`);
    return response.data;
  }

  async getPost(id: string): Promise<ApiResponse<Post>> {
    const response = await this.client.get(`/posts/${id}`);
    return response.data;
  }

  async createPost(post: CreatePostRequest): Promise<ApiResponse<Post>> {
    const response = await this.client.post('/posts', post);
    return response.data;
  }

  async updatePost(post: UpdatePostRequest): Promise<ApiResponse<Post>> {
    const response = await this.client.put(`/posts/${post.id}`, post);
    return response.data;
  }

  async deletePost(id: string): Promise<ApiResponse<void>> {
    const response = await this.client.delete(`/posts/${id}`);
    return response.data;
  }

  async searchPosts(query: string): Promise<PaginatedResponse<Post>> {
    const response = await this.client.get(`/posts/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }

  async getPostsByCategory(category: string): Promise<PaginatedResponse<Post>> {
    const response = await this.client.get(`/posts/category/${category}`);
    return response.data;
  }

  async getPostsByTag(tag: string): Promise<PaginatedResponse<Post>> {
    const response = await this.client.get(`/posts/tag/${tag}`);
    return response.data;
  }

  // Auth endpoints (if needed)
  async login(email: string, password: string): Promise<ApiResponse<{ token: string }>> {
    const response = await this.client.post('/auth/login', { email, password });
    return response.data;
  }

  async register(email: string, password: string, name: string): Promise<ApiResponse<{ token: string }>> {
    const response = await this.client.post('/auth/register', { email, password, name });
    return response.data;
  }
}

export const blogApi = new BlogApiService();
export default blogApi;
