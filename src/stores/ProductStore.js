
import ProductService from "../services/ProductService";

class ProductStore {
    
    currentUser

    getCurrentUser = () => {
        return this.currentUser
    }
    setCurrentUser = (data) => {
        this.currentUser = data
    }
    getAllCategoties = () => {
        return ProductService.getAllCategoties()
    }
    
}

export default new ProductStore()