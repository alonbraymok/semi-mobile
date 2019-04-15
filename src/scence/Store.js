import React , { Component } from 'react'
import { View, Image, FlatList, TouchableOpacity, Text, ScrollView} from 'react-native'
import Input from '../components/Input';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header';
import AddProductModal from '../components/AddProductModal';




export default class Store extends Component {

    constructor(props){
        super(props)
        this.state = { isModalVisible: false, email: 'Alonbraymok@gmail.com', address: 'Tel Aviv', name: 'Alon braymok', phoneNumber: '052-8896390' ,
                       storeDescription: 'this is my store description  dsadas dsadasda dadadasdsa' ,profileImage: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4'
                    , newProduct: ''}
    }

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

    _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });



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
                           <Button height={40} width={60} label={'Rent'} onPress={ () => Actions.prodectPage()} />
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
               <AddProductModal isModalVisible={this.state.isModalVisible} closeModal={this._toggleModal} product={this.state.newProduct}/>
               <View style={[ styles.center]}>
                   <View style={[{flexDirection: 'row'}]}>
                        <View style={{marginRight: 30, marginVertical: 10}}>
                            <Image source={{ uri: this.state.profileImage}} style={{ height: 100, width: 100, borderRadius: 50}} />
                        </View>
                        <View>
                            <View style={[ styles.center]}>
                                <Text style={{ fontSize: 30, fontWeight: 'bold'}}>Store name</Text>
                            </View>
                            <View>
                            <View style={{ flexDirection: 'row', marginVertical: 5}}>
                                <Image source={{ uri: 'https://cdn4.iconfinder.com/data/icons/rcons-phone/16/handset_round-2-512.png'}} style={{ width:20, height:20, marginRight:5}} />
                                <Text>{this.state.phoneNumber}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 5}}>
                                <Image source={{ uri: 'https://cdn3.iconfinder.com/data/icons/email-51/48/25-512.png'}} style={{ width:20, height:20, marginRight:5}} />
                                <Text>{this.state.email}</Text>
                            </View>
                        </View>
                            <View style={{ borderWidth: 0.5, borderColor:'#0843a3', borderRadius: 10, marginVertical: 5}}>
                                <TouchableOpacity onPress={this._toggleModal}>
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold'}}>
                                        Add New Product
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                   </View>
               </View>
                <View>
                    <FlatList 
                        data={this.products}
                        renderItem={ (item) => this.renderItem(item)}
                    />
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
        fontWeight: 'bold',
    }

}
