import React , { Component } from 'react'
import { View, Image, TextInput, TouchableOpacity} from 'react-native'



export default class Input extends Component {

    constructor(props){
        super(props)
    }


    render() {
        return(
            <View style={[ styles.conteinerStyle ]}>
                <TextInput placeholder={this.props.placeholder} value={this.props.value} onChangeText={this.props.onChangeText}/>
            </View>
        );

    }

}

const styles = {
    conteinerStyle: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10,
        width: '70%'
    }
}
