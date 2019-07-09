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
import { getCityName } from '../utils/util';
export default class MyItem extends Component{


    constructor(props){
        super(props);
    }
    onPressHandler(){
        this.props.onPressItem();
    }
    render(){
        const { item, onPressItem } = this.props;
        const pics ={
            sbfw:'jcon-advice-shebao',
            txzg:'jcon-advice-yanglao',
            gjjzx:'jcon-advice-fund',
            mfzg: 'jcon-home',
            gszx: 'jcon-color-order-new',
            jflh: 'jcon-advice-jflh'
        };
        return (
            <TouchableHighlight
                underlayColor="#f9f9f9"
                style={styles.item}
                onPress={ () => this.onPressHandler()}
                >
                <View>
                    <Text style={styles.itemTitle}>{getCityName(item.cityCode)}-{item.counCateName}</Text>
                    <View style={ styles.itemBody }>
                        <JoyIcons
                            name={pics[item.counCate]}
                            color="#f90"
                            size={36}
                            />
                        <View style={{flex:1, paddingLeft: 20,}}>
                            <Text
                                numberOfLines={1}
                                style={{fontSize: 14, paddingTop: 8, paddingBottom: 6,  color: '#565758'}}>{item.title}</Text>
                            <Text style={{fontSize: 12, color: '#888'}}>{item.creatTime}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#fff'
    },
    itemTitle: {
        padding: 6,
        paddingLeft: 15,
        fontSize: 14,
        color: '#565758',
        borderBottomWidth: 1/PixelRatio.get(),
        borderColor: '#efeff4'
    },
    itemBody: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 10,
        paddingTop: 4,
        paddingBottom: 4,
        flexDirection: 'row',
        alignItems: 'center'
    }

});