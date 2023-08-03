import axios from 'axios';

 class UserService {
    constructor () {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_API_LOGIN 
        });
    }

    async login(dados) {
        try {
        const response = await this.axios.post('/auth', dados);
        const { data } = response;

        if (data.token) {
            localStorage.setItem("name", data.user.name);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("token", data.token.token);
            return true;
    }
    return false;
    }catch (error) {
    console.error('Erro ao fazer login', error);
    return false;
  }
}

async register (dados) {
    try {
        const response = await this.axios.post('/users', dados);
         const { data } = response;

         if (data && data.user && data.token) {
            localStorage.setItem("name", data.user.name);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("token", data.token.token);
            return true;
          }
          return false;
        } catch (error) {
          console.error('Erro ao fazer registro do usuário', error);
          return false;
        }
      }
    

authenticatedUser  () {
    return localStorage.getItem("token") !== null;
}

    logout () {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
}
}
const userService = new UserService();
export default userService;