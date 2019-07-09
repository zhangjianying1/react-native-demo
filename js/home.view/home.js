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
    PixelRatio,
    Dimensions,
    DeviceEventEmitter,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import JoyIcons from 'react-native-vector-icons/JoyIcons';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { setUserData, setSecurityData } from '../actions/actions';
import { ArticleService, AccountService }  from '../services/service';
import { KEY, storeUtil } from '../utils/storeUtil'
let storeNavIndex;

import BaseComponent from '../base.compnent';
class Home extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            swiperShow: false,
            specialData: {},
            isHidePrice: false
        }
    }

    componentWillMount() {

        let { dispatch, userData } = this.props;
        AccountService.getUserInfo().then( res => {

            dispatch(setUserData(res));
            this.initView();
        })

        ArticleService.getNewSpecial().then((res) => {

            this.setState({
                specialData: res
            })
        })

    }

    initView() {
        let { dispatch, userData } = this.props;

        if (userData.securityAcctId) {
            ArticleService.getSecInfo(userData.securityId).then(res => {
                dispatch(setSecurityData(res));
            }).catch(err => {
                console.log(err)
            })
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

    find() {
        console.log(this);
    }
    render() {
        const { specialData, showWelcome } = this.state;
        const { userData, securtiyData } = this.props;

        return (
            <ScrollView style={styles.container}>
                <View >
                    { this.renderSec()}
                    <View style={[styles.flexBox, styles.entryWrap]}>
                        <View style={[styles.flexFull, styles.entryBox]}
                              removeClippedSubviews={true}
                            >
                            <Text
                                style={{color: '#f29700',paddingTop: 4, paddingBottom: 4, textAlign: 'center'}}>快速问答</Text>
                            <View style={styles.imgWrap}>
                                <Image
                                    style={styles.entryImage}
                                    source={require('../../assets/images/svc-wd.png')}
                                    />
                            </View>


                        </View>
                        <View style={[styles.flexFull, styles.entryBox]}>
                            <Text
                                style={{color: '#2ea7e0', paddingTop: 4, paddingBottom: 4, textAlign: 'center'}}>社保福利</Text>
                            <View style={styles.imgWrap}>
                                <Image
                                    style={styles.entryImage}
                                    source={require('../../assets/images/svc-sec.png')}
                                    />
                            </View>
                        </View>
                        <View style={[styles.flexFull, styles.entryBox]}>
                            <Text
                                style={{color: '#e43e46', paddingTop: 4, paddingBottom: 4, textAlign: 'center'}}>公积金查询</Text>
                            <View style={styles.imgWrap}>
                                <Image
                                    style={styles.entryImage}
                                    source={require('../../assets/images/svc-fund.png')}
                                    />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.flexBox, styles.service]}>
                        <View style={[styles.flexBox, styles.flexFull, styles.entryBox, {height: 80}]}>
                            <JoyIcons
                                name="jcon-users-circle"
                                size={68}
                                style={{ color: '#00a199'}}
                                />

                            <View style={[styles.pl10]}>
                                <Text>社保</Text>
                                <Text>服务</Text>
                            </View>
                        </View>
                        <View style={[styles.flexBox, styles.flexFull, styles.entryBox, {height: 80}]}>
                            <JoyIcons
                                name="jcon-pig-circle"
                                size={68}
                                style={{ color: '#ff5f27'}}
                                />
                            <View style={styles.pl10}>
                                <Text>金融</Text>
                                <Text>服务</Text>
                            </View>
                        </View>
                    </View>
                    {this.renderSwiper()}
                    <View style={styles.special}>
                        <View style={[styles.flexBox, styles.specialHeader]}>
                            <Icon
                                name="bullhorn"
                                size={16}
                                style={{ color: '#FF5722'}}
                                />
                            <Text style={[styles.slide, {color: '#000', fontSize: 15, marginLeft: 10}]}>查悦社保深度专栏</Text>
                            <Image
                                style={{width: 140, height: 40}}
                                source={require('../../assets/images/journal-logo.png')}
                                />
                        </View>
                        <View style={styles.specialImg}>
                            <Image
                                style={styles.flexBox}
                                source={{ uri: specialData.imageUrl }}
                                >
                                <View style={styles.mark}>
                                    <View style={styles.issue}>
                                        <Text style={[styles.fontWhite, styles.issueNum]}>{specialData.serialNumber}</Text>
                                        <Text style={styles.fontWhite}>{specialData.month}</Text>
                                    </View>
                                    <Text style={[styles.fontWhite, {fontSize: 18}]}>{specialData.title}</Text>
                                    <Text style={styles.iconHot}>Hot</Text>
                                </View>
                            </Image>
                        </View>
                        <TouchableHighlight
                            onPress={() => this.go('Journal')}
                            underlayColor="#f8f8f8"
                            >
                            <Text style={styles.specialMore}>查看更多》</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        );
    }

    hidePrice(){
        this.setState({
            isHidePrice: !this.state.isHidePrice
        })
        console.log(Date.now())
    }
    renderSec(){
        let { isHidePrice } = this.state;
        let { userData, securityData } = this.props;

        // 社保卡已绑定
        if (userData.securityAcctId) {
            return (
                <View style={styles.cardWrap}>
                    <Image
                        style={ styles.secBg }
                        source={require('../../assets/images/secbg.jpg')}

                        />
                    <View style={styles.secCont}>
                        <View style={styles.securityName}>
                            <Text style={styles.secIcon}></Text>
                            <Text style={{ fontSize: 16, color: '#01a29a', padding: 8, paddingRight: 12}}>{securityData.name}</Text>
                            <Text style={styles.secStatus}>{securityData.securityState}</Text>
                            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <TouchableHighlight
                                    onPress={ () => this.hidePrice() }
                                    underlayColor="transparent"
                                    >
                                    <View style={{  flexDirection: 'row' }}>
                                        <Icon
                                            size={16}
                                            backgroundColor="#f90"
                                            name={ isHidePrice ? "eye-slash" : "eye"}
                                            />
                                         <Text style={{ color: '#595757', fontSize: 12, paddingLeft: 6}}>{ isHidePrice ? '显示金额' : '隐藏金额' }</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>

                        </View>
                        <Text style={styles.securityBalance}>医保账户：
                            <Text style={styles.secBalanceNum}> { isHidePrice ? '****' : securityData.pensionAccountBalance}<Text style={styles.secCompany}>元</Text></Text>
                        </Text>
                        <Text style={styles.securityBalance}>养老账户：
                            <Text style={styles.secBalanceNum}> {isHidePrice ? '****' :  securityData.medicalAccountBalance} <Text style={styles.secCompany}>元</Text></Text>
                        </Text>

                        <TouchableHighlight
                            style={ styles.viewDetail}
                            underlayColor="#f8f8f8"
                            onPress={ () => this.go('SecurityDetail', {securityId: userData.securityAcctId, name: securityData.name})}
                            >
                            <Text style={{ color: '#595757' }}>查看详情</Text>
                        </TouchableHighlight>
                    </View>

                </View>
            );
        } else {
            return (
                <View style={styles.cardWrap}>
                    <Icon.Button
                        name="search"
                        color="#01a29a"
                        onPress={() => { this.go('Security', 'validateLogin')}}
                        style={styles.cardBtn}
                        backgroundColor="#fff">
                        <Text
                            style={{color: '#01a29a', fontSize: 15}}>查询社保</Text>
                    </Icon.Button>

                    <Text style={{color: '#fff', lineHeight: 44, fontSize: 16}}>一键发现社保福利</Text>

                </View>
            );
        }

    }
    renderSwiper() {

        if (this.state.swiperShow) {
            return (
                <Swiper style={styles.wrapper} autoplay={true} loop={true}>
                    <View style={styles.slide}>
                        <Image
                            style={styles.slideImg}
                            source={require('../../assets/images/banner/1.jpg')}
                            />
                    </View>
                    <View style={styles.slide}>
                        <Image
                            style={styles.slideImg}
                            source={require('../../assets/images/banner/2.jpg')}
                            />
                    </View>
                    <View style={styles.slide}>
                        <Image
                            style={styles.slideImg}
                            source={require('../../assets/images/banner/3.jpg')}
                            />
                    </View>
                    <View style={styles.slide}>
                        <Image
                            style={styles.slideImg}
                            source={require('../../assets/images/banner/4.jpg')}
                            />
                    </View>
                </Swiper>
            )
        } else {
            return;
        }
    }
}
const initData = state => {
    return {
        userData: state.userData,
        securityData: state.securityData
    }
}
export default connect(initData)(Home);
const styles = StyleSheet.create({
    pl10: {
        paddingLeft: 10
    },
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: '#efeff4'
    },

    cardWrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 190,
        backgroundColor: '#01a29a',
    },
    cardBtn: {
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 4,
        backgroundColor: '#fff',
        shadowOffset: {width: 1, height: 2},
        shadowColor: '#ddd',
    },
    secBg: {
        width: Dimensions.get('window').width - 40,
        height: 140,
        borderRadius: 10,
        overflow : 'hidden'
    },
    secCont: {
        position: 'absolute',
        left: 20,
        top: 25,
        right: 20,
        bottom: 25,
        zIndex: 2
    },
    secIcon: {
        width: 6,
        height: 18,
        borderTopWidth: 6,
        borderBottomWidth: 6,
        borderTopColor: '#f8b62d',
        borderBottomColor: '#8cc63f',
        backgroundColor: '#0c6393'
    },
    securityName: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 2,
        paddingRight: 10
    },
    secStatus: {
        paddingLeft: 6,
        paddingRight: 6,
        fontSize: 12,
        backgroundColor: '#01a29a',
        color: '#fff',
        borderRadius: 10,
    },
    securityBalance: {
        padding: 4,
        paddingLeft: 8,
        fontSize: 14,
        color: '#595757'
    },
    secBalanceNum: {
        fontSize: 18,
        color: '#00a29a',
        fontWeight: "800"
    },
    secCompany: {
        color: '#00a29a',
        fontSize: 14,
        fontWeight: "200"
    },
    viewDetail: {
        padding: 5,
        paddingLeft: 14,
        paddingRight: 14,
        borderWidth: 1/PixelRatio.get(),
        borderColor: '#00a29a',
        backgroundColor: '#fff',
        borderRadius: 4,
        position: 'absolute',
        right: 10,
        bottom: 20,
    },
    flexFull: {
        flex: 1,
    },
    flexBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    entryWrap: {
        marginTop: 5,
        marginBottom: 2.5,
        marginLeft: 2.5,
        marginRight: 2.5
    },
    entryBox: {
        marginLeft: 2.5,
        marginRight: 2.5,
        borderRadius: 10,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#b5b5b6',
        borderStyle: 'solid',
        backgroundColor: '#fff'
    },
    imgWrap: {
        width: '100%',
        height: Dimensions.get('window').width / 3 * .7 || 120
    },
    entryImage: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden'
    },
    service: {
        marginTop: 2.5,
        marginLeft: 2.5,
        marginBottom: 5,
        marginRight: 2.5
    },
    wrapper: {
        height: 170,
    },
    slide: {
        flex: 1
    },
    slideImg: {
        width: '100%',
        height: '100%'
    },
    special: {
        marginTop: 10,
        backgroundColor: '#fff'
    },
    specialHeader: {
        height: 50,
        padding: 10,
        marginLeft: 15,
        marginRight: 15,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#b5b5b6',
        borderStyle: 'solid',
        backgroundColor: '#fff'
    },
    mark: {
        display: 'flex',
        height: 200,
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, .4)'
    },
    iconHot: {
        position: 'absolute',
        width: 70,
        padding: 2,
        paddingLeft: 10,
        backgroundColor: '#f00',
        borderRadius: 10,
        right: -10,
        top: 30,
        color: '#fff',
        fontSize: 18
    },
    specialMore: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#e4e4e4',
        fontSize: 16,
        color: '#00a090',
        textAlign: 'right',
    },
    issue: {
        position: 'absolute',
        top: 20,
        left: 30
    },
    issueNum: {
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#fff',
        borderStyle: 'solid',

    },
    fontWhite: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center'
    }
});