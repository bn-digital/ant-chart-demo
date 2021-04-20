# syntax = docker/dockerfile:latest
FROM node:15-alpine AS base
WORKDIR /usr/local/src

FROM dcr.bndigital.dev/library/actions-runner:latest AS build
COPY . .
RUN yarn
RUN yarn build

FROM base
ENV NODE_ENV=production
COPY --from=build /usr/local/src/build .
RUN npm install -g serve
ENTRYPOINT ["serve"]
CMD ["--single", "."]
