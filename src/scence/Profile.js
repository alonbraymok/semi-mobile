import React , { Component } from 'react'
import { View, Image, TextInput, TouchableOpacity, Text, ScrollView} from 'react-native'
import Input from '../components/Input';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header';
import Carousel from '../components/Carousel';



export default class Profile extends Component {

    constructor(props){
        super(props)
        this.state = { email: 'Alonbraymok@gmail.com', address: 'Tel Aviv', name: 'Alon braymok', 
                       storeDescription: 'this is my store description  dsadas dsadasda dadadasdsa' ,profileImage: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4'}
    }

    products = [
        { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg',
         reviews: {name: 'eliran hasin', image: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4',content: 'a good shape product'}},
         { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg',
         reviews: {name: 'eliran hasin', image: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4',content: 'a good shape product'}},
         { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg',
         reviews: {name: 'eliran hasin', image: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4',content: 'a good shape product'}},
         { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg',
         reviews: {name: 'eliran hasin', image: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4',content: 'a good shape product'}},
         ]
 

    signUpPressed = () => {
        Actions.signup()
    }

    render() {
        return(
           <ScrollView>
               <Header search_hamburger headerText={'SEMI'} />
               <View style={{ flexDirection: 'row'}}>
                   <View style={{ margin: 10}}>
                        <Image source={{ uri: this.state.profileImage}} style={{ height: 200, width: 150, borderRadius: 10}} />
                   </View>
                   <View style={{ margin: 20}}>
                       <View style={[ styles.textMargin ]}>
                            <Text style={[ styles.textStyle ]}>{this.state.name}</Text>
                       </View>
                       <View style={[ styles.textMargin , {flexDirection: 'row'} ]}>
                            <Text style={[ styles.textStyle ]}>{this.state.address}</Text>
                            <View style={[ styles.center , {marginLeft: 10}]}>
                                <Image source={require('../assets/location.png')} style={[ styles.locationImage ]}/>
                            </View>
                       </View>
                       <View style={[ styles.textMargin ]}>
                            <Text style={[ styles.textStyleSmaller ]}>{this.state.email}</Text>
                       </View>
                       <View style={[ styles.textMargin , {width: 200} ]}>
                            <Text style={[ styles.textStyleSmaller ]}>{this.state.storeDescription}</Text>
                       </View>
                   </View>
               </View>
               <View style={[ styles.center]}>
                   <Text style={[ styles.storename ]}>My Store Name</Text>
               </View>
               <View style={[ styles.center ]}>
                   <Carousel products={this.products}></Carousel>
               </View>
               <View style={[ styles.center ]}>
                  <TouchableOpacity onPress={ () => Actions.store() }>
                      <Text style={{fontWeight: '600'}}>Check out my all products! </Text>
                  </TouchableOpacity>
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
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textMargin: {
        margin: 5
    },
    storename: {
        fontSize: 30,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    locationImage: {
        width: 10,
        height: 15
    },
    textStyleSmaller: {
        fontSize: 15,
    }

}
