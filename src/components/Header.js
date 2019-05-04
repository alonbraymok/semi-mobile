// Import libraries for making a component
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, TouchableNativeFeedback} from 'react-native';
import { Actions } from 'react-native-router-flux';



// Make a component
export default class Header extends Component {

  constructor(props){
    super(props)
    this.state = { searchAddress: ''}
  }
  
  renderCleanHeader = () => {
    return( 
            <View style={styles.viewStyle}>
                <Image source={require('../assets/semi.png')} style={[{width:60, height:40} ]} />
            </View>      
    );
  }
  
  renderHeaderWithBack = () => {
    return (

            <View style={styles.backButtonStyle}>
              <View style={{justifyContent:'center', alignItems:'center', marginLeft: '40%'}}>
                  <Image source={require('../assets/semi.png')} style={[{width:60, height:40} ]} />
              </View>
              <View  style={{justifyContent:'center', alignItems:'center', marginLeft: 40}}>
                  <TouchableOpacity onPress={this.props.onPress}>
                        <Image
                              source={require('../assets/back.png')}
                              style={[ styles.arrowStyle ]}
                        />
                  </TouchableOpacity>
              </View>
            </View>
                
    );

  }

  

  renderHeaderWithSearchAndHamburger = () => {
    return (

        <View style={styles.viewStyle}>
              <View>
                  <TouchableOpacity onPress={() => this.props.onPressHamburger()} style={{ marginRight: 70}}>
                        <Image source={ require('../assets/burger.png')}  style={[ styles.messegeIcon ]} />
                  </TouchableOpacity>
              </View>
              <View>
                    <Image source={require('../assets/semi.png')} style={[{width:60, height:40} ]} />
              </View>
              <View>
                  <TouchableNativeFeedback onPress={ () => this.props.onPressSearch()}>
                      <View style={{marginLeft: 60, alignItems: 'center',flexDirection: 'column'}}>
                          <Image source={ require('../assets/loupe.png')} style={[ styles.lineStyle ]}/>  
                      </View>
                  </TouchableNativeFeedback>
              </View>
        </View>
    );
  }

  renderSearchHeader = () => {
    return (

      <View style={styles.viewStyle}>
            <View style={[ styles.searchStyle , { flexDirection: 'row'} ]}>
                <TouchableOpacity onPress={ () => console.log("search")}> 
                  <View style={[ { marginLeft: 30, marginTop: 10}]}>
                      {/* <Image source={ require('../../assets/bsearch.png')} style={{width:30, height:30}}/> */}
                  </View>
                </TouchableOpacity>   
                <View style={[{ marginLeft: 50}]}>
                  <TextInput value={this.props.value} style={[ styles.blueText]}/>
                </View>
            </View>
            <View>
                <TouchableOpacity  style={{ marginLeft: 20}}>
                      {/* <Image source={require('../../assets/backAerrow.png')} style={[ styles.arrowStyle ]} /> */}
                </TouchableOpacity>
            </View>
      </View>
);
  }


  renderScreens = () => {
    if( this.props.clean ){
      return this.renderCleanHeader()
    }
    if( this.props.back ){
      return this.renderHeaderWithBack()
    }
    
    if(this.props.search_hamburger){
      return this.renderHeaderWithSearchAndHamburger()
    }
    if(this.props.search){
      return this.renderSearchHeader()
    }
    

  }



  render() {
        return (
          this.renderScreens()
        );
    }
}

const styles = {
  viewStyle: {
    backgroundColor: '#0843a3',
    justifyContent: 'center',
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    flexDirection: "row",
    alignItems: 'center',
   
    
  },
  textStyle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    
  },
  margintextforLeft:{
      marginLeft: 100
  },
  backButtonStyle: {
     flexDirection: 'row',
     backgroundColor: '#0843a3',   
     height: 60,
     
  },
  arrowStyle:{
      height: 30, 
      width: 40, 
      margin: 3, 
      display: 'flex', 
      paddingTop: 10,
      marginLeft: 60
  },
  messegeIcon : {
    height: 30, 
    width: 30
  },
  lineStyle: {
    height: 40, 
    width: 40, 
    margin: 3, 
  },
  searchStyle: {
    backgroundColor: 'white',
    borderRadius: 40,
    width: 300
  },
  blueText:{
    color: '#30dada',
    fontSize: 20
  }
};

// Make the component available to other parts of the app

