import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';
import JoyIcons from 'react-native-vector-icons/JoyIcons';

const ConsultTabBar = React.createClass({
    tabIcons: [],

    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
    },

    componentDidMount() {
        this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
    },

    setAnimationValue({ value, }) {
        this.tabIcons.forEach((icon, i) => {
            const progress = Math.min(1, Math.abs(value - i))
            icon.setNativeProps({
                style: {
                    color: this.iconColor(progress),
                },
            });
        });
    },

    //color between rgb(59,89,152) and rgb(204,204,204)
    iconColor(progress) {
        const red = 59 + (204 - 59) * progress;
        const green = 89 + (204 - 89) * progress;
        const blue = 152 + (204 - 152) * progress;
        return `rgb(${red}, ${green}, ${blue})`;
    },

    render() {

        return <View style={[styles.tabs, this.props.style, ]}>
            {this.props.tabs.map((tab, i) => {

                return <TouchableOpacity
                    key={tab.iconName}
                    onPress={() => this.props.goToPage(i)}
                    style={[styles.tab,{ backgroundColor: this.props.activeTab === i ? '#fff' : 'transparent'}]}
                    >
                    <JoyIcons
                        name={tab.iconName}
                        size={22}
                        color="#f4a119"
                        />
                    <Text style={{ fontSize: 16, padding: 6, color: this.props.activeTab === i ? '#333' : 'rgb(204,204,204)'}}>{tab.text}</Text>
                </TouchableOpacity>;
            })}
        </View>;
    }
});

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#f8f8f8'
    },
    tabs: {
        height: 45,
        flexDirection: 'row',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },

});


export default ConsultTabBar