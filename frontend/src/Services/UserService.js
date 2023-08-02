import axios from 'axios';


export default class UserService {
    constuctor () {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_API_LOGIN + '/api'
        })
    }

    async login (dados) { 
        const {data} = await this.axios('/login', dados)

        if (data) {
            localStorage.setItem("nome", data.user.name)
            localStorage.setItem("email", data.user.email)
            localStorage.setItem("token", data.token.token)
      
            return true
    }
    return
}
}