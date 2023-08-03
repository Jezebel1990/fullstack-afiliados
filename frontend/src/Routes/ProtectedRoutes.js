import React from 'react';
import Routering from './routes'
import UserServices from '../Services/UserService';

const userService = new UserServices();

const ProtectedRoutes = ({children}) => {
 const authenticatedUser = userService.authenticatedUser()
 console.log('authenticatedUser', authenticatedUser)
 return authenticatedUser ? children : <Routering/>
}

export default ProtectedRoutes;