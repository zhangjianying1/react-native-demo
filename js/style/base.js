import {
    PixelRatio,
    Platform
} from 'react-native';
export default {
    fs12: {
        fontSize: 12
    },
    fs14: {
        fontSize: 14
    },
    fs18: {
        fontSize: 18
    },
     pl10: {
       paddingLeft: 10
     },
     pl20: {
        paddingLeft: 20
     },
     mt10: {
        marginTop: 10
     },
     ml10: {
        marginLeft: 10
     },
     colorWhite: {

        color: '#fff'
     },
     container: {
       marginTop: Platform.OS === 'ios' ? 20 : 0,
       backgroundColor: '#efeff4'
     },
     flexRow: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
     },
     flexColumn: {
           display: 'flex'
     },
     flexJustifyCenter: {
       justifyContent: 'center'
     },
     flexJustifyBetween: {
        justifyContent: 'space-between'
     },

     flexAuto: {
        flex: 1
     }
    }