import React, { Component } from 'react'
import {
  ScrollView, Text, KeyboardAvoidingView,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Switch
} from 'react-native'
import { connect } from 'react-redux'
import IconIon from 'react-native-vector-icons/Ionicons';
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import I18n from "./i18n/i18n"
import AsyncStorage from '@react-native-community/async-storage';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SettingScreenStyle'
import { Colors, Images, Fonts } from '../Themes';

class SettingScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: I18n.t('setting'),
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
        color: 'white',
      },
      headerLeft: () => (
        <TouchableOpacity activeOpacity={.7} style={{ paddingHorizontal: 15, paddingVertical: 5 }} onPress={() => navigation.goBack()}>
          <IconIon name="ios-arrow-back" size={25} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View></View>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      sound: false,
      language: ''
    }
  }

  componentDidMount() {
    this.getSound();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.setState({ language: I18n.t('no') })
    })
  }

  async getSound() {
    const sound = await AsyncStorage.getItem("sound");
    this.setState({ sound: JSON.parse(sound) });
  }

  _renderItems(item, index) {
    return (
      index === 0 ?
        <TouchableOpacity
          disabled
          style={styles.touchItems}
          activeOpacity={.7}
        >
          <View style={styles.viewItems}>
            <View style={styles.viewImage}>
              <Image source={item.image} style={styles.img} />
            </View>
            <View style={styles.ViewTxtItems}>
              <Text style={styles.txtItems}>{item.name}</Text>
              <Text style={{ fontFamily: Fonts.type.setting, fontSize: 12 }}>{item.des}</Text>
              <Switch
                trackColor={{ false: "grey", true: Colors.main }}
                thumbColor={"white"}
                style={[styles.switch, {
                  transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
                }]}
                onValueChange={(value) => {
                  this.handleChangeSound(value);
                }}
                value={this.state.sound}
              />
            </View>
          </View>
        </TouchableOpacity>
        :
        <TouchableOpacity
          style={styles.touchItems}
          activeOpacity={.7}
          onPress={() => this.props.navigation.navigate(item.screen)}
        >
          <View style={styles.viewItems}>
            <View style={styles.viewImage}>
              <Image source={item.image} style={styles.img} />
            </View>
            <View style={styles.ViewTxtItems}>
              <Text style={styles.txtItems}>{item.name}</Text>
              <Text style={{ fontFamily: Fonts.type.setting, fontSize: 12 }}>{item.des}</Text>
              {
                index === 0 ?
                  null :
                  <IconSimpleLine style={styles.switch} name={"arrow-right"} size={15} color={'grey'} />
              }
            </View>
          </View>
        </TouchableOpacity>
    )
  }

  handleChangeSound(value) {
    this.setState({ sound: value });
    AsyncStorage.setItem("sound", value.toString());
  }

  render() {
    const data = [
      {
        name: I18n.t('sound'),
        image: Images.sound,
        des: I18n.t('des_1'),
        screen: ''
      },
      {
        name: I18n.t('language'),
        image: Images.language,
        des: I18n.t('des_2'),
        screen: 'SelectLanguageScreen'
      },
      // {
      //   name: 'Nền',
      //   image: Images.select_background,
      //   des: 'Hình nền của ứng dụng'
      // },
      {
        name: I18n.t('introduce'),
        image: Images.introduce,
        des: I18n.t('des_3'),
        screen: 'IntroduceScreen'
      },
      {
        name: I18n.t('help'),
        image: Images.help,
        des: I18n.t('des_4'),
        screen: 'HelpScreen'
      },
      {
        name: I18n.t('other_app'),
        image: Images.other_app,
        des: I18n.t('des_5'),
        screen: 'OtherAppScreen'
      },
    ];
    return (
      <FlatList
        extraData={this.state}
        style={{ backgroundColor: '#EFF3F6' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'flex-start' }}
        data={data}
        renderItem={({ item, index }) => this._renderItems(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)
