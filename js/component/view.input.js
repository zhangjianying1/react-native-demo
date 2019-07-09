import React, { Component } from 'react';

import {
    TextInput,
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
export default class ViewInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            isVisibleClear: false,
        }
    }
    clearHandler(key){
        this.setState({
            inputText: '',
            isVisibleClear: false
        })
        this.props.onChangeText('', key);
    }
    onChangeHandler(e, key){
        this.setState({
            inputText: e
        })
        this.props.onChangeText(e, key);

        if ('' !== e) {

            if (this.state.isVisibleClear) return;

            this.setState({
                isVisibleClear: true
            })
        } else {
            this.setState({
                isVisibleClear: false
            })
        }
    }
    render() {
        let { key, style, autoFocus, placeholder,placeholderTextColor  } = this.props;
        return (
            <View style={{flex: 1 }}>
                <TextInput
                    underlineColorAndroid="transparent"
                    multiline={true}
                    autoFocus={true}
                    placeholder={placeholder}
                    keyboardType="phone-pad"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    value={this.state.inputText}
                    onChangeText={(e) => this.onChangeHandler(e, key)}
                    style={style}
                    />
                {
                    this.state.isVisibleClear ?
                        <TouchableHighlight
                            onPress={() => this.clearHandler(key)}
                            underlayColor="transparent"
                            style={styles.clearIcon}
                            >
                            <Icon
                                size={24}
                                name="times-circle"
                                />
                        </TouchableHighlight>
                        : null
                }

            </View>
        )

    }
}

const styles = StyleSheet.create({
    clearIcon: {
        width: 40,
        height: '100%',
        position: 'absolute',
        top: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});