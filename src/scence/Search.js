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
        this.state = { categorys: [], productName: '', productsCategory: '', leftValue: 0, rightValue: 0.5, sliderValues:[1000,8000], searchedProduct:[] }
    }

    componentWillMount = () => {
        productStore.getAllCategoties()
        .then( res => { this.setState({ category: res.data.data })})
        .catch( err => console.log(err))
    }
    
    getAllNameOfProductsCategory = (category) => {
      productStore.getAllNameOfProductsCategory(category).then( (response) => {
          this.setState({categorys: response.data.data })
          .catch( (error) => console.log(error))
      })
    }
    items = [
        {
          id: 1,
          name: 'JavaScript',
        },
        {
          id: 2,
          name: 'Java',
        },
        {
          id: 3,
          name: 'Ruby',
        },
        {
          id: 4,
          name: 'React Native',
        },
        {
          id: 5,
          name: 'PHP',
        },
        {
          id: 6,
          name: 'Python',
        },
        {
          id: 7,
          name: 'Go',
        },
        {
          id: 8,
          name: 'Swift',
        },
      ];

      products = [
        {id:'dsadvasdasd', name: 'prodcxvuct name', category: 'category', description: 'product dcxviscription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        {id:'dsadasdasd', name: 'product zxcvzxcname', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        {id:'dsadasdasd', name: 'product name', category: 'catzxcvegory', description: 'product discxzcvription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        {id:'dsadasdasd', name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        {id:'dsadasdasd', name: 'productcxvzxcv name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        {id:'dsadasdasd', name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        {id:'dsadasdasd', name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        {id:'dsadasdasd', name: 'productxczvxcv name', category: 'category', description: 'produxcvct discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        {id:'dsadasdasd', name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        {id:'dsadasdasd', name: 'product name', category: 'categcxvzory', description: 'product cxzdiscription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        {id:'dsadasdasd', name: 'product cxzvcxvname', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        {id:'dsadasdasd', name: 'product name', category: 'category', description: 'product dicxvzxscription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        {id:'dsadasdasd', name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},

    ]

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
    

    renderItem = (item) => {
        return(
            <View style={{borderTopWidth: 1 }}>
                  <View style={{ flexDirection: 'row'}}>
                   <View style={{ margin: 10}}>
                        <Image source={{ uri: item.item.image}} style={{ height: 200, width: 150}} />
                   </View>
                   <View style={{ margin: 20}}>
                       <View style={[ styles.textMargin ]}>
                            <Text style={[ styles.textStyle ]}>{item.item.name}</Text>
                       </View>
                       <View style={[ styles.textMargin , {flexDirection: 'row'} ]}>
                            <Text style={[ styles.textStyle ]}>{item.item.category}</Text>
                            
                       </View>
                       <View style={[ styles.textMargin ]}>
                            <Text style={[ styles.textStyleSmaller ]}>{item.item.description}</Text>
                       </View>
                       <View style={[ styles.textMargin , {width: 200} ]}>
                            <Text style={[ styles.textStyleSmaller ]}>price per day: {item.item.price} $</Text>
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
           <ScrollView style={{ backgroundColor: 'white'}}>
               <Header clean headerText={'SEMI'} />
               
               <View>
                  <SearchableDropdown
                    onTextChange={text => console.log(text)}
                    onItemSelect={item => this.setState({ productsCategory: item })}
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
                    items={this.items}
                    defaultIndex={2}
                    placeholder="Category"
                    resetValue={false}
                    underlineColorAndroid="transparent"
                  />
               </View>
               <View>
                  <SearchableDropdown
                    onTextChange={text => console.log(text)}
                    onItemSelect={item => this.setState({ productName: item })}
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
                    items={this.items}
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
                <ScrollView>
                  <FlatList 
                      data={this.products}
                      renderItem={ (item) => this.renderItem(item)}
                  />
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
