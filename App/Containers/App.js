import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import {
  Platform,
  NativeModules,
} from 'react-native'
import I18n from "./i18n/i18n"
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from "react-native-splash-screen";
import { Colors, Images, Fonts } from '../Themes'

// create our store

const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;

class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 70);
    this.setlanguage();
  }

  async setlanguage() {
    AsyncStorage.setItem('background', JSON.stringify(Images.background1))
    const language = await AsyncStorage.getItem("language");
    if (language) {
      I18n.locale = language;
    } else {
      I18n.locale = this.chooselanguage(deviceLanguage) === 'vn' ? 'vn' : "us";
      AsyncStorage.setItem("language", this.chooselanguage(deviceLanguage) === 'vn' ? 'vn' : "us");
    }
  }

  chooselanguage(data) {
    var d = data.split('_');
    return d[1].toLowerCase();
  }

  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
