import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    TextInput,
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
import BaseComponent from '../base.compnent';


class ConsultDetail extends BaseComponent {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        headerStyle: {backgroundColor: '#01a29a'}
    })

    static _scrollView: any;
    constructor(props) {
        super(props);
        this.state = {
            chatList: [],
            inputHeight: 36
        }
    }

    componentWillMount() {
        const { consultId } = this.props.navigation.state.params;

        ConsultService.getConsultDetail(consultId).then( res => {

            this.setState({
                chatList: res.list
            })
            setTimeout(function() {
                _scrollView.scrollToEnd({animated: false});

            }, 1000)
        }).catch( err => {
            console.log(err)
        })
    }

    renderChat(){
        return this.state.chatList.map( (val, index) => {
            return (
                <View key={val.id}
                      style={[styles.chat,
                      { flexDirection:  val.userId ? 'row-reverse' : 'row',
                       marginRight:  val.userId ? 50 : 4,
                       marginLeft:  val.userId ? 4 :  50}
                       ]}>

                    <Image
                        style={styles.chatPhoto}
                        source={require('../../assets/images/service-dk.png')}
                        />
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={[styles.chatContent,  { backgroundColor: val.userId ? '#01a29a' : '#fff'}]}>
                            { val.counContent }
                            <Text style={styles.tips}></Text>
                        </Text>
                    </View>
                </View>
            )
        })
    }
    onChangeHandler(e){

        this.setState(state => {

            let inputText = state.inputText;
            inputText = e;
            return {inputText}
        })
    }
    onContentSizeChagne(event){
        let height = event.nativeEvent.contentSize.height > 80 ? 80 : event.nativeEvent.contentSize.height;
        this.setState({inputHeight: height});

    }
    render() {

        return (
            <View style={{flex:1}}>
                <ScrollView
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    style={{flex: 1, marginBottom: 10}}>
                    { this.renderChat() }
                </ScrollView>
                <View style={[styles.flexRow, styles.inputWrap]}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        multiline={true}
                        numberOfLines={4}
                        keyboardType="default"
                        autoCapitalize="none"
                        returnKeyLabel="发送"
                        maxLength={200}
                        value={this.state.inputText}
                        onChangeText={(e) => this.onChangeHandler(e)}
                        onContentSizeChange={(event) => this.onContentSizeChagne(event)}
                        style={[styles.input, {height: Math.max(36, this.state.inputHeight)}]}
                        />
                    <Button
                        onPress={() => console.log()}
                        color="#01a29a"
                        title="发送"
                        />
                </View>
            </View>
        )
    }
}


const initData = state => {
    return {
        userData: state.userData,
    }
}
export default connect(initData)(ConsultDetail);





const styles = StyleSheet.create({
    ...baseStyle,
    chat: {
        flexDirection: 'row',
        marginTop: 10,
    },
    chatPhoto: {
        width: 30,
        height: 30,
        margin: 4,
        borderRadius: 30,
        overflow: 'hidden'
    },
    chatContent: {
        padding: 6,
        marginTop: 4,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    inputWrap: {
        padding: 10,
        paddingTop: 4,
        paddingBottom: 4,
        alignItems: 'flex-end',
        backgroundColor: '#fff',
        borderTopWidth: 1/PixelRatio.get(),
        borderTopColor: '#ddd',
        position: 'relative'
    },
    input: {
        flex: 1,
        borderWidth: 1/PixelRatio.get(),
        marginRight: 10,
        borderColor: '#ddd',
        textAlignVertical: 'top'
    },
    tips: {
        width: 5,
        height: 5,
        backgroundColor: '#f90',
        transform: [{rotate: '90deg'}],
        position: 'absolute',
        right: 0,
        top: '50%'
    }

});