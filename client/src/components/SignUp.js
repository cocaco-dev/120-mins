import React, {Fragment, useContext, useEffect} from 'react';


import authContext from '../context/auth/authContext'
import Alert from './Alert'
import { useFormik} from 'formik';
import * as Yup from 'yup'

import NavBar from './layout/Navbar'
const SignUp = (props) => {
    const AuthContext = useContext(authContext);
    const {signUpUser, message,userAuthenticated,authenticated} = AuthContext;

    const formik = useFormik({
        initialValues: {
            email:'',
            password:''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('not valid email').required('email is mandatory'),
            password: Yup.string().required('password required').min(6, 'password must have min 6 char')
        }),
        onSubmit: valores => {
            console.log(valores)
            signUpUser(valores);
        }
    });
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token) {
            userAuthenticated();
        }
        
      },[])
    useEffect(() => {
        if(authenticated){
            props.history.push('/');
        }
    }, [authenticated,props.history]);
    return ( 
        <Fragment>
            <NavBar/>
            <main id="signup">
            <div className="container">
            
            <div className="form-divider">
            <h2>Sign UP</h2>
            <form onSubmit={formik.handleSubmit}>
            {message && <Alert/>}
                <div className="form-grid">
                    <div className="input-grid">
                    <label className="" htmlFor="email">Email</label>
                        <input 
                                type="email"
                                id="email"
                                placeholder="Enter your email"
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
                    <label className="" htmlFor="email">password</label>
                        <input 
                            type="password"
                            placeholder="Enter a complex password"
                            id="password"
                            
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                            {formik.touched.password && formik.errors.password ?(
                                <div className="error-ok">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ): null}
                    </div>
                    <div className="campo-button boton">
                        <button
                            type="submit"
                            className="btn-primary"
                           
                        >Sign Up</button>
                    </div>
    
                </div>
              </form> 
            </div>
            
            </div> 
        </main>

        </Fragment>
     );
}
 
export default SignUp;