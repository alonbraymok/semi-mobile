import React , { Component } from 'react'
import { View, Image, FlatList, Platform, UIManager, TouchableOpacity, LayoutAnimation , Text, ScrollView, TextInput} from 'react-native'
import Input from '../components/Input';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header';
import AddProductModal from '../components/AddProductModal';
import ProductStore from '../stores/ProductStore';
import UserStore from '../stores/UserStore';
import rootStores from '../stores';
import {observer} from 'mobx-react';
import RatingStar from '../components/RatingStar'
import ReadMore from 'react-native-read-more-text';
const moment = require('moment');



const productStore = rootStores[ProductStore];
const userStore = rootStores[UserStore];
@observer 
export default class Store extends Component {

    constructor(props){
        super(props)
        this.state = { isModalVisible: false  , newProduct: '',newComment: '' ,user: '', expanded: false, expandeds: [], managerDisplay:'flex'}

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }


    componentDidMount = () => {
        if(this.props.user){

            this.setState({ user: this.props.user}, () => {console.log('user::',this.state.user)
            this.isManager()
            for(i=0; i<this.state.user.products_for_rent.length; i++ ){
                const expandeds = this.state.expandeds
                expandeds.push(false)
                this.setState({ expandeds},)
            }
        })
        }else{
            this.setState({ user: userStore.getCurrentUser()}, () => {console.log('user::',this.state.user)
            for(i=0; i<this.state.user.products_for_rent.length; i++ ){
                const expandeds = this.state.expandeds
                expandeds.push(false)
                this.setState({ expandeds}, )
            }
        })
        }

    }


    changeLayout = (index) => {
        console.log('here')
        buffer = this.state.expandeds.slice(0)
        buffer[index] = !buffer[index]
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        this.setState({ expanded: !this.state.expanded, expandeds: buffer });
    }

    _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

