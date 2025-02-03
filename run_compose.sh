# Generate a self-signed certificate for SSL Nginx server (should be replaced by a valid certificate in production)
# Only need to run this script once, just skip filling information when prompted
openssl req -x509 -nodes -newkey ec -pkeyopt 'ec_paramgen_curve:P-256' -days 365 -keyout keys/nginx.key -out keys/nginx.crt

# Build frontend website
cd frontend
npm run build

# Build and run the Docker containers
cd ..
docker-compose up --build