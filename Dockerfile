FROM node:16-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install --silent
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:16-alpine as production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/.env ./.env

EXPOSE 3000

CMD ["node", "dist/main"]