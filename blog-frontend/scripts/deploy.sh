#!/bin/bash

# Deploy blog frontend using Helm

set -e

# Configuration
RELEASE_NAME="${1:-blog-frontend}"
NAMESPACE="${2:-blogapp}"
CHART_PATH="${3:-./helm/blog-frontend}"
IMAGE_TAG="${4:-latest}"
REGISTRY="${5:-your-registry.com}"

echo "Deploying blog frontend..."
echo "Release: ${RELEASE_NAME}"
echo "Namespace: ${NAMESPACE}"
echo "Image Tag: ${IMAGE_TAG}"

# Create namespace if it doesn't exist
kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -

# Deploy using Helm
helm upgrade --install ${RELEASE_NAME} ${CHART_PATH} \
  --namespace ${NAMESPACE} \
  --set image.tag=${IMAGE_TAG} \
  --set image.repository=${REGISTRY}/blog-frontend \
  --set ingress.hosts[0].host=blog.yourdomain.com \
  --set ingress.tls[0].hosts[0]=blog.yourdomain.com \
  --set ingress.tls[0].secretName=blog-frontend-tls \
  --wait \
  --timeout 5m

echo "Deployment completed successfully!"
echo "Access your blog at: https://blog.yourdomain.com"
