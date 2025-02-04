# Pre-requisite: Install minikube and kubectl
# Description: Start minikube cluster
minikube start

# Create deployments and services from yaml files
kubectl create -f infra/k8s/backend.yaml
kubectl create -f infra/k8s/frontend.yaml
kubectl create -f infra/k8s/ingress.yaml

# Add the minikube ip to /etc/hosts file
# Windows: C:\Windows\System32\drivers\etc\hosts
echo "$(minikube ip) example.org.vn" | sudo tee -a /etc/hosts

# Access the application using the minikube ip
curl http://example.org.vn
firefox http://example.org.vn