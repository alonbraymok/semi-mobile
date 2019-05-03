import React , { Component } from 'react'
import { View, Image, TextInput, TouchableOpacity, Text, ScrollView} from 'react-native'
import Input from '../components/Input';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import SideBarMenu from '../components/SideBarMenu';
import UserStore from '../stores/UserStore';
import rootStores from '../stores';
import {observer} from 'mobx-react'


const userStore = rootStores[UserStore];
@observer 
export default class Profile extends Component {

    constructor(props){
        super(props)
        this.state = { user:'', email: 'Alonbraymok@gmail.com', address: 'Tel Aviv', name: 'Alon braymok', show: 'none', 
                       storeDescription: 'this is my store description  dsadas dsadasda dadadasdsa' ,profileImage: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4'}
    }

    componentDidMount = () => {
        this.setState({ user: userStore.getCurrentUser()}, ()=>console.log('user::',this.state.user)) 
    }

    products_to_rent = [
        { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg',
         reviews: {name: 'eliran hasin', image: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4',content: 'a good shape product'}},
         { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg',
         reviews: {name: 'eliran hasin', image: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4',content: 'a good shape product'}},
         { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg',
         reviews: {name: 'eliran hasin', image: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4',content: 'a good shape product'}},
         { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg',
         reviews: {name: 'eliran hasin', image: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4',content: 'a good shape product'}},
         ]
 
    taggleSideMenu = () =>{
        if(this.state.show === 'none'){
            this.setState({ show: 'flex' })
        }else{
            this.setState({ show: 'none'})
        }
        
    }
    
    signUpPressed = () => {
        Actions.signup()
    }

    render() {
        if(this.state.user){//this.state.user.store

            return(
                <ScrollView>
               <Header search_hamburger headerText={'SEMI'} onPressHamburger={ () => this.taggleSideMenu()} onPressSearch={ () => Actions.search() }/>
               <View>
               <View style={{ width: '50%', height: '100%', backgroundColor: '#0843a3', display: this.state.show, zIndex: 5}}>
                    <View>
                        <TouchableOpacity>
                            <Image source={{ uri: 'https://cdn0.iconfinder.com/data/icons/housing-interface-1/16/Power-512.png'}} style={{margin: 10, width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={{ margin: 10}}>
                            <TouchableOpacity onPress={ () => Actions.rentedList() }> 
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white'}}>My Renting</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ margin: 10}}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white'}}>My Payment </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
               </View>
               <View style={{ flexDirection: 'row'}}>
                   <View style={{ margin: 10}}>
                        <Image source={{ uri: this.state.profileImage}} style={{ height: 200, width: 150, borderRadius: 10}} />
                   </View>
                   <View style={{ margin: 20}}>
                       <View style={[ styles.textMargin ]}>
                            <Text style={[ styles.textStyle ]}>{this.state.user.first_name} {this.state.user.last_name}</Text>
                       </View>
                       <View style={[ styles.textMargin , {flexDirection: 'row'} ]}>
                            <Text style={[ styles.textStyle ]}>{this.state.address}</Text>
                            <View style={[ styles.center , {marginLeft: 10}]}>
                                <Image source={require('../assets/location.png')} style={[ styles.locationImage ]}/>
                            </View>
                       </View>
                       <View style={[ styles.textMargin ]}>
                            <Text style={[ styles.textStyleSmaller ]}>{this.state.user.email}</Text>
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
                   <Carousel products={this.products_to_rent}></Carousel>
               </View>
               <View style={[ styles.center ]}>
                  <TouchableOpacity onPress={ () => Actions.store() }>
                      <Text style={{fontWeight: '600'}}>Check out my all products! </Text>
                  </TouchableOpacity>
               </View>
           </ScrollView>
        );
    }else{
        return(
            <View style={{ justifyContent:'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={ () => Actions.createStore()}>
                    <Text>Open your first store !</Text>
                </TouchableOpacity>
            </View>
        )
    }
        
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
