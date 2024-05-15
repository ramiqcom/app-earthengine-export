FROM node:18

ARG stadia_key
ARG api_url

RUN mkdir /app
COPY package.json /app/
WORKDIR /app
COPY . ./

ENV NEXT_PUBLIC_STADIA_KEY=$stadia_key
ENV API_URL=$api_url

RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run","start"]
