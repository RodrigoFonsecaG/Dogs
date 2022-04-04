import React from 'react';
import { Navigate } from 'react-router-dom';
import {UserContext} from '../../UserContext'

const ProtectedRoute = ({children}) => {
    const { login } = React.useContext(UserContext);

    console.log(login)

    // Se tiver login retorna o nosso conteudo, se não navega para /login
    return login ? <div>{children}</div> : <Navigate to="/login"/>
}

export default ProtectedRoute;


