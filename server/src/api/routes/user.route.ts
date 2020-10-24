import {Router} from 'express';
import {signup, signin, currentUserResponse } from '../controllers/user.controller';
import {currentUser} from '../middlewares/current-user'
import {body} from 'express-validator'
import {validateRequest} from '../middlewares/validate-request';

const userRoute = Router();

userRoute.post('/signup',[
    body('email')
        .isEmail()
        .withMessage('email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 characters')
], validateRequest, signup);
userRoute.post('/signin',[
    body('email')
        .isEmail()
        .withMessage('email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('you must supply a password')
], validateRequest, signin);

userRoute.put('/', );
userRoute.get('/',currentUser, currentUserResponse );

export default userRoute;