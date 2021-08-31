FROM node:latest

# create work directory
WORKDIR /usr/src/app

# create environment variables
ARG PORT 4000
ENV PORT ${PORT}
ENV SEED "api_seed"

ARG URL "mysql://root:@localhost:3306/test"
ENV URL_DB "${URL}"

# copy pakage.json
COPY package*.json .

# install dependencies
RUN npm install

# copy files
COPY . .

# expose port 
EXPOSE 4000

# run app npm run start:prod
CMD ["npm", "run", "start:prod"]

