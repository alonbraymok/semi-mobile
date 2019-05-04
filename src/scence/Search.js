import React , { Component } from 'react'
import { View, Image, TextInput, TouchableOpacity, Text, FlatList, ScrollView} from 'react-native'
import Input from '../components/Input';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header';
import SearchableDropdown from 'react-native-searchable-dropdown';
import RatingStar from '../components/RatingStar'
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
      Actions.profile({ otherUser: username })
    }
    
    findProduct = (productName) => {
      buffer = []
      this.setState({ productName }, () => {
        buffer = this.state.searchProducts.filter( (item) => item.name === productName.name)

      })
      this.setState({ searchProducts: buffer})
    }

    renderOneReview = (reviews) => {
      if(reviews[0] !== undefined){
        return(
        <View>
          <View style={{ borderWidth: 0.5, borderColor: '#0843a3', borderRadius:5, flexDirection: 'row', backgroundColor:'#e8f6ff'}}>
               <View style={{margin: 5}}>
               <TouchableOpacity onPress={ () => this.moveToProductOwnerProfile(reviews[0].creator.username)}>
                   <Image source={{ uri: reviews[0].creator.profile_image}} style={{ width:20, height:20, marginLeft:15, borderRadius: 10}} />
               </TouchableOpacity>
                   <Text style={{textAlign:'center', fontWeight:'bold'}}>{reviews[0].creator.username}</Text>
               </View>
               <View style={[ ]}>
                   <Text style={{textAlign:'center', fontWeight:'bold', fontSize:15, marginLeft: 32}}>{reviews[0].content}</Text>
                   <RatingStar size={10}/>
               </View>
           </View>  
       </View>
        )
      }
    }

    renderItem = (item) => {
      console.log('item::', item)

        return(
            <View style={{borderTopWidth: 1 }}>
                  <View style={{ flexDirection: 'row'}}>
                   <View style={{ margin: 10}}>
                   <TouchableOpacity onPress={ () => this.moveToProductOwnerProfile('tom lochi')}>
                        <Image source={{ uri: 'https://cdn.mec.ca/medias/sys_master/high-res/high-res/8796369977374/5044850-BK006.jpg'}} style={{ height: 200, width: 150}} />
                   </TouchableOpacity>
                   </View>
                   <View style={{ margin: 20, maxHeight: 250}}>
                       <View style={{ marginVertical: 3}}>
                            <Text style={{ fontWeight:'bold'}}>{item.item.name}</Text>
                       </View>
                       <View style={[ {marginVertical: 3,flexDirection: 'row'} ]}>
                            <Text style={{ fontWeight:'bold'}}>{item.item.category.name}</Text>
                            
                       </View>
                       <View style={{ marginVertical: 3, width: 150,maxHeight: 50}}>
                            <Text style={{ fontWeight:'bold'}}>{item.item.description}</Text>
                       </View>
                       <View style={[{marginVertical: 10,width: 200} ]}>
                            <Text style={{ fontWeight:'bold'}}>price per day: {item.item.plans[0].price} $</Text>
                       </View>
                       
                       <View style={{ alignItems:'flex-end', justifyContent:'flex-end', marginRight: 50, marginTop: 20}}>
                           <Button height={40} width={60} label={'Rent'} onPress={ () => this.goToProductPage(item.item)}/>
                       </View>
                           
                   </View>
               </View>
               <View style={{padding:5}}>
                  {this.renderOneReview(item.item.reviews)}
                </View>
            </View>
        )
    }

    render() {
        return(
           <ScrollView style={{ backgroundColor: 'white'}} nestedScrollEnabled>
               <Header back headerText={'SEMI'} onPress={ () => Actions.profile()}/>
               
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
