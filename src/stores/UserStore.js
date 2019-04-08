

class UserStore {
    
    currentUser


    getCurrentUser = () => {
        return this.currentUser
    }
    setCurrentUser = (data) => {
        this.currentUser = data
    }
    
}

export default UserStore();