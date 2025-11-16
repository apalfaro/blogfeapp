# Blog Frontend

A modern React frontend for a blogging site built with Vite, TypeScript, and Tailwind CSS.

## Features

- 📝 Create, read, update, and delete blog posts
- 🏷️ Tag and category support
- 🔍 Search functionality
- 📱 Responsive design
- ⚡ Fast development with Vite
- 🔒 Authentication ready (JWT tokens)
- 🎨 Clean, modern UI

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## API Configuration

The frontend is configured to connect to a backend API at `http://localhost:3001/api` by default. You can change this in `src/services/api.ts`:

```typescript
constructor(baseURL: string = 'http://localhost:3001/api') {
  // Update this URL to match your backend
}
```

## API Endpoints

The frontend expects the following API endpoints:

### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/:id` - Get a single post
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post
- `GET /api/posts/search?q=query` - Search posts
- `GET /api/posts/category/:category` - Get posts by category
- `GET /api/posts/tag/:tag` - Get posts by tag

### Authentication (optional)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── PostCard.tsx    # Post preview card
│   ├── PostList.tsx    # List of posts
│   ├── PostDetail.tsx  # Single post view
│   └── CreatePost.tsx  # Post creation form
├── services/           # API services
│   └── api.ts         # HTTP client and API methods
├── types/             # TypeScript type definitions
│   └── blog.ts        # Blog-related types
├── utils/             # Utility functions
└── App.tsx           # Main app component
```

## Customization

### Styling

The app uses Tailwind CSS for styling. You can customize the theme by modifying `tailwind.config.js`.

### API Integration

Update the `BlogApiService` class in `src/services/api.ts` to match your backend API structure.

### Adding New Features

1. Create new components in `src/components/`
2. Add new API methods to `src/services/api.ts`
3. Define new types in `src/types/blog.ts`
4. Update routing in `src/App.tsx`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Container Deployment

### Docker Build

Build the Docker image:
```bash
docker build -t blog-frontend:latest .
```

Run locally:
```bash
docker run -p 8080:80 blog-frontend:latest
```

### Kubernetes Deployment with Helm

#### Prerequisites
- Kubernetes cluster
- Helm 3 installed
- kubectl configured

#### Build and Push Image
```bash
# Build and push to your registry
./scripts/build.sh blog-frontend latest your-registry.com
```

#### Deploy to Kubernetes
```bash
# Deploy using Helm
./scripts/deploy.sh blog-frontend default ./helm/blog-frontend latest your-registry.com
```

#### Custom Deployment
```bash
# Install with custom values
helm install blog-frontend ./helm/blog-frontend \
  --namespace blog \
  --create-namespace \
  --set image.tag=v1.0.0 \
  --set ingress.hosts[0].host=blog.yourdomain.com \
  --set backendApiUrl=https://api.yourdomain.com
```

#### Helm Values Configuration
Key configuration options in `values.yaml`:
- `replicaCount`: Number of pod replicas
- `image.repository`: Docker image repository
- `image.tag`: Docker image tag
- `ingress.hosts`: Domain configuration
- `backendApiUrl`: Backend API URL
- `resources`: CPU and memory limits

## License

MIT License
