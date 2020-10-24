import {Router} from 'express';

const mainRoute = Router();
import contactRoute from './contact.route';
import userRoute from './user.route';


mainRoute.use('/contact', contactRoute);
mainRoute.use('/user', userRoute);

export default mainRoute;