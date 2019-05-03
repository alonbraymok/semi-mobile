import React , { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image} from 'react-native'
import Header from '../components/Header';
import { Actions } from 'react-native-router-flux';
import UserStore from '../stores/UserStore';
import rootStores from '../stores';



const userStore = rootStores[UserStore];
export default class RentedList extends Component {

    constructor(props){
        super(props)
        this.state = { products: ''}
    }

    componentDidMount = () => {
        user = userStore.getCurrentUser()
    }

    buffer = [
        { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg', endDate:'15/05/19', contact: 'alonbraymok@gmail.com'},
        { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg', endDate:'15/05/19', contact: 'alonbraymok@gmail.com'},
        { name: 'product name', category: 'category', description: 'product discription', price: 100, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg', endDate:'15/05/19', contact: 'alonbraymok@gmail.com'},
    ]

    renderItem = (item) => {
        return(
            <View style={{borderTopWidth: 1 }}>
                  <View style={{ flexDirection: 'row'}}>
                   <View style={{ margin: 10}}>
                        <Image source={{ uri: item.item.image}} style={{ height: 200, width: 150}} />
                   </View>
                   <View style={{ margin: 20}}>
                       <View style={[ styles.textMargin ]}>
                            <Text style={[  ]}>{item.item.name}</Text>
                       </View>
                       <View style={[ styles.textMargin , {flexDirection: 'row'} ]}>
                            <Text style={[  ]}>{item.item.category}</Text>
                            
                       </View>
                       <View style={[ styles.textMargin ]}>
                            <Text style={[ ]}>{item.item.description}</Text>
                       </View>
                       <View style={[ styles.textMargin , {width: 200} ]}>
                            <Text style={[{color: 'red'}  ]}>Renting end: {item.item.endDate}</Text>
                       </View>
                       <View style={{ flexDirection: 'row',marginTop: 10}}>
                           <Image source={{ uri: 'https://cdn3.iconfinder.com/data/icons/email-51/48/25-512.png'}} style={{ width:20, height:20}} />
                           <Text style={{marginLeft: 5}}>Contact</Text>
                       </View>
                       <View>
                           <Text>{item.item.contact}</Text>
                       </View>
                           
                   </View>
               </View>
            </View>
        )
    }

    render() {
        return(
            <ScrollView>
                <Header back headerText={'SEMI'} onPress={ () => Actions.profile()}/>
                <View style={{ justifyContent:'center', alignItems: 'center', margin: 15}}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold'}}>My Rented Products</Text>
                </View>
                <View>
                    <FlatList
                        data={this.buffer}
                        renderItem={ (item) => this.renderItem(item)}
                    />
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
        backgroundColor: '#0843a3'
    },
    center: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    textStyle: {
        color: 'white'
    },
    textMargin:{
        marginTop: 10
    }
}
