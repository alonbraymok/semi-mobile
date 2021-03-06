import axios from 'axios';

const URL_AUTH = 'http://semi.webo-tech.com/api/auth'
const URL_USERS = 'http://semi.webo-tech.com/api/users'
const URL_ORDER = 'http://semi.webo-tech.com/api/orders'
 class UserService {

    
    signin = (email, password) => { 
              
        const body = { email, password }
             return axios.post(`${URL_AUTH}/login`, body)
    }

    signup = (user) => { 
        const body = {...user }
            return axios.post(`${URL_AUTH}/register`, body)
    }
    logout = () => {       
        return axios.post(`${URL_AUTH}/logout`) 
    }
    getUserRentedList = (userID) => {
        return axios.get(`${URL_USERS}/getUserRentedList/${userID}`)
    }
    createStore = (store, userID) => {
        const body = {...store, userID }
        return axios.post(`${URL_USERS}/logout`, body) 
    }
    getUserByUserName = (username) => {
        return axios.get(`${URL_USERS}/${username}`)
    }
    setOrder = (providerName, consumerName, startDate, productId, plan) => {
        body = { providerName, consumerName,startDate, productId, plan }
        console.log('body::', body)
        return axios.post(`${URL_ORDER}`, body)
    }
    

}
export default new UserService();