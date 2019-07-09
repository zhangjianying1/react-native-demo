/**
 * Created by peixuan.xie on 2017/2/28.
 */
import React, { Component } from 'react';
import {
    Modal,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View ,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
    BackAndroid
} from 'react-native';

let SCREEN_WIDTH = Dimensions.get('window').width;//宽
let SCREEN_HEIGHT = Dimensions.get('window').height;//高


export default class DropList extends Component {

    // 构造
    constructor(props) {
        super(props);
        this.state = {
            visible: new Animated.Value(0),
            translate: new Animated.Value(0)
        }
    }
    componentWillReceiveProps(newProps){

        if (newProps.dropListVisible === true) {
            this.in();
        }
    }
    cancelHandler(){
        console.log(3333)
        this.out();
    }
    selectHandler(index){
        this.props.selectHandler(index)
    }
    in(){
        Animated.parallel([
            Animated.timing(
                this.state.visible,
                {
                    easing: Easing.inOut(Easing.ease),
                    duration: 500,
                    toValue: .75,
                }
            ),
            Animated.timing(
                this.state.translate,
                {
                    easing: Easing.inOut(Easing.ease),
                    duration: 500,
                    toValue: 1,
                }
            )
        ]).start();
    }
    out(){
        Animated.parallel([
            Animated.timing(
                this.state.visible,
                {
                    easing: Easing.inOut(Easing.ease),
                    duration: 500,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.translate,
                {
                    easing: Easing.inOut(Easing.ease),
                    duration: 500,
                    toValue: 0,
                }
            )
        ]).start( () => {
            this.props.cancelHandler && this.props.cancelHandler();
        });
    }
    render() {
        // onPress事件直接与父组件传递进来的属性挂接

        if (this.props.dropListVisible) {

            return (
                <View style={{flex: 1, padding: 40}}>
                    <Modal
                        style={{flex:1, marginTop: 44}}
                        visible={true}
                        transparent={true}

                        onRequestClose={() => {}} //如果是Android设备 必须有此方法
                        >
                        <Animated.View
                            style={[styles.bg, { opacity: this.state.visible}]}
                            >

                        </Animated.View>

                        <Animated.View

                            style={[styles.dropList,
                            {transform: [{
                                translateY: this.state.translate.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-SCREEN_HEIGHT, 0]
                                }),
                            }]
                            }
                        ]}>
                            <TouchableOpacity
                                onPress={ () => this.cancelHandler()}
                                style={{flex:1}}
                                activeOpacity={1}
                                >
                                <View>
                                    {this.renderOptions()}

                                </View>
                            </TouchableOpacity>


                        </Animated.View>


                    </Modal>
                </View>
            );
        } else {
            return null;
        }

    }
    renderOptions(){

       return this.props.selectOptions.map((val, index) => {
            return (
                <TouchableHighlight
                    key={index}
                    style={[styles.options,{ marginBottom: 6}]}
                    underlayColor="#fff"
                    onPress={ () => this.selectHandler(index)}>
                    <Text style={styles.optionText}>
                        {val}
                    </Text>
                </TouchableHighlight>
            )
        })
    }
}


const styles = StyleSheet.create({

    bg: {  //全屏显示 半透明 可以看到之前的控件但是不能操作了
        backgroundColor: 'rgba(52,52,52,0.5)',  //rgba  a0-1  其余都是16进制数
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
    },
    dropList: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-start'
    },
    options: {
        height: 40,
        margin: 10,
        marginTop: 0,
        backgroundColor: '#fff',
        borderRadius: 4,
        justifyContent: 'center'
    },
    optionText: {
        width: SCREEN_WIDTH - 20,
        textAlign: 'center',
        fontSize: 16,
        color: '#f90',
    }
});