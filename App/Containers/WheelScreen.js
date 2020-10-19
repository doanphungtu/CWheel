import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text as RNText,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Path, G, Text, TSpan, Circle } from 'react-native-svg'
import * as d3Shape from 'd3-shape';
import color from 'randomcolor';
import { snap } from '@popmotion/popcorn';
const { width, height } = Dimensions.get('window');
import { Colors, Images, Fonts } from '../Themes';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux'
import AwesomeButton from "react-native-really-awesome-button";
import { Header } from 'react-navigation-stack';
import { makeWheel } from '../Transforms/wheelFunctionFromTu';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from "./i18n/i18n"

const wheelSize = width * 0.8;
const fontSize = 26;
const oneTurn = 360;
const knobFill = color({ hue: 'purple' });

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
const mp3 = require('../Sound/sound_wheel.m4a');

class WheelScreen extends Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: null,
      headerStyle: {
        backgroundColor: Colors.main,
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTitleStyle: {
        fontFamily: Fonts.type.title_navigation,
        fontWeight: "200",
        textAlign: "center",
        flex: 1,
        color: 'white'
      },
      headerLeft: () => (
        <TouchableOpacity activeOpacity={.7} style={{ paddingHorizontal: 15, paddingVertical: 5 }} onPress={() => { navigation.goBack() }}>
          <IconIon name="ios-arrow-back" size={25} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 15, }}>
          <TouchableOpacity activeOpacity={.7} style={{ paddingVertical: 5, paddingHorizontal: 5 }} onPress={() => { navigation.state.params.handleChangeSound() }}>
            <Image source={navigation.state.params.img} style={{ width: 28, height: 28 }} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.7} style={{ marginLeft: 20, padding: 5, paddingVertical: 5 }} onPress={() => { navigation.state.params.handleSetting() }}>
            <IconMaterialIcons name="mode-edit" style={{ fontSize: 26, fontWeight: 'bold' }} color={"white"} />
          </TouchableOpacity>
        </View >
      ),
    };
  };

  constructor(props) {
    super(props);
    this.sound = new Sound(mp3, Sound.MAIN_BUNDLE, (error) => { });
    this.dataWheel = this.props.navigation.getParam("dataWheel");
    this._wheelPaths = makeWheel(this.dataWheel.data);
    this._angle = new Animated.Value(0);
    this.angle = 0;
    this.numberOfSegments = this.dataWheel.data.length;
    this.angleBySegment = oneTurn / this.numberOfSegments;
    this.angleOffset = this.angleBySegment / 2;

    this.state = {
      index_wheel: this.props.navigation.getParam("index"),
      enabled: true,
      finished: false,
      winner: null,
      img: "",
      background: null
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.getDataWheel();
    })

    this._angle.addListener(event => {
      if (this.state.enabled) {
        this.setState({
          enabled: false,
          finished: false
        });
      }
      this.angle = event.value;
    });
  }

  async getDataWheel() {
    const sound = JSON.parse(await AsyncStorage.getItem("sound"));
    const background = await AsyncStorage.getItem("background");
    this.setState({ background })
    this.dataWheel = this.props.navigation.getParam("dataWheel");
    this._wheelPaths = makeWheel(this.dataWheel.data);
    this.props.navigation.setParams({
      handleSetting: this.handleSetting,
      handleChangeSound: this.handleChangeSound,
      img: sound ? Images.not_mute : Images.mute
    });
  }

  handleChangeSound = () => {
    if (this.props.navigation.getParam("img") === Images.not_mute) {
      this.props.navigation.setParams({
        'img': Images.mute
      });
      if (this.state.enabled === false)
        this.sound.pause();
      AsyncStorage.setItem("sound", 'false')
    } else {
      this.props.navigation.setParams({
        'img': Images.not_mute
      });
      if (this.state.enabled === false)
        this.sound.play();
      AsyncStorage.setItem("sound", 'true')
    }
  }

  handleSetting = () => {
    this.props.navigation.navigate("EditWheelScreen", { dataWheel: this.dataWheel, index: this.state.index_wheel, screen: 'WheelScreen' });
  }

  _getWinnerIndex = () => {
    const deg = Math.abs(Math.round(this.angle % oneTurn));
    if (this.angle < 0) {
      return Math.round(deg / this.angleBySegment);
    }
    // wheel turning clockwise
    return (
      (this.numberOfSegments - Math.round(deg / this.angleBySegment)) % this.numberOfSegments
    );
  };

  getVelocity(velocity) {
    if (velocity == 6)
      return 1;
    else if (velocity == 5)
      return 5;
    return (5 - velocity) * 100;
  }

  _onPan = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (this.props.navigation.getParam("img") == Images.not_mute)
        this.sound.play();
      Animated.decay(this._angle, {
        velocity: Math.floor(this.getVelocity(this.dataWheel.velocity)),
        deceleration: 0.999,
        useNativeDriver: true
      }).start(() => {
        this._angle.setValue(this.angle % oneTurn);
        const snapTo = snap(oneTurn / this.numberOfSegments);
        Animated.timing(this._angle, {
          toValue: snapTo(this.angle),
          duration: 700 - 100 * this.dataWheel.velocity,
          useNativeDriver: true
        }).start(() => {
          const winnerIndex = this._getWinnerIndex();
          this.setState({
            enabled: true,
            finished: true,
            winner: this._wheelPaths[winnerIndex].value
          });
          if (this.state.finished)
            this.sound.stop();
        });
        // do something here;
      });
    }
  };

  start_wheel() {
    if (this.props.navigation.getParam("img") === Images.not_mute)
      this.sound.play();
    Animated.decay(this._angle, {
      // velocity: velocityY / 1000,
      velocity: Math.floor(this.getVelocity(this.dataWheel.velocity)),
      deceleration: 0.999,
      useNativeDriver: true
    }).start(() => {
      this._angle.setValue(this.angle % oneTurn);
      const snapTo = snap(oneTurn / this.numberOfSegments);
      Animated.timing(this._angle, {
        toValue: snapTo(this.angle),
        duration: 700 - 100 * this.dataWheel.velocity,
        useNativeDriver: true
      }).start(() => {
        const winnerIndex = this._getWinnerIndex();
        this.setState({
          enabled: true,
          finished: true,
          winner: this._wheelPaths[winnerIndex].value
        });
        if (this.state.finished)
          this.sound.stop();
      });
      // do something here;
    });
  }

  _renderKnob = () => {
    const knobSize = 30;
    // [0, numberOfSegments]
    const YOLO = Animated.modulo(
      Animated.divide(
        Animated.modulo(Animated.subtract(this._angle, this.angleOffset), oneTurn),
        new Animated.Value(this.angleBySegment)
      ),
      1
    );

    return (
      <Animated.View
        style={{
          width: knobSize,
          height: knobSize * 2,
          justifyContent: 'flex-end',
          zIndex: 1,
          transform: [
            {
              rotate: YOLO.interpolate({
                inputRange: [-1, -0.5, -0.0001, 0.0001, 0.5, 1],
                outputRange: ['0deg', '0deg', '35deg', '-35deg', '0deg', '0deg']
              })
            }
          ],
          position: 'absolute',
          top: height / 2 - wheelSize / 2 - 100,
          left: width / 2 - 15
        }}
      >
        <Svg
          width={knobSize}
          height={(knobSize * 100) / 57}
          viewBox={`0 0 57 100`}
          style={{ transform: [{ translateY: 8 }] }}
        >
          <Path
            d="M28.034,0C12.552,0,0,12.552,0,28.034S28.034,100,28.034,100s28.034-56.483,28.034-71.966S43.517,0,28.034,0z   M28.034,40.477c-6.871,0-12.442-5.572-12.442-12.442c0-6.872,5.571-12.442,12.442-12.442c6.872,0,12.442,5.57,12.442,12.442  C40.477,34.905,34.906,40.477,28.034,40.477z"
            fill={knobFill}
          />
        </Svg>
      </Animated.View>
    );
  };

  _renderWinner = () => {
    return (
      <RNText style={styles.winnerText}>{this.state.winner}</RNText>
    );
  };

  _renderTitle = () => {
    return (
      <RNText style={styles.title}>{this.props.navigation.getParam("dataWheel").title}</RNText>
    );
  }

  _renderSvgWheel = () => {
    return (
      <View style={styles.container}>
        {this._renderKnob()}
        <AwesomeButton
          onPress={() => this.state.enabled ? this.start_wheel() : null}
          width={80}
          height={80}
          backgroundColor={Colors.main}
          borderRadius={40}
          borderWidth={.5}
          borderColor={'white'}
          raiseLevel={1}
          backgroundDarker="transparent"
          style={styles.btnQuay}
        >
          <RNText style={{ fontSize: 15, fontFamily: Fonts.type.title_carousel, color: 'white' }}>
            {I18n.t('spin')}
          </RNText>
        </AwesomeButton>
        <Animated.View
          style={{
            position: 'absolute',
            top: height / 2 - (wheelSize + 25 + 85) / 2,
            left: width / 2 - (wheelSize + 25) / 2,
            width: wheelSize + 25,
            height: wheelSize + 25,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: (wheelSize + 50) / 2,
            backgroundColor: 'transparent',
            borderWidth: 15,
            borderColor: Colors.main,
            transform: [
              {
                rotate: this._angle.interpolate({
                  inputRange: [-oneTurn, 0, oneTurn],
                  outputRange: [`-${oneTurn}deg`, `0deg`, `${oneTurn}deg`]
                })
              }
            ]
          }}
        >
          <Svg
            width={wheelSize}
            height={wheelSize}
            viewBox={`0 0 ${width} ${width}`}
            style={{ transform: [{ rotate: `-${this.angleOffset}deg` }] }}
          >
            <G y={width / 2} x={width / 2}>
              {this._wheelPaths.map((arc, i) => {
                const [x, y] = arc.centroid;
                const number = arc.value.toString();
                return (
                  <G key={`arc-${i}`}>
                    <Path d={arc.path} fill={this.dataWheel.background_color_option[i]} />
                    <G
                      rotation={(i * oneTurn) / this.numberOfSegments + this.angleOffset}
                      origin={`${x}, ${y}`}
                    >
                      <Text
                        x={x}
                        y={y - 76}
                        fill={this.dataWheel.text_color_option[i]}
                        textAnchor="middle"
                        fontSize={this.dataWheel.text_size}
                        fontFamily={Fonts.type.title_carousel}
                      >
                        {Array.from({ length: number.length }).map((_, j) => {
                          return (
                            <TSpan
                              rotate="90"
                              x={x}
                              dy={this.dataWheel.text_size}
                              key={`arc-${i}-slice-${j}`}
                            >
                              {j < 6 ?
                                number.charAt(j).toUpperCase() : ''
                              }
                            </TSpan>
                          );
                        })}
                      </Text>
                    </G>
                  </G>
                );
              })}
            </G>
          </Svg>
        </Animated.View>
      </View>
    );
  };

  render() {
    return (
      this.state.background == null ?
        <View style={styles.view_loading}>
          <ActivityIndicator size={'large'} color={Colors.main} />
        </View>
        :
        <PanGestureHandler
          onHandlerStateChange={this.state.enabled ? this._onPan : null}
          enabled={this.state.enabled}
        >
          <View style={styles.container}>
            <ImageBackground
              source={this.state.background}
              style={styles.background}
            />
            {this._renderTitle()}
            {this._renderSvgWheel()}
            {this.state.finished && this.state.enabled && this._renderWinner()}
          </View>
        </PanGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  winnerText: {
    fontSize: 32,
    fontFamily: Fonts.type.setting,
    position: 'absolute',
    bottom: 65,
  },
  title: {
    fontSize: 32,
    position: 'absolute',
    top: 10,
    fontFamily: Fonts.type.setting,
  },
  background: {
    width: "100%",
    height: "100%",
    position: 'absolute',
    top: 0,
    left: 0
  },
  btnQuay: {
    position: 'absolute',
    top: height / 2 - 40 - 45,
    left: width / 2 - 40,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  view_loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WheelScreen)
