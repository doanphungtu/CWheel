import React, { Component } from 'react'
import {
  ScrollView, Text, KeyboardAvoidingView,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import I18n from "./i18n/i18n"
import IconIon from 'react-native-vector-icons/Ionicons';
import { Textarea } from 'native-base';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HelpScreenStyle'
import { Images, Colors, Fonts } from '../Themes'
import CardView from 'react-native-cardview';

class HelpScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: I18n.t('help'),
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

  constructor(props) {
    super(props);
    this.state = {
      note: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.viewTitle}>
            <Text style={styles.txtTilte}>{I18n.t('send_note')}</Text>
          </View>
          <CardView
            cardElevation={2}
            cardMaxElevation={2}
            style={styles.card}
          >
            <Textarea
              placeholder="Câu hỏi"
              style={styles.input}
              value={this.state.note}
              onChangeText={(text) => this.setState({ note: text })}
              numberOfLines={3}
            />
          </CardView>
          <View style={styles.viewBtnNext}>
            <TouchableOpacity
              activeOpacity={.7}
              style={styles.btnNext}
              onPress={() => this.props.navigation.navigate("SettingScreen")}
            >
              <Text style={styles.txtBtnNext}>{I18n.t('send')}</Text>
            </TouchableOpacity>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(HelpScreen)
