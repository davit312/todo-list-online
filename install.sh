#!/bin/bash

set +e
set +x

cd frontend
npm install
npm run build
cd ../backend
npm install
npm run build
