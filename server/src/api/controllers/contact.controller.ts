
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { Password} from '../services/password';
import {BadRequestError} from '../errors/bad-request-error';
import {NotFoundError} from '../errors/not-found-error';
import {NotAuthorizedError} from '../errors/not-authorized-error';
import {User} from '../models/user.model';
import {Contact} from '../models/contact.model'


import {sendMail} from '../services/mail'



export const create =  async (req: Request, res: Response) =>{
    
    const  {firstname, lastname, email, contact} = req.body;
    
    const newContact = Contact.build({ firstname, lastname, email, contactnumber:contact, userId: req.currentUser!.id });
    
    await newContact.save();
    sendMail([email],'Your mail have been added','We added you in our contact list. Thank you')
    res.status(201).send(newContact);
    
}


export const update =  async (req: Request, res: Response) =>{
    const  {firstname, lastname, email, contact} = req.body;
    const contactid = req.params.contactid;
    const contactToBeDeleted = await Contact.findById(contactid);
    if(!contactToBeDeleted){
        throw new NotFoundError();
    }
    if(contactToBeDeleted.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }
    contactToBeDeleted.firstname = firstname;
    contactToBeDeleted.lastname = lastname  
    contactToBeDeleted.email = email  
    contactToBeDeleted.contactnumber = contact   
    await contactToBeDeleted.save(); 
    res.status(200).send(contactToBeDeleted);

}




export const deleteContact =  async (req: Request, res: Response) =>{
    const contactid = req.params.contactid;
    const contactToBeDeleted = await Contact.findById(contactid);
    if(!contactToBeDeleted){
        throw new NotFoundError();
    }
    if(contactToBeDeleted.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    await Contact.findByIdAndRemove(contactid)
    res.status(200).send({msg: 'contact deleted'});
}

export const view =  async (req: Request, res: Response) =>{
    
    const contacts = await Contact.find({userId:req.currentUser!.id})
    res.status(200).send(contacts);

}

export const viewPaginated =  async (req: Request, res: Response) =>{
    let currentPage=  parseInt(req.params.page) || 1
    let paginationLimit = 10
    let totalItems = await Contact.find({userId:req.currentUser!.id}).countDocuments(); 
    let totalPages = Math.ceil(totalItems/paginationLimit)
    let contacts = await Contact.find({userId:req.currentUser!.id}).skip((currentPage - 1) * paginationLimit).limit(paginationLimit);
    
    res.status(200).send({contacts, totalItems, totalPages, currentPage});

}