import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import OtherAppScreen from '../Containers/OtherAppScreen'
import HelpScreen from '../Containers/HelpScreen'
import IntroduceScreen from '../Containers/IntroduceScreen'
import SelectLanguageScreen from '../Containers/SelectLanguageScreen'
import DescriptionScreen from '../Containers/DescriptionScreen'
import WheelScreen from '../Containers/WheelScreen'
import EditWheelScreen from '../Containers/EditWheelScreen'
import SettingScreen from '../Containers/SettingScreen'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import HomeScreen from '../Containers/HomeScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIon from 'react-native-vector-icons/Ionicons';

import ActionButton from 'react-native-action-button';

import styles from './Styles/NavigationStyles'
import { View, Image, StyleSheet } from 'react-native'
import { Colors, Images } from '../Themes'
import { Easing, Animated } from 'react-native'

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 600,
      easing: Easing.out(Easing.poly(10)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [{ translateX }] }
    },
  }
}

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  OtherAppScreen: { screen: OtherAppScreen },
  HelpScreen: { screen: HelpScreen },
  IntroduceScreen: { screen: IntroduceScreen },
  SelectLanguageScreen: { screen: SelectLanguageScreen },
  DescriptionScreen: { screen: DescriptionScreen },
  WheelScreen: { screen: WheelScreen },
  EditWheelScreen: { screen: EditWheelScreen },
  HomeScreen: { screen: HomeScreen },
  SettingScreen: { screen: SettingScreen }
  // LaunchScreen: { screen: LaunchScreen }
  
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'HomeScreen',
  transitionConfig,
})

export default createAppContainer(PrimaryNav);
