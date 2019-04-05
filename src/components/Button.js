import React , { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity} from 'react-native'



export default class Button extends Component {

    constructor(props){
        super(props)
    }


    render() {
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[ styles.conteinerStyle,styles.center, {height: this.props.height, width: this.props.width} ]}>
                    <Text>{this.props.label}</Text>
                </View>
            </TouchableOpacity>
        );

    }

}

const styles = {
    conteinerStyle: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10,
        backgroundColor: '#30dada'
    },
    center: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    textStyle: {
        color: 'white'
    }
}
