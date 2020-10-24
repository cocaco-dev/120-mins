import React, {useContext} from 'react';
import authContext from '../context/auth/authContext'


const Alerta = () => {

    const AuthContext = useContext(authContext);
    const {message} = AuthContext;
    return ( 
        <div >
            <ul className="error-ok ul-error">
            {
            message.map(msg => (<li>{msg}</li>)) 
            }
            </ul>

        </div>
     );
}
 
export default Alerta;