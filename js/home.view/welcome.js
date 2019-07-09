/* @flow */

import React, { Component } from 'react';

import {
  BackHandler,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  View,
  Alert,
  Image,
  Button,
  NativeModules,
  Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';




export default  class Welcome extends Component{

//    static navigationOptions = {
//      headerRight: <Button title="info" />,
//      title: 'Welcome',
//      headerBackTitle: '#f90',
//    };
    constructor(props){
        super(props);
        this.state = {
            swiperShow: false
        }
        this.lastTime = 0;
    }
     componentWillMount() {
        const { dispatch } = this.props;



     }
     componentDidMount(){

     }

    render(){
        let { navigation } = this.props;


      return (
          <View style={styles.welcome}>
             <Swiper style={styles.wrapper}>
                <View style={styles.slide}>
                      <Image
                         style={styles.slideImg}
                         source={require('../../assets/images/guide/guide1.jpg')}
                     />
                </View>
                <View style={styles.slide}>
                      <TouchableHighlight
                          style={styles.experience}
                          underlayColor="#fff"
                          onPress={() => this.closeSwiper()}
                      >
                          <Text style={styles.experienceText}>立即体验</Text>
                       </TouchableHighlight>
                     <Image
                         style={styles.slideImg}
                         source={require('../../assets/images/guide/guide4.jpg')}
                     />

                </View>
             </Swiper>
          </View>
        )
    }
}
const styles = StyleSheet.create({
   welcome: {
       position: 'absolute',
       left: 0,
       top: 0,
       right: 0,
       bottom: 0,
       zIndex: 10
  },
  slide: {
    flex: 1,
    position: 'relative',

  },
  slideImg: {
    width: '100%',
    height:  '100%'
  },
  experience: {
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -100}],
    bottom: '20%',
    zIndex:3

  },
  experienceText: {
    width: 200,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'rgba(248,182,44,0.8)',
    textAlign: 'center',
    borderRadius: 9,
  }
});
