import React, {Fragment, useContext} from 'react';


import authContext from '../context/auth/authContext'
import Alert from './Alert'
import axiosClient from '../config/axios';
import tokenAuth from '../config/tokenAuth'
import { useFormik} from 'formik';
import * as Yup from 'yup'


const UpdateContactForm = (props) => {
    const AuthContext = useContext(authContext);
    const {authenticated, message, token} = AuthContext;
    const formik = useFormik({
        initialValues: {
            firstname: props.contactToBeUpdated.firstname,
            lastname: props.contactToBeUpdated.lastname,
            email:props.contactToBeUpdated.email,
            contact:props.contactToBeUpdated.contactnumber
        },
        validationSchema: Yup.object({
            email: Yup.string().email('not valid email').required('email is mandatory'),
            firstname: Yup.string().required('first name required'),
            lastname: Yup.string().required('last name required'),
            contact: Yup.number().required('contact number required')
        }),
        onSubmit: values => {
            
            fetchDataContact(values)
        }
    });
    async function fetchDataContact(values){
        if(authenticated) {
            tokenAuth(token);
            const response =  await axiosClient.put(`/api/contact/${props.contactToBeUpdated._id}`, values);
            
            let index = props.userContact.contacts.findIndex(con => con._id === props.contactToBeUpdated._id)
            console.log(index)
            let aux1 = [...props.userContact.contacts];
            aux1[index] = response.data
            
            props.setUserContact({
                ...props.userContact,
                contacts: [...aux1],
                updateContact: false,
                contactToBeUpdated:{}
            })
            
    } 
    }
    return ( 
        <Fragment>
        
            
            <div className="form-divider">
            
            <form onSubmit={formik.handleSubmit}>
            {message && <Alert/>}
                <div className="form-grid">
                    <div className="input-grid">
                    <label className="" htmlFor="firstname"></label>
                        <input 
                                type="text"
                                id="firstname"
                                placeholder="firstname"
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                        />
                        {formik.touched.firstname && formik.errors.firstname ?(
                                <div className="error-ok">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.firstname}</p>
                                </div>
                            ): null}
                    </div>
                    <div className="input-grid">
                    <label className="" htmlFor="lastname"></label>
                        <input 
                                type="text"
                                id="lastname"
                                placeholder="lastname"
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                        />
                        {formik.touched.lastname && formik.errors.lastname ?(
                                <div className="error-ok">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.lastname}</p>
                                </div>
                            ): null}
                    </div>
                    <div className="input-grid">
                    <label className="" htmlFor="email"></label>
                        <input 
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ?(
                                <div className="error-ok">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ): null}
                    </div>
                    <div className="input-grid">
                    <label className="" htmlFor="contact"></label>
                        <input 
                            type="text"
                            placeholder="contact number"
                            id="contact"
                            
                            value={formik.values.contact}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                            {formik.touched.contact && formik.errors.contact ?(
                                <div className="error-ok">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.contact}</p>
                                </div>
                            ): null}
                    </div>
                    <div className="campo-button boton">
                        <button
                            type="submit"
                            className="btn-primary"
                           
                        >Update</button>
                    </div>
    
                </div>
              </form> 
            </div>


        </Fragment>
     );
}
 
export default UpdateContactForm;