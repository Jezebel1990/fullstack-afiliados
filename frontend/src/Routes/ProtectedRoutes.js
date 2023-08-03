import React from 'react';
import Routering from './routes'
import userService from "../Services/UserService";


const ProtectedRoutes = ({children}) => {
 const authenticatedUser = userService.authenticatedUser()
 console.log('authenticatedUser', authenticatedUser)
 return authenticatedUser ? children : <Routering/>
}

export default ProtectedRoutes;