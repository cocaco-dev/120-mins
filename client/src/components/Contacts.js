import React, {useContext} from 'react';

import authContext from '../context/auth/authContext';

import axiosClient from '../config/axios';
import tokenAuth from '../config/tokenAuth'



const Contacts = (props) => {
    const AuthContext = useContext(authContext);
    const {authenticated, token} = AuthContext;
    const onDelete = async () => {
        try {
            if(authenticated) {
                tokenAuth(token);
                
                await axiosClient.delete(`/api/contact/${props.contact._id}`);
                props.setUserContact({
                       ...props.userContact,
                    contacts: props.contacts.filter(contacto => contacto._id !== props.contact._id )
                });
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    const onUpdate = () => {
        props.setUserContact({
            ...props.userContact,
            updateContact: true,
            contactToBeUpdated:props.contact
        })
    }
    return ( 
        <tbody >
            <th>{props.contact.firstname}</th>
            <th>{props.contact.lastname}</th>
            <th>{props.contact.email}</th>
            <th>{props.contact.contactnumber}</th>
            <th>
                <button  onClick={onUpdate} className="btn-primary">Update</button>
                <button onClick={onDelete} className="btn-secondary">Delete</button>
            </th>
            
        </tbody>
     );
}
 
export default Contacts;