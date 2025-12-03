# Todo list with React and Node

## Install

```bash
cd todo-list-online
cd frontend
npm install
npm run build
cd ../backend
npm install
node init.js
```

## Run

```bash
cd todo-list-online/backend
node server.sh
```

## Run in docker

```bash
cd todo-list-online
docker run --rm -t -v "$PWD:/app" -w "/app" node:lts bash install.sh

docker run --restart always \
     --name todo-list-online \
     -d -v "$PWD:/app" -w "/app/backend" \
     -p 3000:3000 \
      node:lts node server.js
```
