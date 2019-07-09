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
    FlatList,
    DeviceEventEmitter,
    PixelRatio,
    Dimensions,
    Platform
} from 'react-native';
import JoyIcons from 'react-native-vector-icons/JoyIcons';

import { ConsultService }  from '../services/service';
import baseStyle from '../style/base';
import { storeUtil } from '../utils/storeUtil';
import { connect } from 'react-redux';
import { setUserData } from '../actions/actions';
import BaseComponent from '../base.compnent';
import ScrollableTabView,  {DefaultTabBar, ScrollableTabBar}     from 'react-native-scrollable-tab-view';
import ConsultItem from '../component/consult.item';
import ConsultTabBar from '../component/consult.tab.bar';

class ConsultList extends BaseComponent {

    static pageIndex = 1;
    static navigationOptions = ({ navigation }) => ({
        title: '我的咨询',
        headerStyle: {backgroundColor: '#01a29a'}
    })


    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: true,
            consultingList: [],
            consultedList: []
        }
        this.tabIndex = 0;
    }

    componentWillMount() {
        this.refreshFlat();
    }

    refreshFlat(){
        this.loadConsultList(1);
    }
    reachBottom(){
        this.loadConsultList();
    }
    changeTab({i}){
        this.tabIndex = i;
        this.setState({
            isRefreshing: true
        });
        this.loadConsultList(1);
    }
    loadConsultList(page){
        let state = 1;

        if (this.tabIndex == 1) {
            state = 2;
        }

        if (page) {
            pageIndex = page;
        }

        ConsultService.getConsultList(pageIndex, state).then( res => {

            pageIndex = res.pagination.pageNum + 1;

            this.setState(state => {
                let consultingList = state.consultingList;
                let consultedList = state.consultedList;
                let isRefreshing = state.isRefreshing;
                isRefreshing = false;

                if ( res.pagination.pageNum == 1) {

                    if (this.tabIndex == 0) {
                        consultingList = res.list;
                    } else {
                        consultedList = res.list;
                    }
                } else {
                    if (this.tabIndex == 0) {
                        consultingList = consultingList.concat(res.list);
                    } else {
                        consultedList = consultedList.concat(res.list);
                    }

                }

                if (this.tabIndex == 0) {
                    return ({consultingList, isRefreshing})

                } else {
                    return ({ consultedList, isRefreshing})
                }
            })
        })
    }
    render() {

        return (
            <ScrollableTabView
                onChangeTab={(state) => this.changeTab(state)}
                renderTabBar={() => <ConsultTabBar />}
                tabBarActiveTextColor="#f90"
                tabBarInActiveTextColor="#f00"
                >
                <View style={{flex: 1 }} tabLabel={{iconName: 'jcon-advice-type-ing', text: '正则解决'}}>
                    <FlatList
                        style={{flex: 1, paddingTop: 16}}
                        data={this.state.consultingList}
                        renderItem={(item) => this._renderItem(item)}
                        onRefresh={() => this.refreshFlat()}
                        refreshing={this.state.isRefreshing}
                        onEndReachedThreshold={0.1}
                        onEndReached={ () => this.reachBottom()}
                        ListEmptyComponent={this._emptyComponent}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        />
                </View>
                <View  style={{flex: 1}} tabLabel={{iconName: 'jcon-advice-type-finish', text: '已完成咨询'}}>
                    <FlatList
                        style={{flex: 1, paddingTop: 16}}
                        data={this.state.consultedList}
                        renderItem={(item) => this._renderItem(item)}
                        onRefresh={() => this.refreshFlat()}
                        refreshing={this.state.isRefreshing}
                        onEndReachedThreshold={0.3}
                        onEndReached={ () => this.reachBottom()}
                        ListEmptyComponent={this._emptyComponent}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        />
                </View>
            </ScrollableTabView>

        );
    }
    _keyExtractor(item){
        return item.id;
    }
    _emptyComponent(){
        return (
            <Text style={{justifyContent: 'center'}}>没有相关数据</Text>
        )
    }
    _renderItem({item}){
        return(
            <ConsultItem
                id={item.id}
                onPressItem={() => this.go('ConsultDetail', {consultId: item.id, title: item.title})}
                //selected={!!this.state.selected[item.id]}
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
export default connect(initData)(ConsultList);





const styles = StyleSheet.create({
    ...baseStyle

});