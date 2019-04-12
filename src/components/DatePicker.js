import React , { Component } from 'react'
import { View, Image, TextInput, TouchableOpacity} from 'react-native'
import DatePicker from 'react-native-date-picker';


export default class DatePicker extends Component {

    constructor(props){
        super(props)
        state = { date: this.props.date }
    }


    render() {
        return(
            <View style={{ width: 100, borderWidth: 1, borderColor: '#0843a3', borderRadius: 20}}>
                <TextInput value={this.state.date} onChangeText={ (date) => {this.setState({ date})} } />
            </View>
        );

    }

}


