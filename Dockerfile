FROM node:18-alpine as builder

WORKDIR /app/
# install pnpm
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build


FROM node:18-alpine
WORKDIR /app/
# copy from build image
COPY --from=builder /app/dist/exe ./

EXPOSE 3000

CMD ["node", "index.js"]
