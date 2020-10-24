import React, {Fragment, useContext, useEffect, useState} from 'react';

import authContext from '../context/auth/authContext';

import axiosClient from '../config/axios';
import tokenAuth from '../config/tokenAuth'
import NavBar from './layout/Navbar'

import Contacts from './Contacts'
import NewContactForm from './NewContactForm'
import UpdateContactForm from './UpdateContactForm'
const LandingPage = () => {
    const AuthContext = useContext(authContext);
    const {userAuthenticated, authenticated, message, token,user} = AuthContext;
    const [userContact, setUserContact] = useState({
        contacts: [],
        totalPages: 1,
        currentPage: 1,
        totalItems: 0,
        pagesArray: [],
        newContact: false,
        updateContact: false,
        contactToBeUpdated:{}
    })

    const {totalPages, currentPage, contacts, totalItems,pagesArray,newContact, updateContact,contactToBeUpdated} = userContact
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token) {
            userAuthenticated();
        }
        
      },[])
    async function fetchDataContact(page){
        if(authenticated) {
            tokenAuth(token);
            const response =  await axiosClient.get(`/api/contact/${page}`);
            
            setUserContact({
                   ...userContact,
                contacts: [...contacts, ...response.data.contacts],
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage,
                totalItems: response.data.totalItems,
                pagesArray: pagination(response.data.totalPages, response.data.currentPage)

            });
    } 
    }
    useEffect(()=>{
         fetchDataContact(currentPage);            
        
      },[authenticated])

    const pagination = (totalPages, currentPage) => {
        let aux= []
        for(let i=1; i<totalPages+1; i++ ) {
            
            if(currentPage === i) {
                aux.push(
                <button className="btn-primary" >{i} </button>
                )
            }else{
                aux.push(
                    <button className="btn-secondary" onClick={()=>fetchDataContact(i)} >{i} </button>
                )
            }

        }
        return aux
    }
    const newContactFunc = () => {
        setUserContact({
            ...userContact,
            newContact: true
        })
    }

    return ( 
        <Fragment>
            <NavBar/>
            <main>
                <div className="container">
                    <h2>Contacts List System</h2>
                    {
                        authenticated? 
                        (
                            <>
                            { newContact?(<NewContactForm setUserContact={setUserContact} userContact={userContact} />) :null }
                            { updateContact?(<UpdateContactForm setUserContact={setUserContact} userContact={userContact} contactToBeUpdated={contactToBeUpdated}/>) :null }
                            <div className="table-landing">
                            {user?
                                (<p>Welcome {user.email} </p>):null
                            }
                                <p><button className="btn-secondary" onClick={newContactFunc}>New Contact</button></p>

                            <table className="paleBlueRows">
                                <thead>
                                <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Contact Number</th>
                                <th>Actions</th>
                                </tr>
                                </thead>
                                
                                    {
                                        contacts.map(contact => <Contacts contact={contact} setUserContact={setUserContact} contacts={contacts} userContact={userContact} />)
                                    }
                            
                            </table>
                                <p>{pagesArray}</p>
                                
                                
                                
                        </div>
                        </>
                        )
                        :
                        (
                            <h2>Please Sign in or Sign up first</h2>
                        )
                    }
                </div>
                

            </main>
        </Fragment>
     );
}
 
export default LandingPage;