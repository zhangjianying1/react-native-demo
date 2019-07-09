import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Alert,
    FlatList,
    StyleSheet,
    TouchableHighlight,
    PixelRatio,
    Dimensions,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { setSecurityData } from '../actions/actions';
import { ArticleService }  from '../services/service';
import baseStyle from '../style/base';
import BaseComponent from '../base.compnent';
import Popup from '../component/popup';
import { storeUtil } from '../utils/util'


class MyItems extends Component{
    _onPress(){
        this.props.onLongPressItem(this.props.id);
    };
    go(routeName, extraData){
        this.props.onPressItem(routeName, extraData);
    }
    render(){
        let { item } = this.props;

        return (
            <TouchableHighlight
                onLongPress={() => this._onPress()}
                onPress={() => this.go('SecurityDetail', {securityAcctId: item.id, name: item.name})}
                underlayColor="transparent"
                key={item.id}
                >
                <View
                    style={[styles.flexRow, styles.cardBox, { backgroundColor: item.isMainAccount ? '#30b0aa' : '#006AA9'}]}
                    >
                    <View style={styles.iconBox}>
                        <Icon
                            size={24}
                            color={item.isMainAccount ? '#30b0aa' : '#006AA9'}
                            name="credit-card"
                            />
                    </View>
                    <View style={{flex: 1}}>
                        <View style={[styles.flexRow, styles.flexJustifyBetween]}>
                            <Text style={[styles.fs14Gray, {color: '#fff'}]}>{item.name}</Text><Text  style={styles.fs14Gray}>{item.payCity}</Text>
                        </View>
                        <Text style={{fontSize: 18, marginTop: 6, marginBottom: 4, color: '#fff'}}>{item.securityAccount}</Text>
                        <View style={[styles.flexRow, styles.flexJustifyBetween]}>
                            <Text  style={styles.fs14Gray}>{item.securityState}</Text><Text  style={styles.fs14Gray}>{item.lastRefreshDate}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}
class SecurityList extends BaseComponent {
    //

    static navigationOptions = ({ navigation }) => ({
        title: '我的社保卡',
        headerRight: (
            <TouchableHighlight
                style={{width: 60, height: 40, justifyContent: 'center', alignItems: 'center'}}
                onPress={() => this.go('SecurityAdd')}
                >
                <Icon
                    size={20}
                    name="plus"
                    color="#fff"
                    />
            </TouchableHighlight>
        ),
        headerStyle: {backgroundColor: '#01a29a'}
    })
    static activeId = null;
    constructor(props){
        super(props);
        this.state = {
            securityList: [],
            isRefreshing: false,
            popupVisible: false,
            selected: {}
        };
    }


    componentWillMount(){
        //const { dispatch, navigation } = this.props;

        ArticleService.getSecList().then((res) => {

            this.setState({
                securityList: res,
                isRefreshing: false
            })
        })

    }


    refreshFlat(){
        //this.setState({
        //    isRefreshing: true
        //})
        this.componentWillMount();
    }
    reachBottom(){
        //this.componentWillMount();
    }
    _emptyComponent(){
        return (
            <Text style={{ textAlign: 'center'}}>没有相关内容</Text>
        )
    }

    selectHandler(index){

        let msg = '解除绑定';

        if (0 == index) {
            msg = '设为默认'
        }
        Alert.alert(
            '提示',
            msg,
            [
                {text: '取消', onPress: () => {

                }, style: 'cancel'},
                {text: '确定', onPress: () => {

                    if (index == 1) {
                        this.deleteHandler();
                    } else {
                        this.changeDefaultAccount();
                    }
                    this.cancelHandler();
                }},
            ],
            { cancelable: false }
        )
    }
    cancelHandler(){

        this.setState({
            popupVisible: false
        })
    }
    changeStoreSecurityData(data){
        let { dispatch } = this.props;

        dispatch(setSecurityData(data));
        storeUtil.saveData('SECURITY', data);
    }
    changeDefaultAccount(){
        ArticleService.changeDefaultAccount(activeId).then( res => {

            this.setState((state) => {
                let securityList = state.securityList;
                let temp = securityList[0];
                temp.isMainAccount = 0;
                let targetIndex = securityList.findIndex((val) => {

                    if (activeId == val.id) {
                        val.isMainAccount = 1;
                        this.changeStoreSecurityData(val);
                        return true;
                    }
                })
                securityList[0] = securityList[targetIndex];
                securityList[targetIndex] = temp;
                return ({securityList});
            })
            this.toast('修改成功');
        }).catch( err => {
            console.log(err)
        })
    }
    deleteHandler(){
        ArticleService.removeSecurity(activeId).then( res => {

            this.setState((state) => {
                let securityList = state.securityList;

                securityList = securityList.filter( val => {

                    if (val.id !== activeId) {
                        return val;
                    }
                })
                return ({securityList});
            })
            this.toast('删除成功');
        }).catch( err => {
            console.log(err)
        })
    }
    render() {

        return (
            <View style={{flex: 1}}>
                <FlatList
                    style={{flex: 1, paddingTop: 16}}
                    data={this.state.securityList}
                    renderItem={(item) => this._renderItem(item)}
                    onRefresh={() => this.refreshFlat()}
                    refreshing={this.state.isRefreshing}
                    onEndReachedThreshold={0.3}
                    onEndReached={ () => this.reachBottom()}
                    ListEmptyComponent={this._emptyComponent}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    />
                <Popup
                    selectOptions={['设为默认', '解除绑定']}
                    popupVisible={this.state.popupVisible}
                    selectHandler={(index) => this.selectHandler(index)}
                    cancelHandler={() => this.cancelHandler()}
                    />
            </View>
        );
    }
    _onLongPressItem(id: string){

        this.setState({
            popupVisible: true
        })
        activeId = id;
    }

    _keyExtractor(item, index){
        return item.id;
    }
    _renderItem({item}){
        return (
            <MyItems
                id={item.id}
                onLongPressItem={ (id) => this._onLongPressItem(id)}
                onPressItem={(routeName, extraData) => this.go(routeName, extraData)}
                selected={!!this.state.selected[item.id]}
                item={item}
                />
        )
    }
}
const initData = state => {

    return {
        userData: state.userData,
    }
}
export default connect(initData)(SecurityList);

const styles = StyleSheet.create({
    ...baseStyle,
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: '#efeff4'
    },
    cardBox: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: '#006AA9',
        padding: 10,
        margin: 10,
        marginBottom: 0,
        borderRadius: 2,
        shadowColor : '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        elevation: 4,
    },
    iconBox: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 40,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center'
    },
    fs14Gray: {
        fontSize: 12,
        color: '#D8D8D8'
    }

});