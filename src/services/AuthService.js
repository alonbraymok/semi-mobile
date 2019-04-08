import axios from 'axios';


 class AuthService {

    
    signin = (email, password) => {        
        const body = { email, password }
             return axios.post('http://192.168.68.102:3000/auth/login', body)
    }

    signup = (user) => {
        const body = { user }
            return axios.post('http://192.168.68.102:3000/auth/signup', body)
    }

    

}
export default new AuthService();