# frontend
docker build -t front-end . 
docker run --name front-end-container -d -p 3000:3000 front-end

# backend
docker-compose build
docker compose up