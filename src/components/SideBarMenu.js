import React , { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import { ActionConst, Actions } from 'react-native-router-flux';



export default class SideBarMenu extends Component {

    constructor(props){
        super(props)
        this.state = { show: this.props.show}
    }


    render() {
        return(
           <View style={{ width: '50%', height: '100%', backgroundColor: '#0843a3', display: this.state.show, zIndex: 5}}>
                <View>
                    <TouchableOpacity onPress={ () => this.setState({ show: 'none'}) }>
                        <Image source={{ uri: 'https://cdn0.iconfinder.com/data/icons/housing-interface-1/16/Power-512.png'}} style={{margin: 10, width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{ margin: 10}}>
                        <TouchableOpacity onPress={ () => Actions.rentedList() }> 
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white'}}>My Renting</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ margin: 10}}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white'}}>My Payment </Text>
                        </TouchableOpacity>
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
        backgroundColor: '#0843a3'
    },
    center: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    textStyle: {
        color: 'white'
    }
}
