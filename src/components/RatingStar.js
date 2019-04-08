import React , { Component } from 'react'
import { View } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';


export default class RatingStar extends Component {

    constructor(props){
        super(props)

        this.state = {
            rateNumber: ''
        };
    }

    render() {
        return (
            <View style={{ width: 150, margin: 5, }}> 
                <AirbnbRating
                    count={5}
                    reviews={['Bad','good']}
                    defaultRating={5}
                    size={25}
                    style={{ height: 0 }}
                    showRating={false}
                />
            </View>
        )
    }
}
