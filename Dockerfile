# build stage
FROM node:lts AS build

WORKDIR /src

COPY . .
RUN npm ci
RUN npm run build


# runtime stage
FROM nginx:alpine AS runtime

WORKDIR /usr/share/nginx/html

COPY --from=build /src/out/ .