    goToProductPage = (product) =>{
        productStore.setProductBuffer(product)
        Actions.prodectPage({product})
      }
      toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
      };

      moveToProductOwnerProfile = (username) => {
        console.log(username)
        Actions.profile({ otherUser: username })
      }

      deleteProduct = (id) => {
          return productStore.deleteProduct(id).then( response => console.log('delete p res::', response))
                                                .catch( error => console.log(error))
      }

      isManager = () => {
          if(this.props.user.username !== userStore.getCurrentUser().username){
                this.setState({ managerDisplay: 'none'})
          }
      }
      

      renderReview = (item) => {
          return(
              <View style={{}}>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                        <View>
                            <TouchableOpacity onPress={ () => this.moveToProductOwnerProfile(item.item.creator.username)}>
                                <Image source={{uri: item.item.creator.profile_image}} style={{ width:30, height: 30}} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text>{item.item.creator.username}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>{item.item.content}</Text>
                    </View>
                  </View>
                  <View>
                        <RatingStar size={15}/>
                  </View>
                  <View>
                      <Text>{moment(item.item.createdAt).format('DD/MM/YY')}</Text>
                  </View>
              </View>
          )
      }

      AddComment = (productID) => {
          user = userStore.getCurrentUser()
          content = this.state.newComment
          review = {
            productId: productID,             
            username :user.username,               
            stars: 3,
            content: content
              
          }
          productStore.addReview(review).then( response => console.log('res::',response)).catch( error => console.log('err::',error))
          this.setState({ newComment: ''})
          
      }

      _handleTextReady = () => {
        console.log('ready!');
      }
    renderItem = (item) => {
        
        return(
            <View style={{borderTopWidth: 1 , padding:5}}>
                  <View style={{ flexDirection: 'row'}}>
                   <View style={{ margin: 10}}>
                        <Image source={{ uri: item.item.images[0]}} style={{ height: 200, width: 150}} />
                   </View>
                   <View style={{ margin: 20}}>
                        <View style={{ width:150, justifyContent:'flex-end', alignItems:'flex-end', display:this.state.managerDisplay}}>
                            <TouchableOpacity onPress={ () => this.deleteProduct(item.item._id)}>
                                <Image source={require('../assets/trash.png')} style={{ height: 30, width: 20}} />    
                            </TouchableOpacity>
                        </View>
                       <View style={[ styles.textMargin, {width:150} ]}>
                            <Text style={[ styles.textStyle ]}>{item.item.name}</Text>
                       </View>
                       <View style={[ styles.textMargin , {flexDirection: 'row',width:150} ]}>
                            <Text style={[ styles.textStyle ]}>{item.item.category.name}</Text>
                            
                       </View>
                       <View style={[ styles.textMargin , {width:150}]}>
                            <ReadMore
                                numberOfLines={2}
                                onReady={this._handleTextReady}>
                                <Text style={[ styles.textStyleSmaller ]}>{item.item.description}</Text>
                            </ReadMore>
                       </View>
                       <View style={[ styles.textMargin , {width: 200} ]}>
                            <Text style={[ styles.textStyleSmaller ]}>{item.item.plans[0].price} for {item.item.plans[0].period}</Text>
                       </View>
                       <View style={{flexDirection:'row', marginTop:20, display:this.state.managerDisplay}}>
                            <View>
                                <Button height={40} width={60} label={'Rent'} onPress={ () => this.goToProductPage(item.item)} />
                            </View>
                            <View style={{marginLeft: 30}}>
                                <TouchableOpacity activeOpacity={0.8} onPress={ () => this.changeLayout(item.index)}>
                                    <View style={{marginLeft: 20}}>
                                        <Image source={ require('../assets/chat.png')} style={{width:30, height:30}} />
                                    </View>
                                    <View style={{marginLeft: 15}}>
                                        <Text style={{fontWeight:'bold', color: '#0843a3', textAlign:'center'}}>add{"\n"}review</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                       </View>                              
                   </View>
               </View>
               <View>
                    <ScrollView nestedScrollEnabled>
                        <View>
                            <Text>Reviews:</Text>
                        </View>
                        <View style={{ borderWidth: 2, padding:5, borderRadius:10}}>
                            <FlatList 
                                data={item.item.reviews}
                                renderItem={ (item) => this.renderReview(item)}
                                extraData={this.state}
                                maxHeight={100}
                            />
                        </View>
                    </ScrollView>
               </View>
               <View style={{ height: this.state.expandeds[item.index] ? null : 0, overflow: 'hidden' }}>
                    <View>
                        <View>
                            <Text>Add Comment</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{ borderWidth:1, borderRadius:20, width:'80%', height:50}}>
                                <TextInput value={this.state.newComment} onChangeText={ (newComment) => this.setState({ newComment })}/>
                            </View>
                            <View style={{justifyContent:'center', alignItems: 'center', marginLeft:5}}>
                                <Button height={40} width={60} label={'Add'} onPress={ () => this.AddComment(item.item._id)} />
                            </View>
                        </View>
                        <View>
                            <RatingStar size={10}/>
                        </View>
                    </View>             
                </View>
            </View>
        )
    }

    render() {
        return(
           <ScrollView style={{backgroundColor: 'white'}} nestedScrollEnabled>
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
                                <Text>{this.state.user.phone_number}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 5}}>
                                <Image source={{ uri: 'https://cdn3.iconfinder.com/data/icons/email-51/48/25-512.png'}} style={{ width:20, height:20, marginRight:5}} />
                                <Text>{this.state.user.email}</Text>
                            </View>
                        </View>
                            <View style={{ borderWidth: 0.5, borderColor:'#0843a3', borderRadius: 10, marginVertical: 5, display:this.state.managerDisplay}}>
                                <TouchableOpacity onPress={this._toggleModal}>
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold'}}>
                                        Add New Product
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                   </View>
               </View>
                <View nestedScrollEnabled>
                    <FlatList 
                        data={this.state.user.products_for_rent}
                        renderItem={ (item) => this.renderItem(item)}
                        extraData={this.state}
                    />
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Text>Empty Store..</Text>
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
