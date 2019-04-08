import axios from 'axios';


 class ProductService {

    getAllCategoties = () => {
        return axios.get('http://193.106.55.125/api/products/by-category/tools')
    }
    getAllProductCategoties = (category) => {
        return axios.get(`http://192.168.68.102:3000/api/products/getAllProductCategoties/${category}`)
    }

    rentProduct = (product, user) => {
        body = { product, user}
        return axios.post('http://192.168.68.102:3000/api/products/rentProduct', body)
    }
    addNewProduct = (userId, product) => {
        body = {userId, product }
        return axios.post('http://192.168.68.102:3000/api/products/create', body)
    }
    deleteProductFromStore = (userId, productId) => {
        body = {userId, productId }
        return axios.post('http://192.168.68.102:3000/api/products/create', body)
    }
    editProduct = (userId, product) => {
        body = {userId, product }
        return axios.post('http://192.168.68.102:3000/api/products/edit', body)
    }

    

}
export default new ProductService();