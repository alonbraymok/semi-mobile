import React , { Component } from 'react'
import { View, Image, TextInput, TouchableOpacity, Text, FlatList, ScrollView} from 'react-native'
import Input from '../components/Input';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header';
import SearchableDropdown from 'react-native-searchable-dropdown';

import Slidder from '../components/Slidder';

import ProductStore from '../stores/ProductStore';
import ProductService from '../services/ProductService';
import axios from 'axios'

const productStore = ProductStore

export default class Search extends Component {

    constructor(props){
        super(props)
        this.state = { category: '', name: '', leftValue: 0, rightValue: 0.5,sliderValues:[0,0]}
    }

    componentWillMount = () => {
        console.log('here..00')
        axios.get('http://193.106.55.125/api/products/by-category/tools').then(res => console.log(res))
        .catch(err => console.log(err))
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
        { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
        { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'},
    ]

    setSliderValues = (value) => {
      this.setState({ sliderValues : value})
    }

    _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

    searchPressed = () => {
      console.log('search pressed')
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
                           <Button height={40} width={60} label={'Rent'} />
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
                    //onTextChange={text => alert(text)}
                    onItemSelect={item => alert(JSON.stringify(item))}
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
                    placeholder='Category'
                    resetValue={false}
                    underlineColorAndroid="transparent"
                />
               </View>
               <View>
               <SearchableDropdown
                    //onTextChange={text => alert(text)}
                    onItemSelect={item => alert(JSON.stringify(item))}
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
                    placeholder="Product Name"
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
