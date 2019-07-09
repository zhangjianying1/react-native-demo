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
    PixelRatio,
    Dimensions,
    Platform
} from 'react-native';
import JoyIcons from 'react-native-vector-icons/JoyIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import { NewsService }  from '../services/service';
import baseStyle from '../style/base';
import { storeUtil } from '../utils/storeUtil';
import { connect } from 'react-redux';

import BaseComponent from '../base.compnent';
import NewsItem from '../component/news.item';
import DropList from '../component/droplist.view.js';
let storeNavIndex;
class NewsList extends BaseComponent {

    static navigationOptions = ({navigation}) => ({
        tabBarLabel: '悦社',
        tabBarIcon: ({ tintColor, focused }) => (
            <JoyIcons
                name={ focused ? 'jcon-doc' : 'jcon-doc-o' }
                size={24}
                style={{ color: focused ? '#01a29a' : '#929292' }}
                />
        ),
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: true,
            newsList: [],
            activeId: null,
            dropListVisible: false
        }
        this.pageIndex = 1;
    }
    toggleDropList(){
        this.setState({dropListVisible: !this.state.dropListVisible});
    }
    componentWillReceiveProps(newProps){

        if (storeNavIndex == 1) return;

        // 当前视图激活
        if (newProps.nav.routes[0].index == 1) {
            storeNavIndex = 1;
            this.refreshFlat();
        }
    }
    refreshFlat(){
        this.loadConsultList(1);
    }
    reachBottom(){
        //this.loadConsultList();
    }

    loadConsultList(page){

        if (page) {
            this.pageIndex = page;
        }

        NewsService.getNewsList(this.pageIndex).then( res => {

            this.pageIndex = res.pagination.pageNum + 1;

            this.setState(state => {
                let newsList = state.newsList;
                let isRefreshing = state.isRefreshing;
                isRefreshing = false;


                if ( res.pagination.pageNum == 1) {
                    newsList = res.list;
                } else {
                    newsList = newsList.concat(res.list);
                }
                return {isRefreshing, newsList};

            })
        })
    }
    render() {

        if (!storeNavIndex) return null;
        return (
            <View style={{flex:1}}>
                <View style={[styles.flexRow, styles.myHeader]}>
                    <Text style={styles.searchTitle}>悦社</Text>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        activeOpacity={1}
                        >
                        <View  style={[styles.flexRow, styles.searchBox]}>
                            <Icon
                                name="search"
                                size={20}
                                style={{color: '#fff', padding: 8}}
                                />
                            <Text style={{fontSize: 14, color: '#fff'}}>搜索政策</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.toggleDropList()}
                        activeOpacity={1}
                        >
                        <Icon
                            name={this.state.dropListVisible ? 'chevron-down' : 'reorder'}
                            size={24}
                            style={{color: '#fff', padding: 10}}
                            />
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{flex: 1, paddingTop: 16}}
                    data={this.state.newsList}
                    renderItem={(item) => this._renderItem(item)}
                    onRefresh={() => this.refreshFlat()}
                    refreshing={this.state.isRefreshing}
                    onEndReachedThreshold={0.1}
                    onEndReached={ () => this.reachBottom()}
                    ListEmptyComponent={this._emptyComponent}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    />
                <DropList
                    selectOptions={[1,2,3,4]}
                    dropListVisible={this.state.dropListVisible}
                    cancelHandler={() => this.toggleDropList()}
                    />
            </View>

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
    pressHandler(params){

        // 视频
        if (params.docType ) {

            if (params.id == this.state.activeId) return;
            this.setState({activeId: params.id})
        } else {
            this.go('', params);
        }
    }
    _renderItem({item}){
        return(
            <NewsItem
                id={item.id}
                activeId={this.state.activeId}
                onPressItem={() => this.pressHandler({docType: item.videoUrl, id: item.id, title: item.title})}
                //selected={!!this.state.selected[item.id]}
                item={item}
                />
        )
    }
}


const initData = state => {
    return {
        userData: state.userData,
        nav: state.nav
    }
}
export default connect(initData)(NewsList);

const styles = StyleSheet.create({
    ...baseStyle,
    myHeader: {
        height: 44,
        backgroundColor: '#00a199',
        alignItems: 'center'
    },
    searchTitle: {
        padding: 10,
        fontSize: 20,
        color: '#fff',
        textShadowColor: '#333',
        textShadowOffset: {width: 1, height: 1}
    },
    searchBox: {
        marginTop: 6,
        marginBottom: 6,
        flex: 1,
        borderWidth: 1/PixelRatio.get(),
        borderColor: '#ddd',
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 2555, .3)'
    }

});