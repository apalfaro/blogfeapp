export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  category?: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  category?: string;
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
