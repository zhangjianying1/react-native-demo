import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import JoyIcons from 'react-native-vector-icons/JoyIcons';
import VideoView from '../component/video.view.js';
import baseStyle from '../style/base.js';
export default class MyItem extends Component{


    constructor(props){
        super(props);
        this.state = {
            activeId: null
        }
    }
    componentWillMount(){

    }
    onPressHandler(){
       this.props.onPressItem();
    }
    render(){
        const { item, onPressItem, activeId } = this.props;

        return (
            <TouchableHighlight
                underlayColor="#f9f9f9"
                style={styles.item}
                onPress={ () => this.onPressHandler(item.videoUrl, item.id)}
                >
                <View>
                    <View style={[styles.flexRow, styles.flexJustifyBetween]}>
                        <View style={styles.flexRow}>
                            {
                                item.authorHeadPath ?
                                    <Image
                                        style={styles.headPath}
                                        source={{uri: item.authorHeadPath}}
                                        />
                                    :
                                    <Image
                                        style={styles.headPath}
                                        source={require('../../assets/images/logo.png')}
                                        />
                            }

                            <Text style={styles.headName}>{item.authorName}</Text>
                        </View>
                        <Text style={styles.releaseTime}>{item.releaseDate}</Text>
                    </View>

                    <Text style={styles.title}>{item.title}</Text>
                    <Text numberOfLines={2} style={styles.des}>{item.introduce}</Text>
                    <View style={styles.image}>
                        {
                            item.videoUrl ?

                                <VideoView
                                    uri="http://10.16.2.223:8082/upload/ckeditor/joy.mp4"
                                    poster={item.image}
                                    activeId={activeId}
                                    id={item.id}
                                    onPressItem={onPressItem}
                                    />

                                :
                                <Image
                                    style={styles.image}
                                    source={{uri: item.image}}
                                    />
                        }
                    </View>

                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    ...baseStyle,
    item: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        backgroundColor: '#fff'
    },
    headPath: {
        width: 20,
        height: 20,
        borderRadius: 40,
        marginRight: 6
    },
    authorName: {
        fontSize: 12,
        color: '#333'
    },
    releaseTime: {
        padding: 10,
        fontSize: 12,
        color: '#666'
    },
    title: {
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 16,
        color: '#333'
    },
    des: {
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 12,
        color: '#999'
    },
    image: {
        width: '100%',
        height: 200,
        backgroundColor: '#f90'
    }

});