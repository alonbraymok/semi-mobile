import React , { Component } from 'react'
import { View, Image, TextInput, TouchableOpacity, Text} from 'react-native'
import Input from '../components/Input';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';
import UserStore from '../stores/UserStore';
import rootStores from '../stores';


const userStore = rootStores[UserStore];
export default class Login extends Component {

    constructor(props){
        super(props)
        this.state = { email: 'test@test.com', password: '123456'}
    }
    signInPressed = () => {
        userStore.signin(this.state.email, this.state.password).then( response => {
            console.log(response)
            userStore.setCurrentUser(response.data.data)
        }).catch( error => console.log(error))
        Actions.profile()
    }

    signUpPressed = () => {
        Actions.signup()
    }

    render() {
        return(
           <View style={{ backgroundColor: 'white'}}>
               <View style={[ styles.center ]}>
                   <Text>SEMI</Text>
               </View>
               <View>
                   <View style={[ styles.center, styles.vMargin ]}>
                       <Input placeholder={'Email'} value={this.state.email} onChangeText={ (email) => this.setState({  email }) }/>
                   </View>
                   <View style={[ styles.center, styles.vMargin ]}>
                       <Input placeholder={'Password'} value={this.state.password} onChangeText={ (password) => this.setState({  password }) }/>
                   </View>
               </View>
               <View style={[ styles.center]}>
                   <Button height={40} width={100} label={'Sign in'} onPress={ () => this.signInPressed()}/>
               </View>
               <View style={[ styles.center]}>
                    <TouchableOpacity onPress={() => this.signUpPressed()}>
                        <Text> Sign up </Text>
                    </TouchableOpacity>
               </View>
               <View style={[ styles.imageConteiner ]}>
                    <Image source={ require('../assets/loginImage.jpg')} style={[ styles.imageSize]}/>
               </View>

           </View>
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
