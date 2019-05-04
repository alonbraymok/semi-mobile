import axios from 'axios';

const URL = 'http://semi.webo-tech.com/api/products'

 class ProductService {

    getAllCategoties = () => {
        console.log('herer')
        return axios.get(`${URL}/categories`)
    }
    getAllNameOfProductsCategory = (category) => {
        console.log('categort before search::0', category)
        return axios.get(`http://semi.webo-tech.com/api/products/by-category/${category.name}`)
    }

    rentProduct = (product, user) => {
        body = { product, user}
        return axios.post(`${URL}/rentProduct`, body)
    }
    createNewProduct = (product) => {
        body = { ...product }   
        return axios.post(`${URL}/`, body)
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

    

}
export default new ProductService();