import React, { Component } from 'react';
import { Text, View, ScrollView, Image, FlatList, LayoutAnimation, Platform, UIManager, TouchableOpacity, SectionList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import rootStores from '../stores';
import {observer} from 'mobx-react/native';
import Header from '../components/Header';
import MessegeDisplayer from '../components/MessegeDisplayer';
import UserStore from '../stores/UserStore';
import ProductStore from '../stores/ProductStore';



const userStore = rootStores[UserStore];
const productStore = rootStores[ProductStore];
export default class NotifictionCenter extends Component {

    constructor(props){
        super(props)  
        this.state = { newMesseges: [
            { firstname: "אלון", lastname: "בריימוק", profileImage: "https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png", date: "21.1.18", title: "rent request", content: "lorem adas pasdas drem adas pasdas dasd rem adas pasdas dasd rem adas pasdas dasd rem adas pasdas dasdasdasda dsad" },
            { firstname: "אלון", lastname: "בריימוק", profileImage: "https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png", date: "21.1.18", title: "אישור שותפות", content: "lorem adas pasdas dasdasda dsad" },
            { firstname: "אלון", lastname: "בריימוק", profileImage: "https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png", date: "21.1.18", title: "אישור שותפות", content: "lorem adas pasdas dasdasda dsad" },
            { firstname: "אלון", lastname: "בריימוק", profileImage: "https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png", date: "21.1.18", title: "אישור שותפות", content: "lorem adas pasdas dasdasda dsad" },
            { firstname: "אלון", lastname: "בריימוק", profileImage: "https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png", date: "21.1.18", title: "אישור שותפות", content: "lorem adas pasdas dasdasda dsad" },  
        ],
        oldMesseges: [
            { firstname: "אלון", lastname: "בריימוק", profileImage: "https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png", date: "21.1.18", title: "אישור שותפות", content: "lorem adas pasdas dasdasda dsad" },
            { firstname: "אלון", lastname: "בריימוק", profileImage: "https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png", date: "21.1.18", title: "אישור שותפות", content: "lorem adas pasdas dasdasda dsad" },
            { firstname: "אלון", lastname: "בריימוק", profileImage: "https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png", date: "21.1.18", title: "אישור שותפות", content: "lorem adas pasdas dasdasda dsad" },
            { firstname: "אלון", lastname: "בריימוק", profileImage: "https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png", date: "21.1.18", title: "אישור שותפות", content: "lorem adas pasdas dasdasda dsad" },
        ],
        notifiction: [],
        ref: false
    
    }
      
    }


    componentDidMount = () => {
        messege = userStore.getCurrentUser().orders_as_provider.slice(0)
        console.log(messege)
        messege.forEach( p  => {
            console.log(p)
            productStore.getProductOrder(p).then( response => {
                console.log('res:', response)
                m = {
                    consumer: {
                        username: response.data.data.consumer.username,
                        email: response.data.data.consumer.email,
                        phone: response.data.data.consumer.phone_number,
                        city: response.data.data.consumer.address.city,
                        profile_image: response.data.data.consumer.profile_image
                    },
                    product: {
                        name: response.data.data.product.name,
                        image: response.data.data.product.image,
                        plan: {
                            period: response.data.data.plan.period,
                            price: response.data.data.plan.price
                        },
                        from: response.data.data.start_time,
                        to: response.data.data.finish_time,
                    },
                    id: response.data.data._id
                }
                console.log('m:', m)
                buffer = this.state.notifiction.slice(0)
                buffer.push(m)
                this.setState({ notifiction: buffer, ref: true}, () => console.log(this.state.notifiction))
            }).catch( err => console.log(err))
        });
    }
    

    renderItemList = (item) => {
        console.log({item})
        return(
            <MessegeDisplayer item={item}/>  
        );
    }

    render() {
      if(this.state.ref){
      return (
            <ScrollView style={[{backgroundColor: 'white'}]} nestedScrollEnabled>
                <Header back headerText={'SEMI'} onPress={ () => Actions.profile()}/>
                <View style={[ styles.center, styles.margin ]}>
                    <Text style={[ styles.headerTextStyle ]}>NOTIFICTION</Text>
                </View>
                <View style={[ styles.marginUserName]}>
                    {/* <View style={[ styles.rMargin]}>
                        <Text style={[styles.sectionTitle ]}>חדשים</Text>
                    </View> */}
                    <View style={[ styles.bottomborder]}>
                        <ScrollView style={[ {height: 350}]} nestedScrollEnabled>
                            <FlatList
                                data={this.state.notifiction}
                                renderItem={ (item) => this.renderItemList(item) }
                                extraData={this.state}
                            />
                        </ScrollView>
                    </View>
                </View>              
            </ScrollView>
      );
                }else{
                    return(
                        <View>
                            <Text>Loading data..</Text>
                        </View>
                    )
                }
    }
  }

  const styles = {
        cardStyle: {
            borderWidth: 0.5,
            borderRadius: 15,
            borderColor: '#0843a3',
            justifyContent: 'flex-end',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1,
            marginHorizontal: '10%',
            marginTop: 10,
        },
        row: {
            flexDirection: 'row'
        },
        margin: {
            margin: 5
        },
        profileImage: {
            height: 50,
            width: 50,
            margin: '5%'
        },
        center: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        headerTextStyle:{
            color: '#0843a3',
            fontSize: 30,
            fontWeight: 'bold'
        },
        marginUserName: {
            marginBottom: 15
        },
        blueText: {
            color: '#0843a3'
        },
        bold: {
            fontWeight: 'bold'
        },
        usernameTextStyle: {
            textAlign: 'center'
        },
        rMargin: {
            marginRight: '10%'
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold'
        },
        bottomborder: {
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: '#0843a3',
            width: '80%',
            marginHorizontal: '10%'
        }
  
   
  };