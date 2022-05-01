FROM node:16

ARG TYPEORM_USERNAME
ARG TYPEORM_PASSWORD
ARG TYPEORM_DATABASE


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN cp .env.example .env

# RUN sed -i "/TYPEORM_USERNAME=/c\TYPEORM_USERNAME=\"$TYPEORM_USERNAME\"" .env
# RUN sed -i "/TYPEORM_PASSWORD=/c\TYPEORM_PASSWORD=\"$TYPEORM_DATABASE\"" .env
# RUN sed -i "/TYPEORM_DATABASE=/c\TYPEORM_DATABASE=\"$TYPEORM_DATABASE\"" .env

RUN npm run build
RUN npm run migrations:run
#RUN npm run migrations:drop

EXPOSE 3000

CMD ["node", "dist/main.js"]