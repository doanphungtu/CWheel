import React, { Component } from 'react'
import {
  ScrollView, Text, KeyboardAvoidingView,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  Dimensions,
  Animated,
  TextInput,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import IconIon from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Slider from "react-native-slider";
import CardView from 'react-native-cardview'
import AwesomeButton from "react-native-really-awesome-button";
import Svg, { Path, G, Text as TextSvg, TSpan, Circle } from 'react-native-svg'
import * as d3Shape from 'd3-shape';
import { Header } from 'react-navigation-stack';
import Modal from 'react-native-modal'
import I18n from "./i18n/i18n"

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EditWheelScreenStyle'
import { Colors, Images, Fonts } from '../Themes';
import { makeWheel, color_option } from '../Transforms/wheelFunctionFromTu';
import AsyncStorage from '@react-native-community/async-storage';
const { width, height } = Dimensions.get('window');

const wheelSize = width * 0.8 / 2;
const fontSize = 26;
const oneTurn = 360;

class EditWheelScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: I18n.t('edit'),
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
        <TouchableOpacity activeOpacity={.7} style={{ paddingHorizontal: 15, paddingVertical: 5 }} onPress={() => navigation.goBack()}>
          <IconIon name="ios-arrow-back" size={25} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={.7}
          style={{ paddingHorizontal: 15, paddingVertical: 5 }}
          onPress={() => { navigation.state.params.handleSave() }}
        >
          <IconIon name="ios-checkmark-circle-outline" size={34} color="white" />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      text_color_option: this.props.navigation.getParam("dataWheel").text_color_option,
      background_color_option: this.props.navigation.getParam("dataWheel").background_color_option,
      index_wheel: this.props.navigation.getParam("index"),
      index_choose_modal: 0,
      showModal: false,
      showModalCreateOption: false,
      dataWheel: [],
      title: this.props.navigation.getParam("dataWheel").title,
      data_option: [],
      data_edit: [
        {
          name: I18n.t('text_size'),
          min: 10,
          max: 26
        },
        {
          name: I18n.t('repeat'),
          min: 1,
          max: 2
        },
        {
          name: I18n.t('spin_speed'),
          min: 1,
          max: 6
        },
      ],
      //Modal
      text_option: '',
      textColor_option: 'white',
      backgroundColor_option: 'white',
      text_size: this.props.navigation.getParam("dataWheel").text_size,
      repeat_option: 1,
      velocity: this.props.navigation.getParam("dataWheel").velocity,
      //Modal_create_option
      text_option_create: '',
      textColor_option_create: '#FFFFFF',
      backgroundColor_option_create: color_option[0],

      show_modal_alert: false,
      message: '',
      show_modal_validate: false,

      background: Images.background1
    }
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.getDataWheel();
    })
    this.props.navigation.setParams({ handleSave: this.handleSave });
  }

  async getDataWheel() {
    const background = await AsyncStorage.getItem("background");
    const dataWheel = JSON.parse(await AsyncStorage.getItem("dataWheel"));
    let data_edit = [...this.state.data_edit];
    data_edit[1].max = Math.round(32 / dataWheel[this.state.index_wheel].data.length);
    this.setState({ dataWheel, data_edit, background });
  }

  handleSave = () => {
    let dataWheel = this.state.dataWheel;
    let index = this.state.index_wheel;
    let data = dataWheel[index];

    data.title = this.state.title;
    data.text_color_option = this.state.text_color_option;
    data.background_color_option = this.state.background_color_option;
    data.text_size = this.state.text_size;
    data.repeat_option = this.state.repeat_option;
    data.velocity = this.state.velocity;

    dataWheel[index] = data;
    AsyncStorage.setItem("dataWheel", JSON.stringify(dataWheel));
    this.props.navigation.navigate(this.props.navigation.getParam('screen'), { dataWheel: this.props.navigation.getParam('screen') === "HomeScreen" ? dataWheel : dataWheel[index], index: this.state.index_wheel });
  }

  getWithTextSVG() {
    const a = this.state.text_size;
    if (a >= 21)
      return 5;
    else if (a >= 16)
      return 6;
    else
      return 7;
  }

  _renderSvgWheel = (wheel_path) => {
    return (
      <View style={styles.container_Wheel}>
        <AwesomeButton
          disabled
          width={38}
          height={38}
          backgroundColor={Colors.main}
          borderRadius={20}
          borderWidth={.5}
          borderColor={'white'}
          raiseLevel={1}
          backgroundDarker="transparent"
          style={{ position: 'absolute', top: width / 4 - 19, left: width / 4 - 19, zIndex: 1, justifyContent: 'center', alignItems: 'center' }}
          textSize={5}
        >
          <Text style={{ fontSize: 8, fontFamily: Fonts.type.title_carousel, color: 'white' }}>
            {I18n.t('spin')}
          </Text>
        </AwesomeButton>
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
                      <Path d={arc.path} fill={this.state.background_color_option[i]} />
                      <G
                        rotation={(i * oneTurn) / this.state.dataWheel[this.state.index_wheel].data.length + oneTurn / (2 * this.state.dataWheel[this.state.index_wheel].data.length)}
                        origin={`${x}, ${y}`}
                      >
                        <TextSvg
                          x={x}
                          y={y - 76}
                          fill={this.state.text_color_option[i]}
                          textAnchor="middle"
                          fontSize={this.state.text_size}
                          fontFamily={Fonts.type.title_carousel}
                        >
                          {Array.from({ length: number.length }).map((_, j) => {
                            return (
                              <TSpan
                                rotate="90"
                                x={x}
                                dy={this.state.text_size}
                                key={`arc-${i}-slice-${j}`}
                              >
                                {j < this.getWithTextSVG() ?
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

  handleIsOk() {
    let dataWheel = this.state.dataWheel;
    let text_color_option = this.state.text_color_option;
    let background_color_option = this.state.background_color_option;
    let data = dataWheel[this.state.index_wheel].data;
    data[this.state.index_choose_modal] = this.state.text_option;

    text_color_option[this.state.index_choose_modal] = this.state.textColor_option;
    background_color_option[this.state.index_choose_modal] = this.state.backgroundColor_option;

    dataWheel[this.state.index_wheel].text_color_option = text_color_option;
    dataWheel[this.state.index_wheel].background_color_option = background_color_option;
    dataWheel[this.state.index_wheel].data = data;

    this.setState({ dataWheel, text_color_option, background_color_option, showModal: false })
  }

  handleCreateOption() {
    let dataWheel = this.state.dataWheel;
    let data = dataWheel[this.state.index_wheel];

    this.state.background_color_option.push(this.state.backgroundColor_option_create);
    this.state.text_color_option.push(this.state.textColor_option_create);

    data.data.push(this.state.text_option_create);
    data.text_color_option.push(this.state.textColor_option_create);
    data.background_color_option.push(this.state.backgroundColor_option_create);

    dataWheel[this.state.index_wheel] = data;

    let data_edit = [...this.state.data_edit];
    data_edit[1].max = Math.round(32 / dataWheel[this.state.index_wheel].data.length);

    this.setState({ dataWheel, showModalCreateOption: false, data_edit });
  }

  handleDeleteOption() {
    let dataWheel = this.state.dataWheel;
    let data = dataWheel[this.state.index_wheel].data;
    data.splice(this.state.index_choose_modal, 1);
    dataWheel[this.state.index_wheel].data = data;

    let data_edit = [...this.state.data_edit];
    data_edit[1].max = Math.round(32 / dataWheel[this.state.index_wheel].data.length);

    this.setState({ show_modal_alert: false, dataWheel, showModal: false, data_edit });
  }

  handleChangeValue(value, item, index) {
    if (index === 0)
      this.setState({ text_size: Math.round(value) })
    else if (index === 1) {
      this.setState({ repeat_option: Math.round(value) });
      if (value == this.state.repeat_option + 1)
        this.handleIncreaseOption();
      if (value == this.state.repeat_option - 1)
        this.handleDecreaseOption();
    }
    else
      this.setState({ velocity: Math.round(value) })
  }

  getNameVelocity(value) {
    if (value <= 2)
      return "Low";
    else if (value <= 4)
      return "Medium";
    return "Fast";
  }

  getValueSlider(index) {
    if (index === 0)
      return this.state.text_size;
    else if (index === 1)
      return this.state.repeat_option;
    else
      return this.state.velocity;
  }

  handleDecrease(item, index) {
    if (index === 0) {
      if (this.state.text_size > item.min)
        this.setState({ text_size: this.state.text_size - 1 })
    }
    else if (index === 1) {
      if (this.state.repeat_option > item.min) {
        this.handleDecreaseOption();
        this.setState({ repeat_option: this.state.repeat_option - 1 });
      }
    }
    else {
      if (this.state.velocity > item.min)
        this.setState({ velocity: this.state.velocity - 1 })
    }
  }

  handleIncrease(item, index) {
    if (index === 0) {
      if (this.state.text_size < item.max)
        this.setState({ text_size: this.state.text_size + 1 })
    }
    else if (index === 1) {
      if (this.state.repeat_option < item.max) {
        this.setState({ repeat_option: this.state.repeat_option + 1 });
        this.handleIncreaseOption();
      }
    }
    else {
      if (this.state.velocity < item.max)
        this.setState({ velocity: this.state.velocity + 1 })
    }
  }

  _renderItems(item, index) {
    return (
      <CardView
        style={styles.Card}
        cardElevation={2}
        cardMaxElevation={2}
        cornerRadius={5}
      >
        <View style={styles.cardTitle}>
          <Text style={styles.txtTitle}>{item.name}</Text>
          <Text style={styles.txtTitle}>{index !== 2 ? this.getValueSlider(index) : this.getNameVelocity(this.state.velocity)}</Text>
        </View>
        <View style={styles.bottomCard}>
          <CardView
            style={styles.btnAdd}
            cardElevation={1}
            cardMaxElevation={1}
            cornerRadius={2}
          >
            <AwesomeButton
              width={35}
              height={35}
              borderColor={Colors.main}
              borderWidth={1}
              style={[styles.btnAdd]}
              backgroundColor="white"
              backgroundDarker="transparent"
              raiseLevel={1}
              onPress={() => this.handleDecrease(item, index)}
            >
              <IconIon name="md-remove" size={22} color={Colors.main} />
            </AwesomeButton>
          </CardView>
          <Slider
            style={{ width: '50%' }}
            value={this.getValueSlider(index)}
            onValueChange={value => { this.handleChangeValue(value, item, index) }}
            minimumValue={item.min}
            maximumValue={item.max}
            step={1}
            trackStyle={{
              height: 3,
              borderRadius: 2,
            }}
            thumbStyle={{
              width: 25,
              height: 25,
              borderRadius: 25 / 2,
              backgroundColor: 'white',
              borderColor: Colors.main,
              borderWidth: 2,
            }}
            minimumTrackTintColor={Colors.main}
          />
          <CardView
            style={styles.btnAdd}
            cardElevation={2}
            cardMaxElevation={2}
            cornerRadius={2}
          >
            <AwesomeButton
              width={35}
              height={35}
              borderColor={Colors.main}
              borderWidth={1}
              style={[styles.btnAdd]}
              backgroundColor="white"
              backgroundDarker="transparent"
              raiseLevel={1}
              onPress={() => this.handleIncrease(item, index)}
            >
              <IconIon name="md-add" size={22} color={Colors.main} />
            </AwesomeButton>
          </CardView>
        </View>
      </CardView >
    )
  }

  _renderOption(item, index) {
    return (
      <TouchableOpacity
        activeOpacity={.7}
        style={{
          marginTop: 0.0125 * width / 2, width: 0.90 * width / 2, height: 45,
          backgroundColor: this.state.background_color_option[index],
          justifyContent: 'center', alignItems: 'center',
          borderRadius: 5
        }}
        onPress={() => {
          this.setState({
            showModal: true,
            index_choose_modal: index,
            text_option: this.state.dataWheel[this.state.index_wheel].data[index],
            textColor_option: this.state.dataWheel[this.state.index_wheel].text_color_option[index],
            backgroundColor_option: this.state.dataWheel[this.state.index_wheel].background_color_option[index],
          })
        }}
      >
        <Text style={[styles.txt_option, { color: this.state.text_color_option[index] }]} numberOfLines={1}>{item}</Text>
      </TouchableOpacity >
    )
  }

  _renderTextColor(item, index) {
    return (
      <AwesomeButton
        backgroundColor={item}
        backgroundDarker="transparent"
        raiseLevel={1}
        width={40}
        height={40}
        textSize={20}
        borderRadius={25}
        style={{ marginLeft: 7, marginTop: 7 }}
        onPress={() => { this.setState({ textColor_option: item }) }}
      >
        {
          color_option[index] === this.state.textColor_option ?
            <IconEntypo name="check" size={25} color={this.state.textColor_option !== '#FFFFFF' ? '#FFFFFF' : 'grey'} />
            : ' '
        }
      </AwesomeButton>
    )
  }

  _renderTextColorCreate(item, index) {
    return (
      <AwesomeButton
        backgroundColor={item}
        backgroundDarker="transparent"
        raiseLevel={1}
        width={40}
        height={40}
        textSize={20}
        borderRadius={25}
        style={{ marginLeft: 7, marginTop: 7 }}
        onPress={() => { this.setState({ textColor_option_create: item }) }}
      >
        {
          item === this.state.textColor_option_create ?
            <IconEntypo name="check" size={25} color={this.state.textColor_option_create !== '#FFFFFF' ? '#FFFFFF' : 'grey'} />
            : ' '
        }
      </AwesomeButton>
    )
  }

  _renderBackgroundColor(item, index) {
    return (
      <AwesomeButton
        backgroundColor={item}
        backgroundDarker="transparent"
        raiseLevel={1}
        width={40}
        height={40}
        textSize={20}
        borderRadius={25}
        style={{ marginLeft: 7, marginTop: 7 }}
        onPress={() => { this.setState({ backgroundColor_option: item }) }}
      >
        {
          item === this.state.backgroundColor_option ?
            <IconEntypo name="check" size={25} color={this.state.backgroundColor_option !== '#FFFFFF' ? '#FFFFFF' : 'grey'} />
            : ' '
        }
      </AwesomeButton>
    )
  }

  _renderBackgroundColorCreate(item, index) {
    return (
      <AwesomeButton
        backgroundColor={item}
        backgroundDarker="transparent"
        raiseLevel={1}
        width={40}
        height={40}
        textSize={20}
        borderRadius={25}
        style={{ marginLeft: 7, marginTop: 7 }}
        onPress={() => { this.setState({ backgroundColor_option_create: item }) }}
      >
        {
          item === this.state.backgroundColor_option_create ?
            <IconEntypo name="check" size={25} color={this.state.backgroundColor_option_create !== '#FFFFFF' ? '#FFFFFF' : 'grey'} />
            : ' '
        }
      </AwesomeButton>
    )
  }

  modal_choose_color() {
    return (
      <Modal
        isVisible={this.state.showModal}
        style={styles.modalContainer}
        onBackdropPress={() => this.setState({ showModal: false })}
      >
        <View style={{ flex: 1, justifyContent: 'space-between', alignContent: 'center' }}>
          <View style={styles.viewTitleModal}>
            <Text style={styles.titleModal}>{I18n.t('edit')}</Text>
            <TouchableOpacity
              activeOpacity={.7}
              style={{ position: 'absolute', top: 10, right: 10 }}
              onPress={() => this.setState({ showModal: false })}
            >
              <IconIon name="md-close-circle-outline" size={30} color={"white"} />
            </TouchableOpacity>
          </View>
          <View style={styles.viewContent}>
            <CardView
              style={[styles.itemReview, { backgroundColor: this.state.backgroundColor_option }]}
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
            >
              <Text style={[styles.txtItemReview, { color: this.state.textColor_option }]}>{this.state.text_option}</Text>
            </CardView>
            <CardView
              style={styles.view_ngoai}
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
            >
              <View style={styles.viewTitleItemModal}>
                <Text style={styles.txtTitleItemModal}>{I18n.t('content')}</Text>
              </View>
              <View style={{ width: '100%', height: 45, paddingHorizontal: 7 }}>
                <TextInput
                  style={[styles.txtItemReview, { color: 'black' }]}
                  value={this.state.text_option}
                  onChangeText={(value) => this.setState({ text_option: value })}
                  numberOfLines={1}
                  textAlign={'center'}
                  underlineColorAndroid={'grey'}
                />
              </View>
            </CardView>
            <CardView
              style={styles.viewItemColor}
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
            >
              <View style={styles.viewTitleItemModal}>
                <Text style={styles.txtTitleItemModal}>{I18n.t('text_color')}</Text>
              </View>
              <FlatList
                extraData={this.state}
                contentContainerStyle={{ alignItems: 'center' }}
                numColumns={5}
                showsVerticalScrollIndicator={false}
                data={color_option}
                renderItem={({ item, index }) => this._renderTextColor(item, index)}
                keyExtractor={(item, index) => index.toString()}
              />
            </CardView>
            <CardView
              style={styles.viewItemColor}
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
            >
              <View style={styles.viewTitleItemModal}>
                <Text style={styles.txtTitleItemModal}>{I18n.t('background_color')}</Text>
              </View>
              <FlatList
                extraData={this.state}
                contentContainerStyle={{ alignItems: 'center' }}
                numColumns={5}
                showsVerticalScrollIndicator={false}
                data={color_option}
                renderItem={({ item, index }) => this._renderBackgroundColor(item, index)}
                keyExtractor={(item, index) => index.toString()}
              />
            </CardView>
          </View>
          <View style={styles.viewBottomModal} >
            <AwesomeButton
              onPress={() => this.validate('delete')}
              width={0.45 * 0.8 * width}
              height={40}
              backgroundColor="white"
              borderWidth={1}
              borderColor={Colors.main}
              textColor={Colors.main}
              backgroundDarker="transparent"
              raiseLevel={1}
            >
              <Text style={{ fontFamily: Fonts.type.title_carousel, color: Colors.main }}>
                {I18n.t('delete')}
              </Text>
            </AwesomeButton>
            <AwesomeButton
              width={0.45 * 0.8 * width}
              height={40}
              backgroundColor={Colors.main}
              backgroundDarker="transparent"
              raiseLevel={1}
              textColor="white"
              onPress={() => this.handleIsOk()}
            >
              <Text style={{ fontFamily: Fonts.type.title_carousel, color: 'white' }}>
                {I18n.t('ok')}
              </Text>
            </AwesomeButton>
          </View>
        </View>
      </Modal >
    );
  }

  modal_create_option() {
    return (
      <Modal
        isVisible={this.state.showModalCreateOption}
        style={styles.modalContainer}
        onBackdropPress={() => this.setState({ showModalCreateOption: false })}
      >
        <View style={{ flex: 1, justifyContent: 'space-between', alignContent: 'center' }}>
          <View style={styles.viewTitleModal}>
            <Text style={styles.titleModal}>{I18n.t('create_options')}</Text>
          </View>
          <View style={styles.viewContent}>
            <CardView
              style={[styles.itemReview, { backgroundColor: this.state.backgroundColor_option_create, paddingHorizontal: 5 }]}
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
            >
              <Text
                style={[styles.txtItemReview, { color: this.state.textColor_option_create }]}
                numberOfLines={1}
              >
                {this.state.text_option_create}
              </Text>
            </CardView>
            <CardView
              style={styles.view_ngoai}
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
            >
              <View style={styles.viewTitleItemModal}>
                <Text style={styles.txtTitleItemModal}>{I18n.t('content')}</Text>
              </View>
              <View style={{ width: '100%', height: 45, backgroundColor: '#fafafa', paddingHorizontal: 7 }}>
                <TextInput
                  style={[styles.txtItemReview, { color: 'black' }]}
                  value={this.state.text_option_create}
                  onChangeText={(value) => this.setState({ text_option_create: value })}
                  numberOfLines={1}
                  textAlign={'center'}
                  underlineColorAndroid="grey"
                />
              </View>
            </CardView>
            <CardView
              style={styles.viewItemColor}
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
            >
              <View style={styles.viewTitleItemModal}>
                <Text style={styles.txtTitleItemModal}>{I18n.t('text_color')}</Text>
              </View>
              <FlatList
                extraData={this.state}
                style={{ backgroundColor: '#fafafa' }}
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 5 }}
                numColumns={5}
                showsVerticalScrollIndicator={false}
                data={color_option}
                renderItem={({ item, index }) => this._renderTextColorCreate(item, index)}
                keyExtractor={(item, index) => index.toString()}
              />
            </CardView>
            <CardView
              style={styles.viewItemColor}
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
            >
              <View style={styles.viewTitleItemModal}>
                <Text style={styles.txtTitleItemModal}>{I18n.t('background_color')}</Text>
              </View>
              <FlatList
                extraData={this.state}
                style={{ backgroundColor: '#fafafa' }}
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 5 }}
                numColumns={5}
                showsVerticalScrollIndicator={false}
                data={color_option}
                renderItem={({ item, index }) => this._renderBackgroundColorCreate(item, index)}
                keyExtractor={(item, index) => index.toString()}
              />
            </CardView>
          </View>
          <View style={styles.viewBottomModal} >
            <AwesomeButton
              onPress={() => this.setState({ showModalCreateOption: false })}
              width={0.45 * 0.8 * width}
              height={40}
              backgroundColor="white"
              borderWidth={1}
              borderColor={Colors.main}
              textColor={Colors.main}
              backgroundDarker="transparent"
              raiseLevel={1}
            >
              <Text style={{ fontFamily: Fonts.type.title_carousel, color: Colors.main }}>
                {I18n.t('cancle')}
              </Text>
            </AwesomeButton>
            <AwesomeButton
              width={0.45 * 0.8 * width}
              height={40}
              backgroundColor={Colors.main}
              backgroundDarker="transparent"
              raiseLevel={1}
              textColor="white"
              onPress={() => this.handleCreateOption()}
            >
              <Text style={{ fontFamily: Fonts.type.title_carousel, color: "white" }}>
                {I18n.t('ok')}
              </Text>
            </AwesomeButton>
          </View>
        </View>
      </Modal >
    );
  }

  modal_alert(index) {
    return (
      <Modal
        isVisible={this.state.show_modal_alert}
        style={styles.modal_alert_Container}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.view_alert_Title}>
            <Text style={styles.txt_alert_Title}>{I18n.t('notification')}</Text>
          </View>
          <View style={styles.view_alert_Content}>
            <Text style={styles.txt_alert_Content}>{I18n.t('alert_delete_options')}</Text>
          </View>
          <View style={styles.view_alert_BtnNext}>
            <AwesomeButton
              width={100}
              height={40}
              backgroundDarker="transparent"
              backgroundColor="white"
              borderColor={Colors.main}
              borderWidth={1}
              raiseLevel={1}
              textColor={Colors.main}
              onPress={() => { this.setState({ show_modal_alert: false }) }}
            >
              <Text style={{ fontFamily: Fonts.type.title_carousel, color: Colors.main }}>
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
              onPress={() => { this.handleDeleteOption() }}
            >
              <Text style={{ fontFamily: Fonts.type.title_carousel, color: "white" }}>
                {I18n.t('yes')}
              </Text>
            </AwesomeButton>
          </View>
        </View>
      </Modal>
    );
  }

  modal_alert_validate(index) {
    return (
      <Modal
        isVisible={this.state.show_modal_validate}
        style={styles.modal_alert_Container}
        onBackdropPress={() => this.setState({ show_modal_validate: false })}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.view_alert_Title}>
            <Text style={styles.txt_alert_Title}>{I18n.t('notification')}</Text>
          </View>
          <View style={styles.view_alert_Content}>
            <Text style={styles.txt_alert_Content}>{this.state.message}</Text>
          </View>
          <View style={styles.view_alert_BtnNext}>
            <AwesomeButton
              width={200}
              height={40}
              backgroundDarker="transparent"
              backgroundColor={Colors.main}
              borderColor={Colors.main}
              raiseLevel={1}
              textColor="white"
              onPress={() => { this.setState({ show_modal_validate: false }) }}
            >
              <Text style={{ fontFamily: Fonts.type.title_carousel, color: "white" }}>
                {I18n.t('ok')}
              </Text>
            </AwesomeButton>
          </View>
        </View>
      </Modal>
    );
  }

  validate(type) {
    if (type == "create") {
      if (this.state.dataWheel[this.state.index_wheel].data.length == 32) {
        this.setState({ message: I18n.t('alert_create'), show_modal_validate: true });
      }
      else {
        this.setState({ showModalCreateOption: true })
      }
    } else {
      if (this.state.dataWheel[this.state.index_wheel].data.length == 2) {
        this.setState({ message: I18n.t('alert_delete'), show_modal_validate: true });
      }
      else {
        this.setState({ show_modal_alert: true })
      }
    }
  }

  handleIncreaseOption() {
    let dataWheel = this.state.dataWheel;
    let data = dataWheel[this.state.index_wheel].data;
    data = data.concat(data);
    this.state.text_color_option = this.state.text_color_option.concat(this.state.text_color_option);
    this.state.background_color_option = this.state.background_color_option.concat(this.state.background_color_option);

    dataWheel[this.state.index_wheel].data = data;
    this.setState({ dataWheel })
  }

  handleDecreaseOption() {
    let dataWheel = this.state.dataWheel;
    let data = dataWheel[this.state.index_wheel].data;
    data.splice(0, data.length / this.state.repeat_option);
    dataWheel[this.state.index_wheel].data = data;
    this.setState({ dataWheel })
  }

  render() {
    const { data_edit } = this.state;
    return (
      this.state.dataWheel.length === 0 ?
        <View style={styles.view_loading}>
          <ActivityIndicator size={'large'} color={Colors.main} />
        </View>
        :
        <View style={styles.container}>
          <ImageBackground
            source={this.state.background}
            style={styles.background}
          />
          {this.modal_choose_color()}
          {this.modal_create_option()}
          {this.modal_alert()}
          {this.modal_alert_validate()}
          <View style={styles.top}>
            <View style={{ width: width / 2, justifyContent: 'center', alignItems: 'center' }}>
              <CardView
                style={styles.cardWheel}
                cardElevation={2}
                cardMaxElevation={2}
                cornerRadius={5}
              >
                <View style={styles.topTitle}>
                  <Text style={styles.txtTitle}>{I18n.t('preview')}</Text>
                </View>
                {this._renderSvgWheel(makeWheel(this.state.dataWheel[this.state.index_wheel].data))}
              </CardView>
              <CardView
                style={styles.viewTopLeft}
                cardElevation={2}
                cardMaxElevation={2}
                cornerRadius={5}
              >
                <View style={styles.viewTitle}>
                  <View style={styles.topTitle}>
                    <Text style={styles.txtTitle}>{I18n.t('title')}</Text>
                  </View>
                  <View style={styles.bottomTitle}>
                    <TextInput
                      underlineColorAndroid={'grey'}
                      style={styles.inputTitle}
                      value={this.state.title}
                      onChangeText={(value) => this.setState({ title: value })}
                      numberOfLines={1}
                      maxLength={100}
                    />
                  </View>
                </View>
              </CardView>
            </View>
            <View style={styles.viewTopRight}>
              <CardView
                style={styles.cardItem}
                cardElevation={2}
                cardMaxElevation={2}
                cornerRadius={5}
              >
                <View style={styles.cardTitle}>
                  <Text style={styles.txtTitle}>{I18n.t('options')}</Text>
                  <TouchableOpacity style={{ padding: 2 }} activeOpacity={.7} onPress={() => { this.validate('create') }}>
                    <IconIon name="ios-add-circle-outline" size={27} color="white" />
                  </TouchableOpacity>
                </View>
                <FlatList
                  extraData={this.state.dataWheel}
                  contentContainerStyle={{ alignItems: 'center', paddingBottom: 0.0125 * width / 2 }}
                  showsVerticalScrollIndicator={false}
                  data={this.state.dataWheel[this.state.index_wheel].data}
                  renderItem={({ item, index }) => this._renderOption(item, index)}
                  keyExtractor={(item, index) => index.toString()}
                />
              </CardView>
            </View>
          </View>
          <FlatList
            contentContainerStyle={{ alignItems: 'center' }}
            showsVerticalScrollIndicator={false}
            data={data_edit}
            renderItem={({ item, index }) => this._renderItems(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditWheelScreen)
