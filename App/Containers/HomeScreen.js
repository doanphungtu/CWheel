import React, { Component } from 'react'
import {
  ScrollView, Text, KeyboardAvoidingView, Image,
  StatusBar,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
  ActivityIndicator,
  Button,
} from 'react-native'
import { connect } from 'react-redux'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ActionButton from 'react-native-action-button'
import IconIon from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import AwesomeButton from "react-native-really-awesome-button";
import { makeWheel, get_text_color_define, getColor } from "../Transforms/wheelFunctionFromTu"
import Modal from 'react-native-modal'
import Svg, { Path, G, Text as TextSvg, TSpan, Circle } from 'react-native-svg'
import * as d3Shape from 'd3-shape';
import { Header } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from "./i18n/i18n"
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeScreenStyle'

import { Colors, Images, Fonts } from '../Themes'
const { width, height } = Dimensions.get('window');
const oneTurn = 360;
const wheelSize = 160;

const fonst_size_define = 17;
const repeat_option = 1;
const velocity = 1;

const BannerExample = ({ style, title, children, ...props }) => (
  <View {...props} style={[styles.example, style]}>
    <Text style={styles.title}>{title}</Text>
    <View>{children}</View>
  </View>
);

const bannerWidths = [200, 250, 320];

class HomeScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: null
    };
  };

  constructor(props) {
    super(props);
    this.RotateValueHolder = new Animated.Value(0);
    this.state = {
      activeSlide: 0,
      dataWheel: [],
      show: false,
      background: Images.background1
    }
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.getDataWheel();
    })
    this.StartImageRotateFunction();
  }

  async getDataWheel() {
    const background = await AsyncStorage.getItem("background");
    const data = JSON.parse(await AsyncStorage.getItem("dataWheel"));
    const sound = await AsyncStorage.getItem("sound");
    if (!sound) {
      AsyncStorage.setItem("sound", 'true')
    }
    const dataWheel = [
      {
        title: I18n.t('eat'),
        description: I18n.t('description_1'),
        text_color_option: get_text_color_define(12),
        background_color_option: getColor(12),
        text_size: fonst_size_define,
        repeat_option: repeat_option,
        velocity: velocity,
        data: [
          I18n.t("coffee"),
          I18n.t("chicken"),
          I18n.t("sandwitch"),
          I18n.t("sausage"),
          I18n.t("egg"),
          I18n.t("bread"),
          I18n.t("tea"),
          I18n.t("chocolate"),
          I18n.t("cheese"),
          I18n.t("salad"),
          I18n.t("pizza"),
          I18n.t("soup")
        ],
      },
      {
        title: I18n.t('score'),
        text_color_option: get_text_color_define(12),
        background_color_option: getColor(12),
        description: I18n.t('description_2'),
        text_size: fonst_size_define,
        repeat_option: repeat_option,
        velocity: velocity,
        data: [
          I18n.t('100'),
          I18n.t('200'),
          I18n.t('400'),
          I18n.t('600'),
          I18n.t('1000'),
          I18n.t('1600'),
          I18n.t('2000'),
          I18n.t('2800'),
          I18n.t('3500'),
          I18n.t('4200'),
          I18n.t('5000'),
          I18n.t('6000'),
        ],
      },
      {
        title: I18n.t('decision'),
        text_color_option: get_text_color_define(8),
        background_color_option: getColor(8),
        description: I18n.t('description_3'),
        text_size: 18,
        repeat_option: repeat_option,
        velocity: velocity,
        data: [
          I18n.t('yes'),
          I18n.t('no'),
          I18n.t('yes'),
          I18n.t('no'),
          I18n.t('yes'),
          I18n.t('no'),
          I18n.t('yes'),
          I18n.t('no'),
        ],
      },
      {
        title: I18n.t('custom'),
        text_color_option: get_text_color_define(6),
        background_color_option: getColor(6),
        description: I18n.t('description_4'),
        text_size: fonst_size_define,
        repeat_option: repeat_option,
        velocity: velocity,
        data: [
          '',
          '',
          '',
          '',
          '',
          ''
        ],
      },
    ];
    if (!data) {
      this.setState({ dataWheel });
      AsyncStorage.setItem("dataWheel", JSON.stringify(dataWheel));
    } else {
      this.setState({ dataWheel: data, background });
    }
  }

  handleResetDataWheel(index) {
    let data = [...this.state.dataWheel];
    let b = dataWheel[index];
    data[index] = b;
    this.setState({ dataWheel: data, show: false });
    AsyncStorage.setItem("dataWheel", JSON.stringify(data));
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
    }).start(() => this.StartImageRotateFunction());
  }

  _renderItem = ({ item, index }) => {
    return (
      <View
        style={styles.viewItem}
      >
        <View style={styles.titleCarousel}>
          <Text style={styles.titleItem}>{item.title}</Text>
        </View>
        <View style={styles.contentCarousel}>
          <TouchableOpacity
            activeOpacity={.7}
            style={styles.imgItems}
            onPress={() => this.props.navigation.navigate("WheelScreen", { dataWheel: this.state.dataWheel[index % 4], index: index % 4 })}
          >
            {this._renderSvgWheel(makeWheel(this.state.dataWheel[index % 4].data), index % 4)}
          </TouchableOpacity>
          <View style={styles.viewBtnRightCarousel}>
            <TouchableOpacity
              style={styles.btnCarousel}
              activeOpacity={.7}
              onPress={() =>
                this.props.navigation.navigate("EditWheelScreen",
                  {
                    dataWheel: this.state.dataWheel[index % 4],
                    index: index % 4,
                    screen: 'HomeScreen'
                  })}
            >
              <IconMaterialIcons name="mode-edit" size={20} color={Colors.main} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnCarousel}
              activeOpacity={.7}
              onPress={() => this.props.navigation.navigate("DescriptionScreen", { description: item.description, index: index % 4 })}
            >
              <IconEntypo name="info" size={20} color={Colors.main} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnCarousel}
              activeOpacity={.7}
              onPress={() => this.setState({ show: true })}
            >
              <IconMaterialCommunityIcons name="reload" size={25} color={Colors.main} />
            </TouchableOpacity>
          </View>
        </View>
      </View >
    );
  }

  get pagination() {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={this.state.dataWheel.length}
        activeDotIndex={activeSlide}
        containerStyle={{ paddingVertical: 0, marginTop: 20 }}
        dotStyle={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: Colors.main
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  modal(index) {
    return (
      <Modal
        isVisible={this.state.show}
        style={styles.modalContainer}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.viewTitle}>
            <Text style={styles.txtTitle}>{I18n.t('notification')}</Text>
          </View>
          <View style={styles.viewContent}>
            <Text style={styles.txtContent}>{I18n.t('alert_reset_wheel')}</Text>
          </View>
          <View style={styles.viewBtnNext}>
            <AwesomeButton
              width={100}
              height={40}
              backgroundDarker="transparent"
              backgroundColor="white"
              borderColor={Colors.main}
              borderWidth={1}
              raiseLevel={1}
              onPress={() => { this.setState({ show: false }) }}
            >
              <Text style={{ fontSize: 15, fontFamily: Fonts.type.title_carousel, color: Colors.main }}>
                {I18n.t('no')}
              </Text>
            </AwesomeButton>
            <AwesomeButton
              width={100}
              height={40}
              backgroundDarker="transparent"
              backgroundColor={Colors.main}
              borderColor={Colors.main}
              raiseLevel={1}
              textColor="white"
              onPress={() => { this.handleResetDataWheel(index) }}
            >
              <Text style={{ fontSize: 15, fontFamily: Fonts.type.title_carousel, color: 'white' }}>
                {I18n.t('yes')}
              </Text>
            </AwesomeButton>
          </View>
        </View>
      </Modal>
    );
  }

  getWithTextSVG(index) {
    const a = this.state.dataWheel[index].text_size;
    if (a >= 16)
      return 6;
    else if (a >= 15)
      return 7;
    else if (a >= 13)
      return 8;
    else if (a >= 11)
      return 9;
    else
      return 10;
  }

  _renderSvgWheel = (wheel_path, index) => {
    return (
      <View style={styles.container_Wheel}>
        <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <AwesomeButton
            onPress={() => this.props.navigation.navigate("WheelScreen", { dataWheel: this.state.dataWheel[index % 4], index: index % 4 })}
            width={42}
            height={42}
            backgroundColor={Colors.main}
            borderRadius={21}
            borderWidth={.5}
            borderColor={'white'}
            raiseLevel={0}
            backgroundDarker="transparent"
            style={{ zIndex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 8, fontFamily: Fonts.type.title_carousel, color: 'white' }}>
              {I18n.t('spin')}
            </Text>
          </AwesomeButton>
        </View>
        <Animated.View
          style={{
            width: wheelSize + 15,
            height: wheelSize + 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: (wheelSize + 25) / 2,
            backgroundColor: 'transparent',
            borderWidth: 10,
            borderColor: Colors.bordercolor_wheel,
          }}
        >
          <Svg
            width={wheelSize}
            height={wheelSize}
            viewBox={`0 0 ${width} ${width}`}
          >
            <G y={width / 2} x={width / 2}>
              {
                wheel_path.map((arc, i) => {
                  const [x, y] = arc.centroid;
                  const number = arc.value.toString().toUpperCase();
                  return (
                    <G key={`arc-${i}`}>
                      <Path d={arc.path} fill={this.state.dataWheel[index].background_color_option[i]} />
                      <G
                        rotation={(i * oneTurn) / this.state.dataWheel[index].data.length + oneTurn / (2 * this.state.dataWheel[index].data.length)}
                        origin={`${x}, ${y}`}
                      >
                        <TextSvg
                          x={x}
                          y={y - 76}
                          fill={this.state.dataWheel[index].text_color_option[i]}
                          textAnchor="middle"
                          fontSize={this.state.dataWheel[index].text_size}
                          fontFamily={Fonts.type.title_carousel}
                        >
                          {Array.from({ length: number.length }).map((_, j) => {
                            return (
                              <TSpan
                                rotate="90"
                                x={x}
                                dy={this.state.dataWheel[index].text_size}
                                key={`arc-${i}-slice-${j}`}
                              >
                                {j < this.getWithTextSVG(index) ?
                                  number.charAt(j) : ''
                                }
                              </TSpan>
                            );
                          })}
                        </TextSvg>
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

  componentWillMount() {
    AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);
    AdMobRewarded.setAdUnitID('ca-app-pub-4678321600776246~9987381791');

    AdMobRewarded.addEventListener('rewarded', reward =>
      console.log('AdMobRewarded => rewarded', reward),
    );
    AdMobRewarded.addEventListener('adLoaded', () =>
      console.log('AdMobRewarded => adLoaded'),
    );
    AdMobRewarded.addEventListener('adFailedToLoad', error =>
      console.warn(error),
    );
    AdMobRewarded.addEventListener('adOpened', () =>
      console.log('AdMobRewarded => adOpened'),
    );
    AdMobRewarded.addEventListener('videoStarted', () =>
      console.log('AdMobRewarded => videoStarted'),
    );
    AdMobRewarded.addEventListener('adClosed', () => {
      console.log('AdMobRewarded => adClosed');
      AdMobRewarded.requestAd().catch(error => console.warn(error));
    });
    AdMobRewarded.addEventListener('adLeftApplication', () =>
      console.log('AdMobRewarded => adLeftApplication'),
    );

    AdMobRewarded.requestAd().catch(error => console.warn(error));

    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');

    AdMobInterstitial.addEventListener('adLoaded', () =>
      console.log('AdMobInterstitial adLoaded'),
    );
    AdMobInterstitial.addEventListener('adFailedToLoad', error =>
      console.warn(error),
    );
    AdMobInterstitial.addEventListener('adOpened', () =>
      console.log('AdMobInterstitial => adOpened'),
    );
    AdMobInterstitial.addEventListener('adClosed', () => {
      console.log('AdMobInterstitial => adClosed');
      AdMobInterstitial.requestAd().catch(error => console.warn(error));
    });
    AdMobInterstitial.addEventListener('adLeftApplication', () =>
      console.log('AdMobInterstitial => adLeftApplication'),
    );

    AdMobInterstitial.requestAd().catch(error => console.warn(error));
  }

  componentWillUnmount() {
    AdMobRewarded.removeAllListeners();
    AdMobInterstitial.removeAllListeners();
  }

  showRewarded() {
    AdMobRewarded.showAd().catch(error => console.warn(error));
  }

  showInterstitial() {
    AdMobInterstitial.showAd().catch(error => console.warn(error));
  }

  render() {
    console.disableYellowBox = true;
    {
      StatusBar.setBackgroundColor(Colors.main);
      StatusBar.setBarStyle('light-content');
    }
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const RotateData1 = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['360deg', '0deg'],
    });
    const opacityAnimated = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const { dataWheel } = this.state;

    return (
      this.state.dataWheel.length === 0 ?
        <View style={styles.view_loading}>
          <ActivityIndicator size={'large'} color={Colors.main} />
        </View> :
        <View style={styles.container}>
          <ImageBackground
            source={this.state.background}
            style={styles.background}
          />
          <BannerExample title="AdMob - Basic">
            <AdMobBanner
              adSize="banner"
              adUnitID="ca-app-pub-3940256099942544/2934735716"
              ref={el => (this._basicExample = el)}
            />
            <Button
              title="Reload"
              onPress={() => this._basicExample.loadBanner()}
            />
          </BannerExample>
          <View
            style={styles.header}
          >
            <Text style={styles.txtHeader}>{I18n.t('wheel_lucky')}</Text>
          </View>
          {this.modal(this.state.activeSlide)}
          <View style={styles.content}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={dataWheel}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={0.85 * Dimensions.get('window').width}
              enableMomentum={false}
              lockScrollWhileSnapping
              // autoplay={true}
              // loop
              containerCustomStyle={{ flexGrow: 0 }}
              onSnapToItem={(index) => this.setState({ activeSlide: index })}
            />

            {this.pagination}
            <View style={styles.viewBottom}>
              <View style={styles.imgBottom}>
                <Animated.Image source={Images.wheel} style={{ width: 50, height: 50, transform: [{ rotate: RotateData }], }} />
              </View>
              <View style={styles.viewTouchNext}>
                <Animated.Text style={[styles.luck, { opacity: opacityAnimated, transform: [{ scale: opacityAnimated }] }]}>{I18n.t('luck')}</Animated.Text>
                <AwesomeButton
                  width={150}
                  backgroundColor={"#ff8677"}
                  backgroundDarker={Colors.main}
                  raiseLevel={3}
                  borderRadius={8}
                  style={{ zIndex: 0 }}
                  onPress={() => this.props.navigation.navigate('WheelScreen', { dataWheel: this.state.dataWheel[this.state.activeSlide % 4], index: this.state.activeSlide % 4 })}
                >
                  <Text style={{ fontSize: 18, fontFamily: Fonts.type.title_carousel, color: 'white' }}>
                    {I18n.t('spin')}
                  </Text>
                </AwesomeButton>
              </View>
              <View style={styles.imgBottom}>
                <Animated.Image source={Images.wheel1} style={{ width: 50, height: 50, transform: [{ rotate: RotateData1 }], }} />
              </View>
            </View>
            <TouchableOpacity
              style={styles.touchSetting}
              activeOpacity={.7}
              onPress={() => this.props.navigation.navigate('SettingScreen')}
            >
              <IconAntDesign name="setting" style={{ fontSize: 20, height: 22, color: 'white' }} />
            </TouchableOpacity>
            <ActionButton
              buttonColor={Colors.main}>
              < ActionButton.Item
                buttonColor='#9b59b6'
                title={I18n.t('type1')}
                onPress={() => {
                  this.setState({ background: Images.background1 });
                  AsyncStorage.setItem("background", JSON.stringify(Images.background1));
                }}>
                <Image source={Images.background1} style={{ width: 30, height: 30 }} />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor='#3498db'
                title={I18n.t('type2')}
                onPress={() => {
                  this.setState({ background: Images.background2 });
                  AsyncStorage.setItem("background", JSON.stringify(Images.background2));
                }}>
                <Image source={Images.background2} style={{ width: 30, height: 30 }} />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor='#1abc9c'
                title={I18n.t('type3')}
                onPress={() => {
                  this.setState({ background: Images.background3 });
                  AsyncStorage.setItem("background", JSON.stringify(Images.background3));
                }}>
                <Image source={Images.background3} style={{ width: 30, height: 30 }} />
              </ActionButton.Item>
            </ActionButton >
          </View>
        </View >
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
