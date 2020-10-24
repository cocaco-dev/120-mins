import React ,{useReducer} from 'react'
import authContext from './authContext';

import authReducer from './authReducer';
import { 
    SIGNIN_ERROR,
    SIGNIN_SUCCESS,
    SIGNUP_ERROR,
    SIGNUP_SUCCESS,
    USER_AUTHENTICATED,
    CLEAR_ALERT,
    
    LOGOUT
} from '../../types'

import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({children}) => {
    const initialState = {
        token: localStorage.getItem('token') || null,
        authenticated: null,
        user: null,
        message: []
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const signUpUser = async data => {
        try {
            const response = await axiosClient.post('/api/user/signup', data);
            
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: response.data.token
            });
            setTimeout(() => {
                dispatch({
                    type:CLEAR_ALERT
                })
            },3000)

        } catch (error) {
            let errorsArray = error.response.data.errors.map(er => er.message)
            dispatch({
                type:SIGNUP_ERROR,
                payload: errorsArray

            });
            setTimeout(() => {
                dispatch({
                    type:CLEAR_ALERT
                })
            },3000)
        }
    }
    const signInUser = async data => {

        try {
            const response = await axiosClient.post('/api/user/signin', data);
            dispatch({
                type: SIGNIN_SUCCESS,
                payload: response.data.token
            });
            setTimeout(() => {
                dispatch({
                    type:CLEAR_ALERT
                })
            },3000)

        } catch (error) {
            let errorsArray = error.response.data.errors.map(er => er.message)
            dispatch({
                type:SIGNIN_ERROR,
                payload: errorsArray

            });
            setTimeout(() => {
                dispatch({
                    type:CLEAR_ALERT
                })
            },3000)
        }
    }
    //refresh jwt 
    const userAuthenticated = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token)
        }
        try {
            
            const response = await axiosClient.get('/api/user');
            console.log(response.data.user)
            if(response.data.user){
               
                dispatch({
                    type: USER_AUTHENTICATED,
                    payload: response.data.user
                })
            }

        } catch (error) {
            let errorsArray = error.response.data.errors.map(er => er.message)
            dispatch({
                type:SIGNIN_ERROR,
                payload: errorsArray

            });
            setTimeout(() => {
                dispatch({
                    type:CLEAR_ALERT
                })
            },3000)
        }
    }

    const logout = () => {
        dispatch({
            type: LOGOUT,
           
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                signInUser,
                signUpUser,
                logout,
                userAuthenticated
            
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;