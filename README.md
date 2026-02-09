# Todo list with React/typescript and NestJs

# Prepare .env file

Cd to project directory `cd todo-list-online`.
Rename `./backend/.env (sample)` to `./backend/.env` and pass your values from Neondb (or other db provider), then run next commands

## Install

```bash
cd frontend
npm install
npm run build
cd ../backend
npm install
npm run build
```

## Run

```bash
cd todo-list-online/backend
node dist/src/main.js
```

## Run in docker

Prepare .env file, then run next commands

```bash
cd todo-list-online
docker run --rm -t -v "$PWD:/app" -w "/app" node:lts bash install.sh

docker run --restart always \
     --name todo-list-online \
     -d -v "$PWD:/app" -w "/app/backend" \
     -p 3000:3000 \
      node:lts node dist/src/main.js

```

