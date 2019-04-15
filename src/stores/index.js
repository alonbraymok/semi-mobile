import ProductStore from "./ProductStore";
import UserStore from "./UserStore";

const productStore = new ProductStore();
const userStore = new UserStore();

const rootStores = {
    [ProductStore]:productStore,
    [UserStore]:userStore
}

export default rootStores;