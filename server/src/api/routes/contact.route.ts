import {Router} from 'express';
import  {create, update, view, deleteContact, viewPaginated } from '../controllers/contact.controller';
import {requireAuth} from '../middlewares/require-auth';
import {currentUser} from '../middlewares/current-user';
import {body} from 'express-validator'
import {validateRequest} from '../middlewares/validate-request';

const contactRoute = Router()
contactRoute.post('/',[
    body('firstname')
        .not()
        .notEmpty()
        .withMessage('First Name is required'),
    body('lastname')
        .not()
        .notEmpty()
        .withMessage('Last Name is required'),
    body('email')
        .isEmail()
        .withMessage('email must be valid'),
    body('contact')
        .isNumeric()
        .withMessage('must be greater a valid number')
], validateRequest ,currentUser, requireAuth, create);
contactRoute.put('/:contactid',[
    body('firstname')
        .not()
        .notEmpty()
        .withMessage('First Name is required'),
    body('lastname')
        .not()
        .notEmpty()
        .withMessage('Last Name is required'),
    body('email')
        .isEmail()
        .withMessage('email must be valid'),
    body('contact')
        .isNumeric()
        .withMessage('must be greater a valid number')
] ,currentUser, requireAuth, update);
contactRoute.get('/:page', currentUser, requireAuth, viewPaginated);
contactRoute.get('/', currentUser, requireAuth, view);
contactRoute.delete('/:contactid', currentUser, requireAuth, deleteContact);

export default contactRoute;