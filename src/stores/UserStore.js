import UserService from "../services/UserService";



class UserStore {
    
    constructor(){}

    currentUser


    getCurrentUser = () => {
        return this.currentUser
    }
    setCurrentUser = (data) => {
        this.currentUser = data
        console.log('store current user', this.currentUser)
    }

    signin = (email, password) => {    
           
             return UserService.signin(email, password)
    }

    signup = (user) => {
            return UserService.signup(user)
    }

    logout = () => {
            return UserService.logout()
    }
    getUserRentedList = () => {
        return UserService.getUserRentedList(userID)
    }
    createStore = (store) => {
        userID = this.currentUser.userID
        return UserService.createStore(store, userID)
    }
    
}

export default UserStore;