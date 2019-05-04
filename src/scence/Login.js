import React , { Component } from 'react'
import { View, Image, TextInput, TouchableOpacity, Text, ScrollView} from 'react-native'
import Input from '../components/Input';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';
import UserStore from '../stores/UserStore';
import rootStores from '../stores';
import axios from 'axios';

const userStore = rootStores[UserStore];
export default class Login extends Component {

    constructor(props){
        super(props)
        this.state = { email: 'alon@gmail.com', password: '123456'}
    }
    signInPressed = () => {
       
        userStore.signin(this.state.email, this.state.password).then( response => {
            console.log(response)
            
            userStore.setCurrentUser(response.data.data)
            Actions.profile()
        }).catch( error => {
            console.log(error)
                  
        })
       
    }

    signUpPressed = () => {
        Actions.signup()
    }

    render() {
        return(
           <ScrollView style={{ backgroundColor: 'white'}}>
               <View style={[ styles.center, {marginVertical:30} ]}>
                   <Image source={require('../assets/semi.png')}  />
               </View>
               <View>
                   <View style={[ styles.center, styles.vMargin ]}>
                       <Input placeholder={'Email'} value={this.state.email} onChangeText={ (email) => this.setState({  email }) }/>
                   </View>
                   <View style={[ styles.center, styles.vMargin ]}>
                       <Input placeholder={'Password'} value={this.state.password} onChangeText={ (password) => this.setState({  password }) }/>
                   </View>
               </View>
               <View style={[ styles.center,{ marginVertical: 20}]}>
                   <Button height={40} width={100} label={'Sign in'} onPress={ () => this.signInPressed()}/>
               </View>
               <View style={[ styles.center]}>
                    <TouchableOpacity onPress={() => this.signUpPressed()}>
                        <Text> Sign up </Text>
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
    }

}
