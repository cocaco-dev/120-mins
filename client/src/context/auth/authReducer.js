import { 
    SIGNIN_ERROR,
    SIGNIN_SUCCESS,
    SIGNUP_ERROR,
    SIGNUP_SUCCESS,
    USER_AUTHENTICATED,
    CLEAR_ALERT,
    SHOW_ALERT, 
    LOGOUT
} from '../../types'

export default function authReducer(state, action) {
    switch(action.type) {

        case SIGNUP_ERROR:
        case SIGNIN_ERROR:
        return {
            ...state,
            message: [...state.message, ...action.payload]
        }
        case SIGNIN_SUCCESS:
        case SIGNUP_SUCCESS:
            localStorage.setItem('token', action.payload)
            return {
                ...state,
                token: action.payload,
                authenticated: true
            }
        case CLEAR_ALERT:
            return {
                ...state,
                message: []
            }
        case USER_AUTHENTICATED:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return{
                ...state,
                user:null,
                token:null,
                authenticated:null
            }
        default:
            return state;
    }
}