import React , { Component } from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { View, Text, TouchableOpacity } from 'react-native';

export default class Slidder extends Component {

    constructor(props){
        super(props)

        this.state = {
            values: [2500, 7500],
            space: " "
        };
    }

    

    multiSliderValuesChange = (values) => {
        this.props.onSlide(values);
        this.setState({ values })
       
    }

    render() {
        return (
            <View> 
                <MultiSlider
                    values={this.state.values}
                    sliderLength={420}
                    onValuesChange={this.multiSliderValuesChange}
                    min={0}
                    max={10000}
                    step={1}
                    markerStyle={[ styles.markerStyle ,{backgroundColor: '#0843a3'}]}
                    selectedStyle={[styles.markerStyle]}
                />        
                <View style={[ { flexDirection:'row', justifyContent: 'center', alignItems: 'center'}]}>
                    <Text style={styles.text}>{this.state.values[0]}{this.state.space}$</Text>
                    <Text style={[styles.text, {marginLeft: 120}]}>{this.state.values[1]}{this.state.space}$</Text>
                </View>
                
            </View>
        )
    }
}

const styles = {
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    markerStyle: {
        backgroundColor: '#0843a3',
    }
    
  
}