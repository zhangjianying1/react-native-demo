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
    RefreshControl,
    DeviceEventEmitter,
    PixelRatio,
    Platform
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import JoyIcons from 'react-native-vector-icons/JoyIcons';
import Swiper from 'react-native-swiper';
import service  from '../services/service';
import baseStyle from '../style/base';
import { AccountService } from '../services/service'
import { setUserData } from '../actions/actions';
let storeNavIndex;
import BaseComponent from '../base.compnent';
class Personal extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            isRefreshing: false,
            numState: {}
        }
    }

    componentDidMount() {
        setTimeout(()=> {
            this.setState({
                swiperShow: true
            });
        }, 0)
        DeviceEventEmitter.addListener('logined', data => {
            this.initView();
        })
    }
    componentWillReceiveProps(newProps){

        if (storeNavIndex == 3) return;

        // 当前视图激活
        if (newProps.nav.routes[0].index == 3) {
            this.initView();
            storeNavIndex = 3;
        }
    }
    initView(isRefresh){

        if (isRefresh) {
            let { dispatch } = this.props;
            AccountService.getUserInfo(isRefresh).then( res => {

                dispatch(setUserData(res));
                this.setState({
                    isRefreshing: false
                })
            }).catch( err => {
                dispatch(setUserData(''));
                this.setState({
                    isRefreshing: false
                })
            })
        }

        AccountService.getPersonInfo(isRefresh).then( res => {
            this.setState({
                numState: res
            })
        }).catch( err => {
            this.setState({
                numState: {}
            })
        })
    }

    toLogin() {
        const { navigate } = this.props.navigation;

        navigate('Login', {name: 'Jane'})
    }
    _onRefresh() {
        this.setState({isRefreshing: true});
        this.initView(true);
    }

    render() {

        const { userData } = this.props;
        const { numState } = this.state;

        return (
            <ScrollView style={styles.container}
                        refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => this._onRefresh()}
                tintColor="#ff0000"
                title="Loading..."
                titleColor="#00ff00"
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffff00"
              />
            }>
                <TouchableHighlight onPress={() => this.toLogin()}>
                    <View style={[styles.flexRow, styles.header]}>
                        <View style={{ width: 80, height: 80, borderRadius: 80, marginRight: 10}}>
                            {
                                userData.headPath
                                    ?
                                    <Image style={styles.photo} source={{uri: userData.headPath}}/>
                                    :
                                    <Image style={styles.photo} source={require('../../assets/images/user-photo.png')}/>

                            }

                        </View>
                        <View style={styles.flexAuto}>
                            <Text
                                style={[styles.fs18, styles.colorWhite, { marginBottom: 6}]}>{userData.token ? userData.mobile : '未登录'}</Text>
                            <Text
                                style={[styles.fs14, {color: '#efeff4'}]}>{userData.mobile ? userData.userName : '点击马上登录'}</Text>
                        </View>
                        {
                            userData.token
                                ?
                                <View>
                                    <Icon
                                        name="edit"
                                        fontSize="34"
                                        color="#fff"
                                        />
                                </View>
                                : null
                        }

                    </View>
                </TouchableHighlight>
                <View style={[styles.flexRow, styles.myBox]}>
                    <View style={[styles.flexAuto, styles.flexColumn,{alignItems: 'center'}]}>
                        <JoyIcons
                            name="jcon-color-joy-order"
                            size={46}
                            style={{color: "#f90"}}
                            />
                        <Text style={styles.font17}>我的订单</Text>
                    </View>
                    <TouchableHighlight
                        style={styles.flexAuto}
                        onPress={() => this.go('ConsultList', 'validateAuthor')}
                        underlayColor="#f9f9f9"
                        >
                        <View style={[ styles.flexColumn, styles.bor, {alignItems: 'center'}]}>
                            <JoyIcons
                                name="jcon-color-joy-advice"
                                size={46}
                                style={{color: "#f90"}}
                                />
                            <Text style={styles.font17}>我的咨询</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={[styles.flexAuto, styles.flexColumn, {alignItems: 'center'}]}>
                        <JoyIcons
                            name="jcon-color-joy-favorite"
                            size={46}
                            style={{color: "#f90"}}
                            />
                        <Text style={styles.font17}>我的收藏</Text>
                    </View>
                </View>
                <View style={[styles.mt10, styles.navList]}>
                    <TouchableHighlight onPress={() => this.go('SecurityList', 'validateAuthor')} underlayColor="#f8f8f8">
                        <View style={[styles.flexRow, styles.navBox, {borderTopWidth: 0}]}>
                            <JoyIcons
                                name="jcon-color-joy-shebao"
                                size={24}
                                style={{color: '#01a29a'}}
                                />
                            <Text style={[styles.flexAuto, styles.navText]}>我的社保卡</Text>
                            <Text style={ styles.cardNum }>{numState.joyCardNum}</Text>
                            <Icon
                                name="angle-right"
                                size={20}
                                style={{color: '#ddd'}}
                                />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.pressHandle} underlayColor="#f8f8f8">
                        <View style={[styles.flexRow, styles.navBox]}>
                            <JoyIcons
                                name="jcon-color-joy-shebao"
                                size={24}
                                style={{color: '#01a29a'}}
                                />
                            <Text style={[styles.flexAuto, styles.navText]}>我的公积金</Text>
                            <Text style={ styles.cardNum }>{numState.joyFundNum}</Text>
                            <Icon
                                name="angle-right"
                                size={20}
                                style={{color: '#ddd'}}
                                />
                        </View>
                    </TouchableHighlight>

                </View>
            </ScrollView>
        );
    }
}

const initData = state => {
    return {
        userData: state.userData,
        nav: state.nav
    }
}
export default connect(initData)(Personal);

const styles = StyleSheet.create({
    ...baseStyle,
    header: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 12,
        backgroundColor: "#02a7a9"
    },
    photo: {
        width: 80,
        height: 80,
        marginRight: 10,
        overflow: 'hidden'

    },
    myBox: {
        padding: 5,
        backgroundColor: '#fff'
    },
    bor: {
        borderLeftWidth: 1 / PixelRatio.get(),
        borderRightWidth: 1 / PixelRatio.get(),
        borderStyle: 'solid',
        borderColor: '#eee'
    },
    font17: {
        paddingTop: 6,
        color: '#595757',
        fontSize: 17,
        textAlign: 'center'
    },
    navList: {
        borderStyle: 'solid',
        borderColor: '#c8c7cc',
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get(),
        backgroundColor: '#fff'
    },
    navBox: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        marginLeft: 20,
        borderStyle: 'solid',
        borderColor: '#c8c7cc',
        borderTopWidth: 1 / PixelRatio.get()
    },
    navText: {
        fontSize: 16,
        paddingLeft: 10,
        color: '#595757'
    },
    cardNum: {
        paddingRight: 20,
        fontSize: 12,
        color: '#8F8F94'
    }
});