import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    TouchableOpacity,
    PixelRatio,
    Dimensions,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import JoyIcons from 'react-native-vector-icons/JoyIcons';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { setUserData } from '../actions/actions';
import { ArticleService }  from '../services/service';

import { storage } from '../utils/util';

import BaseComponent from '../base.compnent.js';
class Journal extends BaseComponent {

  static navigationOptions = {
       title: '期刊',
       headerStyle: {backgroundColor: '#fff'}
  };

  constructor(props){
    super(props);

    this.state = {
        swiperShow: false,
        specialData: {},
    }
  }
//    static navigationOptions = {
//      headerRight: <Button title="info" />,
//      title: 'Welcome',
//      headerBackTitle: '#f90',
//    };

  componentWillMount(){
//    const { dispatch, userData } = this.props;

    ArticleService.getNewSpecial().then((res) => {
        console.log(res)
        this.setState({
            specialData: res
        })
    })

  }
  componentDidMount(){

      setTimeout(()=>{
          this.setState({
              swiperShow:true
          });
      },0)
  }
  find(){
    console.log(this);
  }
  render() {
    const { specialData } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text>fdf</Text>
      </ScrollView>
    );
  }
}
const ininData = state => {

    return {
        userData: state.userData,
        securityData: state.securityData
    }
}
export default Journal;

const styles = StyleSheet.create({

  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#efeff4'
  },

});