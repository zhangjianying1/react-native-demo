/**
 * @flow
 */

import React from 'react';
import { Button, Platform, ScrollView, StyleSheet, BackHandler } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import JoyIcons from 'react-native-vector-icons/JoyIcons';

import Home from './home.view/home';
import NewsList from './news.view/news.list';
import Personal from './personal.view/personal.home';
import SampleText from './SampleText';



const MyNavScreen = ({ navigation, banner }) => (
    <ScrollView>
        <Button
          onPress={() => navigation.navigate('Home')}
          title="Go to home tab"
        />
        <Button
          onPress={() => navigation.navigate('Settings')}
          title="Go to settings tab"
        />
        <Button onPress={() => navigation.goBack(null)} title="Go back" />

  </ScrollView>
);


const MyPeopleScreen = ({ navigation }) => (
  <MyNavScreen banner="People Tab" navigation={navigation} />
);


const MyChatScreen = ({ navigation }) => (
  <MyNavScreen banner="Chat Tab" navigation={navigation} />
);

MyChatScreen.navigationOptions = {
  tabBarLabel: '服务',
  tabBarIcon: ({ tintColor, focused }) => (
    <JoyIcons
       name={ focused ? 'jcon-heart' : 'jcon-heart-o' }
       size={24}
       style={{ color: focused ? '#01a29a' : '#929292'}}
     />
  ),
};
Home.navigationOptions = {
 tabBarLabel: '首页',
 header: null,
 tabBarIcon: ({ tintColor, focused }) => (
    <JoyIcons
       name={ focused ? 'jcon-home' : 'jcon-home-o' }
       size={24}
       style={{ color: focused ? '#01a29a' : '#929292' }}
     />
 ),
};
Personal.navigationOptions = {
    tabBarLabel: '我的',
    header: null,
    tabBarIcon: ({ tintColor, focused }) => (
      <JoyIcons
          name={ focused ? 'jcon-user' : 'jcon-user-o' }
          size={24}
          style={{ color: focused ? '#01a29a' : '#929292' }}
        />
    ),
};



const SimpleTabs = TabNavigator(
  {
    Home: {
      screen: Home,
    },
    News: {
      screen: NewsList,
      path: 'news',
    },
    Chat: {
      screen: MyChatScreen,
      path: 'chat',
    },
    Personal: {
      screen: Personal,
      path: 'personal',
    },
  },
  {
      tabBarPosition: 'bottom',
      animationEnabled: true,
      swipeEnabled: false,
      backBehavior: 'Home',
      tabBarOptions : {
           activeTintColor: '#01a29a',
           inactiveTintColor: '#929292',
            labelStyle: {
              fontSize: 14,
              margin: 0,

            },
            indicatorStyle: { height: 0},
            style: {
              backgroundColor: '#fff',
            },
            showIcon: true,
            iconStyle: {
            }
      }
    }
);

export default SimpleTabs;
