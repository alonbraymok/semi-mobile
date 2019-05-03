import axios from 'axios';


 class ProductService {

    getAllCategoties = () => {
        console.log('herer')
        return axios.get('http://semi.webo-tech.com/api/products/categories')
    }
    getAllNameOfProductsCategory = (category) => {
        console.log('categort before search::0', category)
        return axios.get(`http://semi.webo-tech.com/api/products/by-category/${category.name}`)
    }

    rentProduct = (product, user) => {
        body = { product, user}
        return axios.post('http://192.168.68.102:3000/api/products/rentProduct', body)
    }
    createNewProduct = (product) => {
        body = { ...product }   
        return axios.post('http://semi.webo-tech.com/api/products/', body)
    }
    deleteProductFromStore = (userId, productId) => {
        body = {userId, productId }
        return axios.post('http://192.168.68.102:3000/api/products/create', body)
    }
    editProduct = (userId, product) => {
        body = {userId, product }
        return axios.post('http://192.168.68.102:3000/api/products/edit', body)
    }
    searchProducts = (product) => {
        body = { ...product }   
        return axios.post('http://semi.webo-tech.com/api/products/search', body)
    }
    addReview = (review) => {
        body = { ... review }
        return  axios.post('http://semi.webo-tech.com/api/products/review', body)
    }
    deleteProduct = (productID) => {
        body = { ...productID }
        return  axios.post('http://semi.webo-tech.com/api/products/addReview', body)
    }

    

}
export default new ProductService();