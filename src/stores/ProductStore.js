
import ProductService from "../services/ProductService";
import {observable, action} from 'mobx'



class ProductStore {
    
   
    
    @observable productBuffer

    @action
    getAllCategoties = () => {
        console.log('herer1')
        return ProductService.getAllCategoties()
    }

    createNewProduct = (product) => {
        return ProductService.createNewProduct(product)
    }
    getAllNameOfProductsCategory = (category) => {
        return ProductService.getAllNameOfProductsCategory(category)
    }
    getAllUserProduct = (username) => {
        return ProductService.getAllUserProduct(username)
    }
    @action
    setProductBuffer = (product) => {
        this.productBuffer = product
    }
    @action
    getProductBuffer = () => {
        return this.productBuffer
    }
    searchProducts = (product) => {
        return ProductService.searchProducts(product)
    }
    addReview = (review) => {
        return ProductService.addReview(review)
    }
    deleteProduct = (productID) => {
        return ProductService.deleteProduct(productID)
    }
    
}

export default ProductStore;