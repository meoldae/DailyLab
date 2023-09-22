FROM node:18-alpine AS build

# ENV NODE_ENV=production

WORKDIR /frontend

COPY package.json .

RUN npm cache clean --force

# Typescript 먼저 install
RUN npm install -g typescript vite

RUN npm install @vitejs/plugin-react-swc

ENV NODE_ENV=development

RUN npm install

ENV NODE_ENV=production

COPY . .

RUN vite build

FROM nginx:1.21.3-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /frontend/dist /usr/share/nginx/html

EXPOSE 3001

CMD [ "nginx", "-g", "daemon off;" ]