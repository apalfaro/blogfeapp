#!/bin/bash

# Build and push Docker image for blog frontend

set -e

# Configuration
IMAGE_NAME="${1:-blog-frontend}"
IMAGE_TAG="${2:-latest}"
REGISTRY="${3:-your-registry.com}"

echo "Building Docker image: ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"

# Build the Docker image
docker build -t ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} .

# Push the image to registry
echo "Pushing image to registry..."
docker push ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}

echo "Build and push completed successfully!"
echo "Image: ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
