import React, { Component } from 'react'
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView,Text, FlatList } from 'react-native'
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
        console.log('props::', this.props)
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
    return(
      <View>
         <View style={{ borderWidth: 0.5, borderColor: '#0843a3', borderRadius:5, flexDirection: 'row'}}>
              <View style={{margin: 5}}>
                  <Image source={{ uri: item.item.creator.profile_image}} style={{ width:20, height:20, marginLeft:15, borderRadius: 10}} />
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
      const thisImage = (
        <View>
            <Image key={`products${i}`} source={{uri: products.image}} style={{ width: deviceWidth, height: 150 }} />
            <View style={{ flexDirection: 'row', width: deviceWidth}}>
                <View>
                    <View>
                        <Text>{products.name}</Text>
                    </View>
                    <View>
                        <Text>{products.category.name}</Text>
                    </View>
                    <View>
                        <Text>{products.description}</Text>
                    </View>
                    <View>
                        <Text>Price per day: {products.retail_price}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', marginLeft: 50}}>
                    <Button height={50} width={100} label={'RENT!'} onPress={ () => this.goToProductPage(products)}/>
                </View>
            </View>
            <View>
              <ScrollView>
                  <FlatList 
                      data={products.reviews}
                      renderItem={ (item) => this.renderReview(item)}
                  />
              </ScrollView>
            </View> 
            {/* <View style={{ borderWidth: 0.5, borderColor: '#0843a3', borderRadius:5, flexDirection: 'row'}}>
                <View style={{margin: 5}}>
                    <Image source={{ uri: products.reviews.image}} style={{ width:20, height:20, marginLeft:15, borderRadius: 10}} />
                    <Text style={{textAlign:'center', fontWeight:'bold'}}>{products.reviews.name}</Text>
                </View>
                <View style={[ ]}>
                    <Text style={{textAlign:'center', fontWeight:'bold', fontSize:15, marginLeft: 32}}>{products.reviews.content}</Text>
                    <RatingStar size={15}/>
                </View>
            </View>   */}
        </View>
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
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
    height: 300,
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