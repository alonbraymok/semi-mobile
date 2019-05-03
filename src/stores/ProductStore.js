
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
    
}

export default ProductStore;