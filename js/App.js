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
    NetInfo,
    View,
    Alert,
    Image,
    Button,
    Animated,
    NativeModules,
    DeviceEventEmitter,
    Dimensions
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import { StackNavigator, addNavigationHelpers  } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import { storeUtil } from './utils/storeUtil';
import { Provider, connect } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { securityData, userData } from './reducers/reducersmodule'
import { setUserData } from './actions/actions';
import Swiper from 'react-native-swiper';
import listenerExit from './utils/exitapplistener';
import { AppNavigator } from './config/routesconfig';

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

const appReducer = combineReducers({
    nav: navReducer,
    securityData,
    userData
});

const providerStore = createStore(appReducer);
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeWelcome: new Animated.Value(1),
            showWelcome: null,
            loadingVisible: false
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        storeUtil.loadData('USER').then(res => {

            dispatch(setUserData(res));
        }).catch(err => {

        })
        storeUtil.loadData('WELCOME').then(res => {
            SplashScreen.hide();
            this.setState({
                showWelcome: false
            })
        }).catch(err => {
            this.setState({
                showWelcome: true
            })
            SplashScreen.hide();
        })
        DeviceEventEmitter.addListener('loadingShow', data => {
            console.log('loading', 'show')
            this.setState({
                loadingVisible: true
            })
        })
        DeviceEventEmitter.addListener('loadingHide', data => {
            console.log('loading', 'hide')
            this.setState({
                loadingVisible: false
            })
        })

    }

    componentDidMount() {
        function handleFirstConnectivityChange(reach) {
            console.log('First change: ' + reach);
            NetInfo.removeEventListener(
                'connectionChange',
                handleFirstConnectivityChange
            );
        }
        NetInfo.addEventListener(
            'connectionChange',
            handleFirstConnectivityChange
        );


    }

    closeSwiper() {
        Animated.timing(                            // 随时间变化而执行的动画类型
            this.state.fadeWelcome,                      // 动画中的变量值
            {
                toValue: 0,
                duration: 300 // 透明度最终变为1，即完全不透明
            }
        ).start();

        setTimeout(() => {
            this.setState({
                showWelcome: false
            })
        }, 200)

        storeUtil.saveData('WELCOME', true);
    }

    render() {
        let { showWelcome, fadeWelcome } = this.state;

        if (showWelcome) {
            return (
                <Animated.View
                    style={{flex: 1, opacity: fadeWelcome }}>
                    <Swiper style={{ flex: 1}}>
                        <View style={styles.slide}>
                            <Image
                                style={styles.slideImg}
                                source={require('./../assets/images/guide/guide1.jpg')}
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
                                source={require('./../assets/images/guide/guide4.jpg')}
                                />

                        </View>
                    </Swiper>
                </Animated.View>
            )
        } else {
            return (
                <View style={{flex: 1}}>
                    <AppNavigator
                        navigation={addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: this.props.nav,
                    })}
                        />
                    <Spinner visible={false} textContent={"Loading..."} textStyle={{color: '#f00'}} />
                </View>
            )
        }
    }

}

const mapStateToProps = (state) => ({
    nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);


export default function Root() {
    return (
        <Provider store={providerStore}>
            <AppWithNavigationState />
        </Provider>
    );
}

const styles = StyleSheet.create({
    containers: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    welcome: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 40,
        backgroundColor: '#f90'
    },
    slide: {
        flex: 1,
        position: 'relative'

    },
    slideImg: {
        width: '100%',
        height: '100%'
    },
    experience: {
        position: 'absolute',
        left: '50%',
        transform: [{translateX: -100}],
        bottom: '20%',
        zIndex: 3

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

})


