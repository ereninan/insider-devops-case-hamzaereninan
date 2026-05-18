# Insider DevOps Case Study
Insider One - DevOps Internship Case Study (2026)

This repository contains a lightweight Node.js HTTP service, containerized using Docker, deployed to a local Kubernetes (Minikube) cluster, and safely exposed to the internet via an ngrok tunnel.

🚀 Chosen Track: Track B (Local Track - Minikube + ngrok)

To ensure a rapid setup, eliminate unnecessary cloud costs, and build a self-contained, reproducible local environment, Track B was selected for this assignment.

🛠️ Decisions Log & Tradeoffs

Application Stack (Node.js & Express): Chosen for its lightweight footprint, fast prototyping capability, and straightforward routing configuration.

Multi-Stage Docker Build: Implemented to separate the build dependencies from the production runtime environment, keeping the final production image size minimal and clean.

Non-Root Security Configuration: Out of security awareness, the container processes are explicitly configured to run under the restricted, non-privileged node user instead of the all-powerful root user.

Local Port-Forwarding & ngrok Tunnel: Due to the network isolation inherent in the Docker driver on macOS, the Minikube service is port-forwarded to local port 8080 and safely tunneled out to a public URL using ngrok.

GitHub Actions CI Pipeline: Automatically triggers on every push and pull request to set up the runtime environment, install dependencies, and verify that the Docker image builds successfully without any errors.

💻 Setup & Execution Guide

1. Run the App Locally

npm install
node server.js


2. Build the Container Image

docker build -t devops-case-app .


3. Start Minikube & Deploy

Initialize the local cluster, load the custom Docker image into Minikube's internal cache, and apply the Kubernetes manifests:

minikube start --driver=docker
minikube image load devops-case-app:latest
kubectl apply -f k8s.yaml


4. Expose to the Internet (Port-Forward + ngrok)

Establish a bridge between the cluster and your machine (keep this terminal open):

kubectl port-forward service/devops-case-service 8080:80


Open a new terminal tab/window and launch the ngrok tunnel:

ngrok http 8080


🗺️ Architecture Sketch

The architectural diagram illustrating the component relationships and data flow can be found as architecture.png in the root directory of this repository.