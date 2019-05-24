import React, { Component } from 'react'
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView,Text, FlatList, TouchableOpacity } from 'react-native'
import Button from './Button';
import RatingStar from './RatingStar';
import { Actions } from 'react-native-router-flux';
const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

const images = [
  'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
  'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
]


import rootStores from '../stores';
import {observer} from 'mobx-react'
import ProductStore from '../stores/ProductStore';



const productStore = rootStores[ProductStore];
@observer 
export default class Carousel extends Component {

    constructor(props){
        super(props)
        console.log('carousel props::', this.props)
    }

    moveToProductOwnerProfile = (username) => {
      console.log(username)
      Actions.profile({ otherUser: username })
    }
  
  products = this.props.products 
  numItems = this.props.products.length
  itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
  animVal = new Animated.Value(0)

  goToProductPage = (product) =>{
    productStore.setProductBuffer(product)
    Actions.prodectPage({product})
  }
  renderReview = (item) => {
    console.log('review:', item)
    return(
      <View  style={{ width: (deviceWidth - 60), padding:10}}>
         <View style={{ borderWidth: 0.5, borderColor: '#0843a3', borderRadius:5, flexDirection: 'row'}}>
              <View style={{margin: 5}}>
              <TouchableOpacity onPress={ () => this.moveToProductOwnerProfile(item.item.creator.username)}>
                  <Image source={{ uri: item.item.creator.profile_image}} style={{ width:20, height:20, marginLeft:15, borderRadius: 10}} />
              </TouchableOpacity>
                  <Text style={{textAlign:'center', fontWeight:'bold'}}>{item.item.creator.username}</Text>
              </View>
              <View style={[ ]}>
                  <Text style={{textAlign:'center', fontWeight:'bold', fontSize:15, marginLeft: 32}}>{item.item.content}</Text>
                  <RatingStar size={15}/>
              </View>
          </View>  
      </View>
    )
  }

  render() {
    let imageArray = []
    let barArray = []
    this.props.products.forEach((products, i) => {
      // console.log(products, i)
      name = products.name.substring(0,10)
      const thisImage = (
        <View nestedScrollEnabled>
        
            <Image key={`products${i}`} source={{uri: products.images[0]}} style={{ width: (deviceWidth - 60), height: 150 }} />
            <View style={{ flexDirection: 'row', width: (deviceWidth - 60), backgroundColor:'#eff9ff', borderRadius: 10, padding:10}}>
                <View>
                    <View style={{ width: 180, borderBottomWidth: 0.5, borderColor: '#0843a3', marginBottom: 5}}>
                        <Text style={{fontWeight: '700',fontSize:17}}>{name}..</Text>
                    </View>
                    <View style={{ width: 180, borderBottomWidth: 0.5, borderColor: '#0843a3', marginBottom: 5}}>
                        <Text style={{fontWeight: '500',fontSize:15}}>{products.category.name}</Text>
                    </View>
                    {/* <View style={{maxHeight: 10, maxWidth: 250}}>
                        <Text style={{fontWeight: 'bold'}}>{products.description}</Text>
                    </View> */}
                    <View style={{marginVertical: 10 ,maxWidth: 250}}>
                        <Text style={{fontWeight: 'bold'}}>{products.plans[0].price}$ for {products.plans[0].period} days</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'flex-end', alignItems:'center', marginLeft: 5}}>
                    <Button height={50} width={100} label={'RENT!'} onPress={ () => this.goToProductPage(products)}/>
                </View>
            </View>
            <View style={{maxHeight: 150, marginTop: 5}}>
              <ScrollView style={{backgroundColor:'#e8f6ff', borderRadius: 10}} nestedScrollEnabled>
                  <FlatList 
                      data={products.reviews}
                      renderItem={ (item) => this.renderReview(item)}
                  />
              </ScrollView>
            </View> 
        </View>
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [(deviceWidth - 60) * (i - 1), (deviceWidth - 60) * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      })

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View

            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      )
      barArray.push(thisBar)
    })

    return (
      <View
        style={styles.container}
        
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
            )
          }
        >

          {imageArray}

        </ScrollView>
        <View
          style={styles.barContainer}
        >
          {barArray}
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    
    alignItems: 'center',
    justifyContent: 'center',
    height: 350,
    width: 300
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 40,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: '#5294d6',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
})