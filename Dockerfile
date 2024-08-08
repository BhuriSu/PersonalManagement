FROM buildpack-deps:bullseye

WORKDIR /usr/src/app

COPY package*.json /app/

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run dev"]