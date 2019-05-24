
import React, { Component } from 'react';
import { Image, View, Text, Platform, UIManager, TouchableOpacity, LayoutAnimation } from 'react-native';
import Button from '../components/Button';
const moment = require('moment');
import ProductStore from '../stores/ProductStore';
import rootStores from '../stores';
import UserStore from '../stores/UserStore';



const userStore = rootStores[UserStore];
const productStore = rootStores[ProductStore];
export default class MessegeDisplayer extends Component {

    constructor(props){
        super(props)
        this.state = { expanded: false, displayBtn: 'flex'}

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidMount = () => {
        if(this.props.item.item.order_status === 'handled'){
            this.setState({ displayBtn: 'none'})
        }
    }
    
    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
    }

    confirmOrder = (id, provider) => {
        productStore.confirmOrder(id, provider).then(res => console.log(res)).catch(err => console.log(err))
    }

    canselOrder = (id, provider) => {
        productStore.canselOrder(id, provider).then(res => console.log(res)).catch(err => console.log(err))
    }
 

    render() {
        console.log('props::', this.props)
        
        return (
            <View style={[ styles.cardStyle, styles.center ]}>
           
                <TouchableOpacity activeOpacity={0.8} onPress={ () => this.changeLayout()}>
                    <View style={[ styles.row ]}>
                        <View style={[ styles.center ]}>
                           <Image source={{ uri: 'data:image/png;base64,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'}}
                                  style={{ width: 10, height: 10}}
                           /> 
                        </View>
                        <View style={[ styles.center, styles.lMargin ]}>
                            <Text style={[ styles.bold ]}>rent request</Text>
                            <Text style={[ styles.bold, styles.blueText ]}>{moment(this.props.item.item.product.from).format('DD/MM/YY')}</Text>
                        </View>
                        <View style={[ styles.center, styles.lMargin ]}>
                            <Text style={[ styles.usernameTextStyle ]}>{this.props.item.item.consumer.username}</Text>
                        </View>
                        <View style={[{marginLeft: 25}, styles.vMargin]}>
                            {/* <Image source={{ uri : this.props.item.item.cunsumer.profile_image}} style={[ styles.profileImage ]}/> */}
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ height: this.state.expanded ? null : 0, overflow: 'hidden', justifyContent:'flex-start' }}>
                    <View style={[ styles.center ]}>
                        <View style={{marginVertical: 5}}>
                            <Text style={[ styles.usernameTextStyle, styles.bold ]}>{this.props.item.item.product.name}</Text>
                        </View>  
                        <View style={{marginVertical: 5}}>
                            <Text style={[ styles.usernameTextStyle, styles.bold ]}>from: {moment(this.props.item.item.product.from).format('DD/MM/YY')}</Text>
                        </View>  
                        <View style={{marginVertical: 5}}>
                            <Text style={[ styles.usernameTextStyle, styles.bold ]}>to: {moment(this.props.item.item.product.to).format('DD/MM/YY')}</Text>
                        </View> 
                        <View style={{marginVertical: 5}}>
                            <Text style={[ styles.usernameTextStyle, styles.bold ]}>period: {this.props.item.item.product.plan.period} days</Text>
                        </View>
                    </View>
                    <View style={[ styles.row, styles.center, styles.margin, {display: this.state.displayBtn} ]}>
                        <View style={[styles.margin ]}>
                            <Button height={40} width={100} label={'CONFIRM'} onPress={ () => this.confirmOrder(this.props.item.item.id, this.props.item.item.consumer.username)}/>
                        </View> 
                        <View style={[styles.margin ]}> 
                            <Button height={40} width={100} label={'CANCEL'} onPress={ () => this.canselOrder(this.props.item.item.id, this.props.item.item.consumer.username)}/>
                        </View>  
                    </View>
                </View>
            </View>
        );
    }
}


const styles = {
    cardStyle: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#0843a3',
        justifyContent: 'flex-end',
        
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
    lMargin: {
        marginLeft: 15
    },
    vMargin: {
        marginVertical: 8
    }


};