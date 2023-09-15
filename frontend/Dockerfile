FROM node:18-alpine AS build

ENV NODE_ENV=production

WORKDIR /frontend

COPY package.json .

RUN npm cache clean --force

RUN npm install

# Typescript 먼저 install
RUN npm install typescript

# RUN npm install --save-dev @types/react-dom

COPY . .

RUN npm run build

FROM nginx:1.21.3-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /frontend/dist /usr/share/nginx/html

EXPOSE 3001

CMD [ "nginx", "-g", "daemon off;" ]