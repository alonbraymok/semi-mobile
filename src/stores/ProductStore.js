
import ProductService from "../services/ProductService";
import {observable} from 'mobx'


class ProductStore {
    
    @observable currentUser

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