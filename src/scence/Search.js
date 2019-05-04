import React , { Component } from 'react'
import { View, Image, TextInput, TouchableOpacity, Text, FlatList, ScrollView} from 'react-native'
import Input from '../components/Input';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header';
import SearchableDropdown from 'react-native-searchable-dropdown';

import Slidder from '../components/Slidder';

import ProductStore from '../stores/ProductStore';
import rootStores from '../stores';
import { observer } from 'mobx-react';


const productStore = rootStores[ProductStore];
@observer
export default class Search extends Component {

    constructor(props){
        super(props)
        this.state = {names: [], category:[], categorys: [], productName: '', productsCategory: '', leftValue: 0, rightValue: 0.5, sliderValues:[1000,8000], searchedProduct:[] }
    }

    componentWillMount = () => {
        productStore.getAllCategoties()
        .then( res => { this.setState({ category: res.data.data }, () => this.setCategories() )  })
        .catch( err => console.log(err))
    }
    
    setCategories = () => {
      buffer=[]
      this.state.category.forEach(item => {
        category = {
          id: 1,
          name: item,
        }
        buffer.push(category)
      })
      this.setState({ category: buffer }, () => console.log('cat',this.state))
      
    }

    setCategory = (category) => {
      this.setState({ productsCategory: category }, () => {
        this.getAllNameOfProductsCategory(this.state.productsCategory)
      })
    }

    getAllNameOfProductsCategory = (category) => {
      console.log('---')
      productStore.getAllNameOfProductsCategory(category).then( (response) => {
        console.log('res::', response)
        this.setProdectName(response.data.data)
        this.setState({ searchProducts: response.data.data}, ()=> console.log('sta?', this.state))
          .catch( (error) => console.log(error))
      })
    }

    setProdectName = (array) => {
      buffer=[]
      array.forEach( (item) => {
        name = {
          id: 1,
          name: item.name
        }
        buffer.push(name)
      })
      this.setState({ names: buffer})
    }
    

    setSliderValues = (value) => {
      this.setState({ sliderValues : value})
    }

    _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

    searchPressed = () => {
      product = {
        name: this.state.productName.name,
        category: this.state.productsCategory.name,
        minPrice: this.state.sliderValues[0],
        maxPrice: this.state.sliderValues[1]
      }
      console.log('search this product::', product)
      productStore.searchProducts(product).then( response => {
        this.setState({ searchedProduct: response.data.data })
      }).catch( error => console.log(error))
      console.log('search pressed')
    }
    
    goToProductPage = (product) =>{
      productStore.setProductBuffer(product)
      Actions.prodectPage({product})
    }

    moveToProductOwnerProfile = (username) => {
      console.log(username)
      Actions.profile({ otherUser: 'alonbraymokk' })
    }
    
    findProduct = (productName) => {
      buffer = []
      this.setState({ productName }, () => {
        buffer = this.state.searchProducts.filter( (item) => item.name === productName.name)

      })
      this.setState({ searchProducts: buffer})
    }

    renderItem = (item) => {
      console.log('item::', item)
        return(
            <View style={{borderTopWidth: 1 }}>
                  <View style={{ flexDirection: 'row'}}>
                   <View style={{ margin: 10}}>
                   <TouchableOpacity onPress={ () => this.moveToProductOwnerProfile('tom lochi')}>
                        <Image source={{ uri: 'https://images.ctfassets.net/mx6ynh02r1ko/1AyjchEw0Q4OWUgAwy2yqG/55c6e32e8f63eb209f9a3112dd0f63aa/DE1A2564.jpg'}} style={{ height: 200, width: 150}} />
                   </TouchableOpacity>
                   </View>
                   <View style={{ margin: 20}}>
                       <View style={[ styles.textMargin ]}>
                            <Text style={[ styles.textStyle ]}>{item.item.name}</Text>
                       </View>
                       <View style={[ styles.textMargin , {flexDirection: 'row'} ]}>
                            <Text style={[ styles.textStyle ]}>{item.item.category.name}</Text>
                            
                       </View>
                       <View style={[ styles.textMargin ]}>
                            <Text style={[ styles.textStyleSmaller ]}>{item.item.description}</Text>
                       </View>
                       <View style={[ styles.textMargin , {width: 200} ]}>
                            <Text style={[ styles.textStyleSmaller ]}>price per day: {item.item.plans[0].price} $</Text>
                       </View>
                       <View>
                           <Button height={40} width={60} label={'Rent'} onPress={ () => this.goToProductPage(item.item)}/>
                       </View>
                           
                   </View>
               </View>
            </View>
        )
    }

    render() {
        return(
           <ScrollView style={{ backgroundColor: 'white'}} nestedScrollEnabled>
               <Header clean headerText={'SEMI'} />
               
               <View>
                  <SearchableDropdown
                    onTextChange={text => this.setState({ productsCategory: text })}
                    onItemSelect={item => this.setCategory(item)}
                    containerStyle={{ padding: 5 }}
                    textInputStyle={{
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    }}
                    itemStyle={{
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: '#ddd',
                      borderColor: '#bbb',
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={this.state.category}
                    defaultIndex={2}
                    placeholder="Category"
                    resetValue={false}
                    underlineColorAndroid="transparent"
                  />
               </View>
               <View>
                  <SearchableDropdown
                    onTextChange={text => this.setState({ productsCategory: text })}
                    onItemSelect={item => this.findProduct(item)}
                    containerStyle={{ padding: 5 }}
                    textInputStyle={{
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    }}
                    itemStyle={{
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: '#ddd',
                      borderColor: '#bbb',
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={this.state.names}
                    defaultIndex={2}
                    placeholder="Product name"
                    resetValue={false}
                    underlineColorAndroid="transparent"
                  />
               </View>

               <View>
                    <Slidder values={this.state.sliderValues} onSlide={ this.setSliderValues} />
              </View>
              <View style={[ styles.center, { margin: 10} ]}>
                    <Button width={200} height={50} label={'Search'} onPress={ () => this.searchPressed()} />
              </View>

              <View>
                <ScrollView nestedScrollEnabled>
                    <View>

                  <FlatList 
                      data={this.state.searchProducts}
                      renderItem={ (item) => this.renderItem(item)}
                      extraData={this.state}
                      />
                    </View>
                  </ScrollView>
              </View>
              


           </ScrollView>
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
        height: '70%'
    },
    textInput:{
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    itemStyle:{
        padding: 10,
        marginTop: 2,
        backgroundColor: '#ddd',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 5,
    }

}
