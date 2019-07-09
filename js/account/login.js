import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    DeviceEventEmitter,
    PixelRatio,
    Dimensions,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import JoyIcons from 'react-native-vector-icons/JoyIcons';
import {AccountService}  from '../services/service';
import baseStyle from '../style/base';
import { storeUtil } from '../utils/storeUtil';
import { connect } from 'react-redux';
import { setUserData } from '../actions/actions';
import BaseComponent from '../base.compnent';
import ViewInput from '../component/view.input';

class Personal extends BaseComponent {

    constructor(props) {
        super(props);
        console.log(this)
        this.state = {
            userData: {},
            formData: {},
            sendMsgText: '获取短信验证码'
        }
        this.formData = {mobile: '', msgCode: ''};
    }

    componentWillMount() {
    }

    validateFormData(validateKeys) {
        let mobileRE = /^1[23456789]{1}[0-9]{9}$/;
        let msgCodeRE = /^[0-9]{4}$/;
        let emptyRE = /\S/;
        let result = true;
        let toastMsg;
        validateKeys.forEach((key) => {
            let value = this.formData[key];


            if ('mobile' == key) {


                if (!emptyRE.test(value)) {
                    toastMsg = '手机号码不能为空';
                } else if (!mobileRE.test(value)) {
                    toastMsg = '手机号码不正确';
                }
            }

            if (!toastMsg && 'msgCode' == key) {
                if (!emptyRE.test(value)) {
                    toastMsg = '验证码不能为空';
                } else if (!msgCodeRE.test(value)) {
                    toastMsg = '验证码不正确';
                }
            }

            if (toastMsg) {
                this.toast(toastMsg);
                result = false;
                return;
            }
        })
        return result;

    }

    changeTextHandler(e, key) {
        this.formData[key] = e;
    }

    loginHandler() {

        const { dispatch } = this.props;
        if (!this.validateFormData(['mobile', 'msgCode'])) return;

        AccountService.toLogin(this.formData.mobile, this.formData.msgCode).then((res) => {
            dispatch(setUserData(res));
            DeviceEventEmitter.emit('logined', res);

            this.props.navigation.goBack();
        }, (err) => {
            console.log(err)
            this.toast(err.message);
        })
    }

    sendMsgCode() {
        let time = 10;
        let sendBtnText;
        let Mobile

        if (typeof this.state.sendMsgText == 'number') return;

        if (!this.validateFormData(['mobile'])) return;
        this.setState({
            sendBtnText: time + 's'
        })
        downTime.bind(this)();
        function downTime() {


            setTimeout(() => {

                if (time > 1) {
                    time--;
                    sendBtnText = time + 's';
                    downTime.bind(this)();
                } else {
                    sendBtnText = '再次发送短信验证码';
                }

                this.setState({
                    sendMsgText: sendBtnText
                })
            }, 1000)
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const { sendMsgText } = this.state;
        return (
            <ScrollView style={[styles.container, {backgroundColor: '#fff'}]}>
                <View style={[styles.flexRow, styles.flexJustifyCenter]}>
                    <Image style={styles.logoImg} source={require('../../assets/images/logo-h.png')}/>
                </View>
                <View style={[styles.flexRow, styles.inputBox]}>
                    <Image style={styles.inputIcon} source={require('../../assets/images/login-mobile.png')}/>
                    <ViewInput
                        underlineColorAndroid="transparent"
                        multiline={true}
                        autoFocus={true}
                        placeholder="手机号码"
                        keyboardType="phone-pad"
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        onChangeText={(e) => this.changeTextHandler(e, 'mobile')}
                        style={[styles.flexAuto, styles.input]}
                        clearButtonMode="fdf"
                        />
                    <TouchableHighlight
                        onPress={() => this.sendMsgCode()}
                        underlayColor="transparent"
                        >
                        <Text style={styles.sendBtnText}>{sendMsgText}</Text>
                    </TouchableHighlight>
                </View>
                <View style={[styles.flexRow, styles.inputBox]}>
                    <Image style={styles.inputIcon} source={require('../../assets/images/login-sms.png')}/>
                    <ViewInput
                        underlineColorAndroid="transparent"
                        multiline={true}
                        autoFocus={true}
                        placeholder="短信验证码"
                        keyboardType="phone-pad"
                        placeholderTextColor="#999"
                        maxLength={4}
                        autoCapitalize="none"
                        onChangeText={(e) => this.changeTextHandler(e, 'msgCode')}
                        onSubmitEditing={() => this.loginHandler()}
                        style={[styles.flexAuto, styles.input]}
                        />
                </View>
                <View style={{margin: 20}}>
                    <Button
                        style={styles.loginBtn}
                        title="登录"
                        color="#01a29a"
                        accessibilityLabel="fdffd"
                        onPress={() => this.loginHandler()}
                        />
                </View>
            </ScrollView>
        );
    }
}

const initData = state => {
    return {
        userData: state.userData,
    }
}
export default connect(initData)(Personal);

const styles = StyleSheet.create({
    ...baseStyle,
    logoImg: {
        width: 150,
        height: 54,
        marginTop: 30,
        marginBottom: 30,
    },
    inputBox: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderStyle: 'solid',
        borderColor: '#c8c7cc'
    },
    inputIcon: {
        width: 68,
        height: 40
    },
    input: {
        fontSize: 16,
        color: '#333',

    },
    sendBtnText: {
        padding: 10,
        color: '#00a0e9'
    },
    loginBtn: {
        marginTop: 40,
        fontSize: 18,
        color: '#fff'
    }
});