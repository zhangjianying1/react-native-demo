import React, { Component } from 'react';
import {
    Text,
    NetInfo,
    DeviceEventEmitter
} from 'react-native';
import listenerExit from './utils/exitapplistener';
import Toast from 'react-native-root-toast';
import Spinner from 'react-native-loading-spinner-overlay';

/**
 * 组件添加公用的方法（所有组件要继承这个类）
 */
export default class B extends React.Component{
    static network;
    constructor(props){
        super(props)
        listenerExit(props.navigation);
    }
    state = {
        loadingVisible: true
    }
    toast(toastMsg){
        let toast = Toast.show(toastMsg, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });
        setTimeout(function () {
            Toast.hide(toast);
        }, 1000);
    }
    /**
     * 跳转
     * @param name
     * @param validateLogin
     */
    go(name, validateLogin) {
        const { navigation, userData } = this.props;
        let targetUrl = name;
        let extraData = {};

        // 验证登录
        if (typeof validateLogin == 'string') {

            if (!userData.token) {
                targetUrl = 'Login';
            }
        } else if (validateLogin) {
            extraData = validateLogin;
        }
        navigation.navigate(targetUrl, extraData);

    }
    componentWillMount(){

        NetInfo.fetch().done((reach) => {
            network = reach;
            //this.toast('网络环境' + reach);
        });
    }

}