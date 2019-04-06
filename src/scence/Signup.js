import React , { Component } from 'react'
import { View, Image, TextInput, TouchableOpacity, Text} from 'react-native'
import Input from '../components/Input';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

export default class Signup extends Component {

    constructor(props){
        super(props)
        this.state = { email: '', password: '', address: '', name: '', profileImage: 'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png'}
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
        Actions.login()
    }

    render() {
        return(
           <View style={{ backgroundColor: 'white'}}>
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
                       <Input placeholder={'Address'} value={this.state.email} onChangeText={ (address) => this.setState({  address }) }/>
                   </View>
                   <View style={[ styles.center, styles.vMargin ]}>
                       <Input placeholder={'Full name'} value={this.state.password} onChangeText={ (name) => this.setState({  name }) }/>
                   </View>
               </View>
               <View style={[ styles.center]}>
                   <Button height={40} width={100} label={'Sign up'} onPress={ () => this.finishPressed()}/>
               </View>
               <View style={[ styles.imageConteiner]}>
                    <Image source={ require('../assets/signupImage.jpg')} style={[ styles.imageSize]}/>
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
         height: 350
    }

}
