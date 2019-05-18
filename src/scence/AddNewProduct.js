
import React , { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import Input from '../components/Input';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header';
import UserStore from '../stores/UserStore';
import rootStores from '../stores';
import { observer } from 'mobx-react';
import ImagePicker from 'react-native-image-picker';
import ProductStore from "../stores/ProductStore";



const productStore =rootStores[ProductStore];
const userStore = rootStores[UserStore];
@observer
export default class AddNewProduct extends Component {

    constructor(props){
        super(props)
        this.state = { name: '', category: '',price: '',description:'', images: new Array(3), plans:{}, uploadImage: require('../assets/photo.png') }
    }
    imageIndex = 0

    handleChoosePhoto = () => {
        const options = {
          noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            buffer = this.state.images.slice(0)
            buffer[imageIndex] = response
          if (response.uri) {
            this.setState({ images: buffer }, () => imageIndex++)
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
            images: this.state.productImage
        }
        console.log(product)
        productStore.createNewProduct(product).then( response => Actions.store())
                                              .catch( error => console.log(error))
      }
      

    render() {
        return(
            <ScrollView style={{ backgroundColor: 'white'}}>
               <Header back headerText={'SEMI'} onPress={ () => Actions.store()}/>
               <View style={[ styles.center, {marginVertical:10} ]}>
                   <Text style={{ fontSize:20, fontWeight:'bold'}}>ADD PRODUCT</Text>
               </View>
               <View style={{ flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity onPress={this.handleChoosePhoto}>
                        <View style={[ styles.center, styles.vMargin , {marginHorizontal: 10}]}>
                            <Image source={require('../assets/photo.png')} style={{ width: 80, height: 80 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleChoosePhoto}>
                        <View style={[ styles.center, styles.vMargin , {marginHorizontal: 10}]}>
                            <Image source={require('../assets/photo.png')} style={{ width: 80, height: 80 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleChoosePhoto}>
                        <View style={[ styles.center, styles.vMargin , {marginHorizontal: 10}]}>
                            <Image source={require('../assets/photo.png')} style={{ width: 80, height: 80 }} />
                        </View>
                    </TouchableOpacity>
               </View>
               
               <View>
                   <View style={[ styles.center, styles.vMargin ]}>
                       <Input placeholder={'Product Name'} value={this.state.email} onChangeText={ (name) => this.setState({  name }) }/>
                   </View>
                   <View style={[ styles.center, styles.vMargin ]}>
                       <Input placeholder={'Category'} value={this.state.password} onChangeText={ (category) => this.setState({  category }) }/>
                   </View>
                   <View style={[ styles.center, styles.vMargin ]}>
                       <Input placeholder={'Discription'} value={this.state.address} onChangeText={ (description) => this.setState({  description }) }/>
                   </View>
                   <View style={[ styles.center, styles.vMargin ]}>
                       <Input placeholder={'Price per day'} value={this.state.firstname} onChangeText={ (price) => this.setState({  price }) }/>
                   </View>                  
               </View>
               <View style={[ styles.center]}>
                   <Button height={40} width={100} label={'ADD'} onPress={ () => this.addProduct()}/>
               </View>

           </ScrollView>
        );

    }

}

const styles = {
    conteinerStyle: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10,
        width: '90%'
    },
    conteinerStyle1: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10,
        width: '90%',
        height: 200
    },
    center: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    textStyle: {
        color: 'white'
    },
    vMargin:{
        marginVertical:10
    }
}
