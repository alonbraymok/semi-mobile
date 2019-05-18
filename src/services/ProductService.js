import axios from 'axios';

const URL = 'http://semi.webo-tech.com/api/products'
const URL_ORDER = 'http://semi.webo-tech.com/api/orders'

 class ProductService {

    getAllCategoties = () => {
        console.log('herer')
        return axios.get(`${URL}/categories`)
    }
    getAllNameOfProductsCategory = (category) => {
        console.log('categort before search::0', category)
        return axios.get(`http://semi.webo-tech.com/api/products/by-category/${category.name}`)
    }

    getAllUserProduct = (username) => {
        console.log('url::',`http://semi.webo-tech.com/api/users/products/${username}` )
        return axios.get(`http://semi.webo-tech.com/api/users/products/${username}`)
    }

    rentProduct = (product, user) => {
        body = { product, user}
        return axios.post(`${URL}/rentProduct`, body)
    }
    createNewProduct = (product) => {
        body = { ...product }   
        return axios.post('http://semi.webo-tech.com/api/users/product', body)
    }
    
    editProduct = (userId, product) => {
        body = {userId, product }
        return axios.post(`${URL}/edit`, body)
    }
    searchProducts = (product) => {
        body = { ...product }   
        return axios.post(`${URL}/search`, body)
    }
    addReview = (review) => {
        body = { ... review }
        return  axios.post(`${URL}/review`, body)
    }
    deleteProduct = (productID) => {
        return  axios.delete(`${URL}/${productID}`)
    }
    getProductOrder = (id) => {
        return axios.get(`${URL_ORDER}/${id}`) 
    }
    confirmOrder = (orderId,providerName) => {
        body = { orderId, providerName, accepted: 'handled' }
        console.log({body})
        return axios.put(`${URL_ORDER}/accept/`, body)
    }
    canselOrder = (orderId,providerName) => {
        body = { orderId, providerName, accepted: 'rejected' }
        return axios.put(`${URL_ORDER}/accept/`, body)
    }

}
export default new ProductService();