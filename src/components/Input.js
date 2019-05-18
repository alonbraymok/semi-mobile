import React , { Component } from 'react'
import { View, Image, TextInput, TouchableOpacity} from 'react-native'



export default class Input extends Component {

    constructor(props){
        super(props)
    }


    render() {
        return(
            <View style={[ styles.conteinerStyle ]}>
                <TextInput style={{ fontSize:20, fontWeight:'800', marginLeft: 5}} placeholder={this.props.placeholder} value={this.props.value} onChangeText={this.props.onChangeText}/>
            </View>
        );

    }

}

const styles = {
    conteinerStyle: {
        borderWidth: 3,
        borderColor: '#0843a3',
        borderRadius: 10,
        width: '70%'
    }
}
