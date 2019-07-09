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
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import JoyIcons from 'react-native-vector-icons/JoyIcons';
import Swiper from 'react-native-swiper';

import { setUserData } from '../actions/actions';
import { ArticleService }  from '../services/service';

import { storage } from '../utils/util';
import BaseComponent from '../base.compnent.js';

class SecurityDetail extends BaseComponent {

    static navigationOptions = ({ navigation }) => ({
            title: `${navigation.state.params.name}'s Profile!`,
            headerStyle: {backgroundColor: '#fff'}
        })

    ;
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
        const { dispatch, userData, navigation } = this.props;

        //ArticleService.getNewSpecial().then((res) => {
        //    console.log(res)
        //    this.setState({
        //        specialData: res
        //    })
        //})

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
const initData = state => {

    return {
        userData: state.userData
    }
}
export default connect(initData)(SecurityDetail);

const styles = StyleSheet.create({

    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: '#efeff4'
    },

});