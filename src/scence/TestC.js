import Calendar from 'react-native-calendar-select';
import React , { Component } from 'react'
import { View, Image, TextInput, TouchableOpacity, Text, FlatList, Button} from 'react-native'



export default class TestC extends Component {
    constructor (props) {
        super(props);
        this.state = {
          startDate: new Date(2017, 6, 12),  
          endDate: new Date(2017, 8, 2)
        };
        this.confirmDate = this.confirmDate.bind(this);
        this.openCalendar = this.openCalendar.bind(this);
      }

      confirmDate({startDate, endDate, startMoment, endMoment}) {
        this.setState({
          startDate,
          endDate
        }, () => console.log(this.state));
      }
      openCalendar() {
        this.calendar && this.calendar.open();
      }
      // in render function
      render() {
        // It's an optional property, I use this to show the structure of customI18n object.
        let customI18n = {
          'w': ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
          'weekday': ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          'text': {
            'start': 'Check in',
            'end': 'Check out',
            'date': 'Date',
            'save': 'Confirm',
            'clear': 'Reset'
          },
          'date': 'DD / MM'  // date format
        };
        // optional property, too.
        let color = {
          subColor: '#f0f0f0'
        };
        return (
          <View>
            <Button title="Open Calendar" onPress={this.openCalendar}/>
            <Calendar
              i18n="en"
              ref={(calendar) => {this.calendar = calendar;}}
              customI18n={customI18n}
              color={color}
              format="YYYYMMDD"
              minDate="20170510"
              maxDate="20180312"
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onConfirm={this.confirmDate}
            />
            <Text>{this.state.startDate.getDate() + '/' + this.state.endDate.getMonth() + '/' + this.state.endDate.getFullYear()}</Text>
          </View>
        );
      }
 

}


