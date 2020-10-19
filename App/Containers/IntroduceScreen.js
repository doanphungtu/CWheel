import React, { Component } from 'react'
import {
  ScrollView, Text, KeyboardAvoidingView,
  Image,
  View,
  Linking,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import I18n from "./i18n/i18n"
import IconIon from 'react-native-vector-icons/Ionicons';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/IntroduceScreenStyle'
import { Images, Colors, Fonts, Metrics } from '../Themes'

class IntroduceScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: I18n.t('introduce'),
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
        <View></View>
      ),
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image style={{ width: 0.75 * Metrics.screenWidth, height: 0.75 * Metrics.screenWidth }} source={Images.logo_wheel} />
        </View>
        <View style={styles.text}>
          <Text style={styles.txt_des}>{I18n.t('copyright')}<Text style={styles.link} onPress={() => Linking.openURL('http://cni.vn')}>CNI.VN</Text></Text>
          <Text style={styles.txt_des}>{I18n.t('contact_des')}</Text>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(IntroduceScreen)
