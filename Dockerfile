FROM node:16-alpine as build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --silent
COPY . .
RUN npx prisma generate
CMD [ "npm", "run", "build" ]


FROM node:16-alpine as production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/.env ./.env


EXPOSE 3000

CMD ["node", "dist/main"]
