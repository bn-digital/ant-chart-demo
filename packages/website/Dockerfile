# syntax = docker/dockerfile:latest
FROM node:15-alpine AS base
WORKDIR /usr/local/src
COPY package.json .
RUN yarn set version berry \
 && yarn config set nodeLinker node-modules \
 && yarn config set preferAggregateCacheInfo true
COPY --from=dcr.bndigital.dev/library/actions-runner:latest /home/runner/.yarn/berry/cache .yarn/cache

FROM base AS build
RUN yarn install \
      --check-cache
COPY . .
RUN yarn build

FROM base
ENV NODE_ENV=production
COPY --from=build /usr/local/src/build .
RUN npm install -g serve
ENTRYPOINT ["serve"]
CMD ["--single", "."]
