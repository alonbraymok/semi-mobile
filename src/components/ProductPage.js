
import React , { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import Button from './Button';
import Header from './Header';
import RatingStar from './RatingStar';



export default class ProductPage extends Component {

    constructor(props){
        super(props)
        this.state={startDate: Date, endDate: Date}
    }

    product = { name: 'skate', category:'extrem', price: 12, description:'from a doctor', starts: 4, image: 'https://surlybikes.com/uploads/bikes/_medium_image/Troll_BK0337.jpg'}
    seller = { name: 'eliran hasin', email: 'eliranH26@gmail.com', image: 'https://avatars3.githubusercontent.com/u/37082941?s=460&v=4'}
    
    render() {
        return(
            <View style={{backgroundColor: 'white', flex: 1 }}>
                <Header back label={'SEMI'} />
                <View style={{ flexDirection: 'row'}}>
                    <View style={{ margin: 10}}>
                            <Image source={{ uri: this.product.image}} style={{ height: 200, width: 150}} />
                    </View>
                    <View style={{ margin: 20}}>
                    <View style={[ styles.textMargin ]}>
                        <Text style={[ styles.textStyle ]}>{this.product.name}</Text>
                    </View>
                    <View style={[ styles.textMargin , {flexDirection: 'row'} ]}>
                        <Text style={[ styles.textStyle ]}>{this.product.category}</Text>
                        
                    </View>
                    <View style={[ styles.textMargin ]}>
                        <Text style={[ styles.textStyle ]}>{this.product.description}</Text>
                    </View>
                    <View style={[ styles.textMargin , {width: 200} ]}>
                        <Text style={[ styles.textStyle ]}>Total Price: {this.product.price} $</Text>
                    </View>
                    <View>
                        <RatingStar/>
                    </View>
                    </View>
                </View>
                <View style={{ justifyContent:'flex-end', alignItems: 'center'}}>
                    <Button height={40} width={80} label={'Rent'} />
                </View> 
                
                
                
                
            </View>
        )

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
        color: 'black'
    }
}
