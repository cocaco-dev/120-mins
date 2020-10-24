
import express, { Application, Request, Response, NextFunction} from "express";
import 'express-async-errors'
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import mainRoute from './api/routes/main.route';
dotenv.config({path: __dirname+'/../.env'});
import { connectDB, checkConnection} from './config/database';
import fs from 'fs';
import path from 'path'



import {errorHandler} from './api/middlewares/error-handler';
import {NotFoundError} from './api/errors/not-found-error';

console.log(process.env.NODE_ENV)
const app: Application = express();

let accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' })
app.use(morgan('combined', {stream:accessLogStream}));



//JSON and forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//cors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
//ruta
app.use('/api', mainRoute);

// error handling
app.all('*', async (req, res) => {
    
    throw new NotFoundError()
})
app.use(errorHandler);

const port: number | string = process.env.PORT || 5000;
const db: string = `mongodb://${process.env.DB_HOST}/${process.env.DB_PATH}`;
console.log(db)

connectDB(db)
.then(() => {
    app.listen(port);
    console.log('RestAPI listen on port: ' + port);
})
.catch(error => {
    console.log(error)
});
checkConnection(db);



