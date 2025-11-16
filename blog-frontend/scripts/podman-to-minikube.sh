#!/bin/bash

# Export image from Podman and import to Minikube Docker

set -e

# Configuration
IMAGE_NAME="${1:-blog-frontend}"
IMAGE_TAG="${2:-latest}"

echo "Exporting ${IMAGE_NAME}:${IMAGE_TAG} from Podman to Minikube..."

# Save image from Podman
echo "Step 1: Exporting image from Podman..."
podman save ${IMAGE_NAME}:${IMAGE_TAG} -o ${IMAGE_NAME}-${IMAGE_TAG}.tar

# Load image into Minikube Docker
echo "Step 2: Loading image into Minikube Docker..."
minikube image load ${IMAGE_NAME}-${IMAGE_TAG}.tar

# Clean up the tar file
echo "Step 3: Cleaning up..."
rm ${IMAGE_NAME}-${IMAGE_TAG}.tar

# Verify the image is available in Minikube
echo "Step 4: Verifying image in Minikube..."
minikube image ls | grep ${IMAGE_NAME}

echo "✅ Successfully transferred ${IMAGE_NAME}:${IMAGE_TAG} to Minikube!"
echo ""
echo "You can now deploy with:"
echo "./scripts/deploy.sh ${IMAGE_NAME} blogapp ./helm/blog-frontend ${IMAGE_TAG} \"\""
