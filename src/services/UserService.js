import axios from 'axios';


 class UserService {

    
    signin = (email, password) => { 
              
        const body = { email, password }
             return axios.post('http://semi.webo-tech.com/api/auth/login', body)
    }

    signup = (user) => {
        console.log(user)
        console.log('herre') 
        const body = {...user }
            return axios.post('http://semi.webo-tech.com/api/auth/register', body)
    }
    logout = () => {       
        return axios.post('http://semi.webo-tech.com/api/auth/logout') 
    }
    getUserRentedList = (userID) => {
        return axios.get(`http://semi.webo-tech.com/api/auth/getUserRentedList/${userID}`)
    }
    createStore = (store, userID) => {
        const body = {...store, userID }
        return axios.post('http://semi.webo-tech.com/api/auth/logout', body) 
    }

    

}
export default new UserService();