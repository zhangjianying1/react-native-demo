import SimpleTabs from '../SimpleTabs';
import { StackNavigator, addNavigationHelpers  } from 'react-navigation';
import {
    Platform,

} from 'react-native';
import Journal from '../home.view/journal';
import Login from '../account/login';
import Welcome from '../home.view/welcome';
import SecurityDetail from '../cards/security.detail'
import SecurityList from '../cards/security.list';
import ConsultList from '../consult/consult.list'
import ConsultDetail from '../consult/consult.detail';
export  const AppNavigator = StackNavigator(
    {
        Root: {
            screen: SimpleTabs,
        },
        Journal: {
            screen: Journal
        },
        Login: {
            screen: Login
        },
        SecurityDetail: {
            screen: SecurityDetail
        },
        SecurityList: {
            screen: SecurityList
        },
        ConsultList: {
            screen: ConsultList
        },
        ConsultDetail: {
            screen: ConsultDetail
        }
    },
    {
        initialRouteName: 'Root',
        mode: Platform.OS === 'ios' ? 'modal' : 'card',
    }
);

console.ignoredYellowBox = ['Remote debugger'];