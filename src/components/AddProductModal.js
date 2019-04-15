import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image, TextInput } from "react-native";
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-picker';
import Input from "./Input";
import Button from "./Button";
import UserStore from "../stores/UserStore";
import ProductStore from "../stores/ProductStore";
import rootStores from "../stores";


const userStore = rootStores[UserStore];
const productStore =rootStores[ProductStore];
export default class AddProductModal extends Component {
  state = {
    isModalVisible: false, productImage: require('../assets/uploadImage.png'), name: 'a', category: 'a', description: 'a', price: 1
  };

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    handleChoosePhoto = () => {
        const options = {
          noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
          if (response.uri) {
            this.setState({ productImage: response })
          }
        })
      }

      addProduct = () => {
          console.log('user::', userStore.getCurrentUser())
          product = {
              username: userStore.getCurrentUser().username,
              name: this.state.name,
              category: this.state.category,
              description: this.state.description,
              price: this.state.price,
              image: this.state.productImage
          }
          console.log(product)
          productStore.createNewProduct(product).then( response => console.log(response))
                                                .catch( error => console.log(error))
          this.props.closeModal()
      }

  render() {
    return (
        <View style={{ }}>
                <Modal isVisible={this.props.isModalVisible} style={{backgroundColor: 'white', width: 390, height: '70%', margin: 10, justifyContent: 'flex-start'}}>
                    <View>
                        <TouchableOpacity onPress={this.handleChoosePhoto}>
                            <View style={[ styles.center, styles.vMargin ]}>
                                <Image source={require('../assets/uploadImage.png')} style={{ width: 80, height: 80 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={[ styles.center, styles.vMargin ]}>
                            <Input placeholder={'Product name'} value={this.state.name} onChangeText={ (name) => this.setState({  name }) }/>
                        </View>
                        <View style={[ styles.center, styles.vMargin ]}>
                            <Input placeholder={'Category'} value={this.state.category} onChangeText={ (category) => this.setState({  category }) }/>
                        </View>
                        <View style={[ styles.center, styles.vMargin ]}>
                            <Input placeholder={'Description'} value={this.state.description} onChangeText={ (description) => this.setState({  description }) }/>
                        </View>
                        <View style={[ styles.center, styles.vMargin ]}>
                            <Input placeholder={'Price per day'} value={this.state.price} onChangeText={ (price) => this.setState({  price }) }/>
                        </View>
                    </View>
                    <View style={[ styles.center ]}>
                        <Button height={60} width={150} label={'ADD PRODUCT'} onPress={() => this.addProduct()}/>
                    </View>
                 
                </Modal>
        </View>
     
    );
  }
}


const styles = {
    center: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    vMargin: {
        marginVertical: 10
    },
    imageConteiner: {
        justifyContent: 'flex-end', 
        alignItems: 'center'
    },
    imageSize: {
         width: '100%',
         height: 350
    }

}