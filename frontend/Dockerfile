FROM node:17 AS build
WORKDIR /app
COPY ./package.json package.json
RUN npm i
COPY . .
RUN npm run build

FROM nginx
COPY --from=build /app/dist/index.html /nginx/static/index.html
COPY --from=build /app/dist/assets /nginx/static/