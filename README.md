# DevFlow Dashboard

A small React + Node.js application designed as a hands-on Jenkins/DevOps learning project.

## Architecture

- React frontend
- Node.js + Express backend
- Separate Dockerfile for each component
- Docker Compose for local deployment
- Jenkins will automate CI/CD
- Trivy will be added for security scanning
- SonarQube will be added later
- Docker Hub publishing will be added later
- Azure deployment can be added later when cloud access is available

## Run without Docker

### Backend

```bash
cd backend
npm install
npm start
```

Backend: http://localhost:5000

### Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

## Run with Docker Compose

From the project root:

```bash
docker compose up --build
```

Open:

http://localhost:3000

Backend health endpoint:

http://localhost:5000/api/health

## Planned CI/CD

```text
GitHub
  -> Jenkins
  -> Checkout
  -> Test
  -> Trivy filesystem scan
  -> SonarQube
  -> Docker build
  -> Trivy image scan
  -> Docker Hub
  -> Local deployment
```
