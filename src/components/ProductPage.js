
import React , { Component } from 'react'
import { View, Text, TextInput, ScrollView, Image, FlatList, Alert, TouchableOpacity} from 'react-native'
import Button from './Button';
import Header from './Header';
import RatingStar from './RatingStar';
import { Actions } from 'react-native-router-flux';
import ProductStore from '../stores/ProductStore';
import rootStores from '../stores';
import Calendar from 'react-native-calendar-select';


const productStore = rootStores[ProductStore];
export default class ProductPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            startDate: new Date(2017, 6, 12),  
            endDate: new Date(2017, 8, 2),
            product: ''
          };
          this.confirmDate = this.confirmDate.bind(this);
          this.openCalendar = this.openCalendar.bind(this);
        }
    
    product = { name: 'skate', category:'extrem', price: 12, description:'from a doctor', starts: 4, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'}
    seller = { name: 'eliran hasin', email: 'eliranH26@gmail.com', image: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4', phoneNumber: '052-8896390'}
    reviews = [{name: 'eliran hasin', image: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4',content: 'a good shape product'},
    {name: 'eliran hasin', image: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4',content: 'eliran is nice woman'},
    {name: 'eliran hasin', image: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4',content: 'eliran is nice woman'},
    {name: 'eliran hasin', image: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4',content: 'eliran is nice woman'},
    {name: 'eliran hasin', image: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4',content: 'eliran is nice woman'},
]

componentDidMount = () => {
    product = productStore.getProductBuffer()
    console.log('0',product)
    this.setState({ product: product }, () => console.log('1'))
}


showAlert= () => {
    Alert.alert(
        'Hello',
        'Messeage been send to renter, he will contact you',
        [
        //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => Actions.profile()},
        ],
        {cancelable: false},
      )
}

confirmDate({startDate, endDate, startMoment, endMoment}) {
    this.setState({
      startDate,
      endDate
    }, () => console.log(this.state));
  }

  openCalendar() {
    this.calendar && this.calendar.open();
  }

  moveToProductOwnerProfile = (username) => {
    console.log(username)
    Actions.profile({ otherUser: username })
  }

renderItem = (item) => {
    console.log('3')
    return(
        <View style={{ borderWidth: 0.5, borderColor: '#0843a3', borderRadius:5, flexDirection: 'row'}}>
            <View style={{margin: 5}}>
                <TouchableOpacity  onPress={ () => this.moveToProductOwnerProfile(item.item.creator.username)}>
                    <Image source={{ uri: item.item.creator.profile_image}} style={{ width:20, height:20, marginLeft:15, borderRadius: 10}} />
                </TouchableOpacity>
                <Text style={{textAlign:'center', fontWeight:'bold'}}>{item.item.creator.username}</Text>
            </View>
            <View style={[ ]}>
                <Text style={{textAlign:'center', fontWeight:'bold', fontSize:15, marginLeft: 32}}>{item.item.content}</Text>
                <RatingStar size={15}/>
            </View>
        </View>
    )
}


    render() {
        let customI18n = {
            'w': ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            'weekday': ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'text': {
              'start': 'Check in',
              'end': 'Check out',
              'date': 'Date',
              'save': 'Confirm',
              'clear': 'Reset'
            },
            'date': 'DD / MM'  // date format
          };
          // optional property, too.
          let color = {
            subColor: '#0843a3'
          };

          console.log('2')
          if(this.state.product !== ''){

         

        return(
            
            <View style={{backgroundColor: 'white', flex: 1 }}>
                <Header back headerText={'SEMI'} onPress={ () => Actions.store()} />
                <View style={{ flexDirection: 'row'}}>
                    <View style={{ margin: 10}}>
                        <Image source={{ uri: this.state.product.image}} style={{ height: 200, width: 150}} />
                    </View>
                    <View style={{ margin: 20}}>
                    <View style={[ styles.textMargin ]}>
                        <Text style={[ styles.textStyle ]}>{this.state.product.name}</Text>
                    </View>
                    <View style={[ styles.textMargin , {flexDirection: 'row'} ]}>
                        <Text style={[ styles.textStyle ]}>{this.state.product.category.name}</Text>
                        
                    </View>
                    <View style={[ styles.textMargin ]}>
                        <Text style={[ styles.textStyle ]}>{this.state.product.description}</Text>
                    </View>
                    <View style={[ styles.textMargin , {width: 200} ]}>
                        <Text style={[ styles.textStyle ]}>Price per day: {this.state.product.retail_price} $</Text>
                    </View>
                    <View>
                        <RatingStar size={25}/>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <View style={{ justifyContent: 'center', marginRight: 10}}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold'}}>From:</Text>
                        </View>
                        <TouchableOpacity onPress={ () => this.openCalendar()}>
                            <View style={{width: 100, height: 40, borderWidth: 1, borderColor: '#0843a3', borderRadius: 20,justifyContent:'center', alignItems:'center'}}>
                                <Text>{this.state.startDate.getDate() + '/' + this.state.startDate.getMonth() + '/' + this.state.startDate.getFullYear()}</Text>                                 
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Calendar
                        i18n="en"
                        ref={(calendar) => {this.calendar = calendar;}}
                        customI18n={customI18n}
                        color={color}
                        format="YYYYMMDD"
                        minDate="20170510"
                        maxDate="20180312"
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onConfirm={this.confirmDate}
                        />
                    <View style={{ flexDirection: 'row', marginTop: 10}}>
                        <View style={{ justifyContent: 'center', marginRight: 13}}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold'}}>To:</Text>
                        </View>
                        <TouchableOpacity onPress={ () => this.openCalendar()}>
                            <View style={{width: 100, height: 40, borderWidth: 1, borderColor: '#0843a3', borderRadius: 20,justifyContent:'center', alignItems:'center'}}>
                                <Text>{this.state.endDate.getDate() + '/' + this.state.endDate.getMonth() + '/' + this.state.endDate.getFullYear()}</Text>                                 
                            </View>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={{textDecorationLine:'underline', fontSize: 15, fontWeight:'bold'}}>Seller Details</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={{ uri: this.seller.image}} style={{marginLeft:10, width:40, height:40 , borderRadius:20, marginRight: 30}}/>
                        <View>
                            <View style={{ flexDirection: 'row'}}>
                                <Image source={{ uri: 'https://cdn4.iconfinder.com/data/icons/rcons-phone/16/handset_round-2-512.png'}} style={{ width:20, height:20, marginRight:5}} />
                                <Text>{this.seller.phoneNumber}</Text>
                            </View>
                            <View style={{ flexDirection: 'row'}}>
                                <Image source={{ uri: 'https://cdn3.iconfinder.com/data/icons/email-51/48/25-512.png'}} style={{ width:20, height:20, marginRight:5}} />
                                <Text>{this.seller.email}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={{textDecorationLine:'underline', fontSize: 15, fontWeight:'bold'}}>Product Reviews</Text>
                    </View>
                    <View style={{ height: 150}}>
                        <ScrollView>
                            <FlatList
                                data={this.state.product.reviews}
                                renderItem={ (item) => this.renderItem(item)}
                            />
                        </ScrollView>
                    </View>
                </View>
                <View style={{ justifyContent:'flex-end', alignItems: 'center'}}>
                    <Button height={40} width={80} label={'Rent'} onPress={ ()=> this.showAlert()} />
                </View> 
           
            </View>
        )
    }else{
        return(
            <View>
                <Text>Loading..</Text>
            </View>
        )
    }

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
        color: 'black'
    }
}
