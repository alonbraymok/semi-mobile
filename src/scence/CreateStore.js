import React , { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity} from 'react-native'
import Input from '../components/Input';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header';
import UserStore from '../stores/UserStore';
import rootStores from '../stores';


const userStore = rootStores[UserStore];
export default class CreateStore extends Component {

    constructor(props){
        super(props)
        this.state = { storeName: '', storeDesc: '', }
    }

    createStore = () => {
        store = {
            name: this.state.storeName,
            description: this.state.storeDesc
        }
        userStore.createStore(store)
        Actions.profile()
    }


    render() {
        return(
            <View>
                <Header back headerText={'SEMI'} onPress={ () => Actions.profile()}/>
                <View style={{ justifyContent:'center', alignItems: 'center', margin: 15}}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Create Store</Text>
                </View>
                <View style={{ justifyContent:'center', alignItems: 'center'}}>
                    <View style={[ styles.conteinerStyle ,{marginVertical: 30}]}>
                        <TextInput placeholder={'Store name'} value={this.state.storeName} onChangeText={ (storeName) => this.setState({  storeName }) }/>
                    </View>
                    <View style={[ styles.conteinerStyle1,{marginVertical: 30}]}>
                        <TextInput placeholder={'Description'} value={this.state.storeDesc} onChangeText={ (storeDesc) => this.setState({  storeDesc }) }/>
                    </View>
                    <View>
                    <Button height={40} width={100} label={'Create Store'} onPress={ () => this.createStore()}/>
                    </View>
                </View>
            </View>
        );

    }

}

const styles = {
    conteinerStyle: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10,
        width: '90%'
    },
    conteinerStyle1: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10,
        width: '90%',
        height: 200
    },
    center: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    textStyle: {
        color: 'white'
    }
}
