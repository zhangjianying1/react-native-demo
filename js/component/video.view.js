
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import Orientation from 'react-native-orientation';
let timer = null;

export default class VideoView extends Component {
    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
        paused: true,
        videoTime: 0,
        isShowControl: false,
        isShowPlayBtn: true,
        fullScreen: false
    };
    video: Video;
    onLoad = (data) => {
        this.setState({ duration: data.duration });
    };
    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
    };
    onEnd = () => {
        this.setState({ paused: true })
        this.video.seek(0)
    };
    onAudioBecomingNoisy = () => {
        this.setState({ paused: true })
    };
    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        console.log(event)
        this.setState({ paused: !event.hasAudioFocus })
    };
    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };
    renderRateControl(rate) {
        const isSelected = (this.state.rate === rate);
        return (
            <TouchableOpacity onPress={() => { this.setState({ rate }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {rate}x
                </Text>
            </TouchableOpacity>
        );
    }
    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode === resizeMode);
        return (
            <TouchableOpacity onPress={() => { this.setState({ resizeMode }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }
    renderVolumeControl(volume) {
        const isSelected = (this.state.volume === volume);
        return (
            <TouchableOpacity onPress={() => { this.setState({ volume }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }
    play(id){

        // 执行父组件的方法
        this.props.onPressItem();

        // 如果当前视频状态是活动的；
        if (this.props.activeId == id) {
            this.setState({
                isShowControl: !this.state.isShowControl,
                isShowPlayBtn: !this.state.isShowPlayBtn
            })
            clearTimeout(timer);
            timer = setTimeout(() => {

                // 播放中
                if (!this.state.paused && this.state.isShowControl) {
                    this.setState({
                        isShowControl: false,
                        isShowPlayBtn: false
                    })
                }
            }, 3000)

        } else {
            this.setState({ paused: false, isShowPlayBtn: false })
        }
    }
    controlVideoHandler(){

        this.setState(state => {

            let { paused, isShowPlayBtn, isShowControl } = state;

            if (paused) {
                isShowControl = isShowPlayBtn = false;
            }
            paused = !paused;

            return {paused, isShowPlayBtn, isShowControl};
        })
    }
    getPlayingTime(){
        let { currentTime } = this.state;

        if (currentTime < 60) {
            return '00' + ':' + parseInt(currentTime);
        } else {
            return parseInt(currentTime / 60) + ':' + parseInt(currentTime % 60);
        }
    }

    componentWillReceiveProps(newsProps){

        if (newsProps.activeId !== newsProps.id ) {
            this.setState({ paused: true, isShowPlayBtn: true, isShowControl: false })
        }


    }
    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        const playingTime = this.getPlayingTime();
        let { paused } = this.state;
        let fullScreenStyle = {};

        if (this.state.fullScreen) {
            fullScreenStyle = {
                position: 'fixed',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: 3,
                borderWidth: 1,
                borderColor: '#f90'
            }
        }
        return (
            <View style={[styles.container, fullScreenStyle]}>
                <TouchableOpacity
                    activeOpacity={.9}
                    style={styles.fullScreen}
                    onPress={() => this.play(this.props.id)}
                    >
                    <Video
                        ref={(ref: Video) => { this.video = ref }}
                        source={{uri: this.props.uri}}
                        style={styles.fullScreen}
                        rate={this.state.rate}
                        paused={paused}
                        poster={this.props.poster}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        resizeMode={this.state.resizeMode}
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                        onAudioFocusChanged={this.onAudioFocusChanged}
                        repeat={false}
                        />
                    {
                        this.state.isShowPlayBtn
                            ?
                            <View style={styles.mark}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={styles.playBtn}
                                    onPress={ () => this.controlVideoHandler()}
                                    >
                                    <Icon
                                        name={ paused ? 'play' : 'pause'}
                                        size={28}
                                        style={{ color: '#fff'}}
                                        />
                                </TouchableOpacity>
                            </View>
                            : null
                    }

                </TouchableOpacity>

                {
                    this.state.isShowControl
                        ?
                        <View style={styles.controls}>
                            <Text style={styles.playingTime}>{playingTime}</Text>

                            <View style={styles.progress}>
                                <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
                                <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
                            </View>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => this.setState({fullScreen: !this.state.fullScreen})}
                                >
                                <Icon
                                    name={this.state.fullScreen ? 'compress' : 'expand'}
                                    size={16}
                                    style={{ padding: 8, color: '#fff'}}
                                    />
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    fullScreen: {

        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    mark: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: 'rgba(0,0,0,.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playBtn: {
        width: 40,
        height: 40,
        borderRadius: 80,
        backgroundColor: 'rgba(0,0,0,.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: 0,
        left: 5,
        right: 5,
    },
    playingTime: {
        width: 34,
        padding: 4,
        fontSize: 10,
        color: '#fff'
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 4,
        backgroundColor: '#fff',
    },
    innerProgressRemaining: {
        height: 4,
        backgroundColor: '#f90',
    },


});
