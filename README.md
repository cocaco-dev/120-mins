# Contacts List System

## RUN

All the proccess are automated with docker, in order to run the code enter to root directory and run: docker-compose up -d
docker compose will run 4 containers:
  1: backend: run on port 4000 on localhost
  2: frontend: run on port 80 http://localhost/ 
  3: mongodb: run as a internal service connected to the backend and mongo-express
  4: mongo-express: http://localhost:8080/ (user:hireme, pass: 123456) 

## NOTES
The email account is one of my domains: test@loop-corporation.com, so don't worry about the email.
The first time execution of docker compose takes a long time especially the front end container.
The exam #2 was also uploaded on the root folder.