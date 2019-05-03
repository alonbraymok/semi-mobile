import React , { Component } from 'react'
import { View, Image, ScrollView, TouchableOpacity, Text} from 'react-native'
import Input from '../components/Input';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import UserStore from '../stores/UserStore';
import rootStores from '../stores';

const userStore = rootStores[UserStore];
export default class Signup extends Component {

    constructor(props){
        super(props)
        this.state = { username: 'alonbraymok', email: 'test@test.com', password: '123456', address: 'Tel aviv', firstname: 'alon', lastname: 'braymok', phoneNumber: '052-8896390',profileImage: 'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png'}
    }

    handleChoosePhoto = () => {
        const options = {
          noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
          if (response.uri) {
            this.setState({ profileImage: response })
          }
        })
      }

    finishPressed = () => {
        user = this.state
        console.log(user)
        userStore.signup(user).then( (response) => console.log(response) )
        .catch( error => console.log(error))
        Actions.login()
    }

    render() {
        return(
           <ScrollView style={{ backgroundColor: 'white'}}>
               <View style={[ styles.center ]}>
                   <Text>REGISTRTION</Text>
               </View>
               <TouchableOpacity onPress={this.handleChoosePhoto}>
                    <View style={[ styles.center, styles.vMargin ]}>
                        <Image source={{ uri: this.state.profileImage }} style={{ width: 80, height: 80 }} />
                    </View>
                </TouchableOpacity>
               <View>
                   <View style={[ styles.center, styles.vMargin ]}>
                       <Input placeholder={'Email'} value={this.state.email} onChangeText={ (email) => this.setState({  email }) }/>
                   </View>
                   <View style={[ styles.center, styles.vMargin ]}>
                       <Input placeholder={'Password'} value={this.state.password} onChangeText={ (password) => this.setState({  password }) }/>
                   </View>
                   <View style={[ styles.center, styles.vMargin ]}>
                       <Input placeholder={'Address'} value={this.state.address} onChangeText={ (address) => this.setState({  address }) }/>
                   </View>
                   <View style={[ styles.center, styles.vMargin ]}>
                       <Input placeholder={'First name'} value={this.state.firstname} onChangeText={ (firstname) => this.setState({  firstname }) }/>
                   </View>
                   <View style={[ styles.center, styles.vMargin ]}>
                       <Input placeholder={'Last name'} value={this.state.lastname} onChangeText={ (lastname) => this.setState({  lastname }) }/>
                   </View>
                   <View style={[ styles.center, styles.vMargin ]}>
                       <Input placeholder={'Phone number'} value={this.state.phoneNumber} onChangeText={ (phoneNumber) => this.setState({  phoneNumber }) }/>
                   </View>
                   <View style={[ styles.center, styles.vMargin ]}>
                       <Input placeholder={'User name'} value={this.state.username} onChangeText={ (username) => this.setState({  username }) }/>
                   </View>
               </View>
               <View style={[ styles.center]}>
                   <Button height={40} width={100} label={'Sign up'} onPress={ () => this.finishPressed()}/>
               </View>
               <View style={[ styles.imageConteiner]}>
                    <Image source={ require('../assets/signupImage.jpg')} style={[ styles.imageSize]}/>
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
         height: 350
    }

}
