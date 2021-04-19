# syntax = docker/dockerfile:latest
FROM node:15-alpine AS base
WORKDIR /usr/local/src
COPY package.json .
RUN yarn set version berry \
 && yarn config set nodeLinker node-modules \
 && yarn config set enableGlobalCache true \
 && yarn config set preferAggregateCacheInfo true \
 && yarn plugin import workspace-tools \
 && yarn plugin import version

FROM base AS build
RUN yarn
ENV REACT_APP_API_URL=https://cms.london-luxury.bndigital.dev/graphql
COPY . .
RUN yarn build

FROM base
ENV NODE_ENV=production
COPY --from=build /usr/local/src/build .
RUN npm install -g serve
ENTRYPOINT ["serve"]
CMD ["--single", "."]
