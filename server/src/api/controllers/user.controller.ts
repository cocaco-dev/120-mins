
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { Password} from '../services/password';
import {BadRequestError} from '../errors/bad-request-error'
import {User} from '../models/user.model'




export const signup =  async (req: Request, res: Response) =>{
    
    const  { email, password} = req.body;
    const existingUser = await User.findOne({ email});
    if(existingUser) {
        throw new BadRequestError('email in use')
    }
    const user = User.build({ email, password});
    await user.save();

    const userJwt = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_KEY!, {expiresIn: '8h'});
   
    res.status(201).send({token:userJwt});
}


export const signin =  async (req: Request, res: Response) =>{
    const { email, password} = req.body;
    const existingUser = await User.findOne({email})
    if(!existingUser) {
        throw new BadRequestError('invalid credentials')
    }
    const passwordsMatch = await Password.compare(existingUser.password, password);
    if(!passwordsMatch) {
        throw new BadRequestError('invalid credentials')
    }
    const userJwt = jwt.sign({
        id: existingUser._id,
        email: existingUser.email
    }, process.env.JWT_KEY!, {expiresIn: '8h'});
    
    res.status(200).send({token:userJwt});

}




export const currentUserResponse =  async (req: Request, res: Response) =>{
    console.log('test')
    res.json({user: req.currentUser})
}

export const update =  async (req: Request, res: Response) =>{
    const { email, password} = req.body;
    const existingUser = await User.findOne({email})
    if(!existingUser) {
        throw new BadRequestError('invalid credentials')
    }
    const passwordsMatch = await Password.compare(existingUser.password, password);
    if(!passwordsMatch) {
        throw new BadRequestError('invalid credentials')
    }
    const userJwt = jwt.sign({
        id: existingUser._id,
        email: existingUser.email
    }, process.env.JWT_KEY!, {expiresIn: '8h'});
    
    res.status(200).send({token:userJwt});

}