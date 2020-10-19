import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import IconIon from 'react-native-vector-icons/Ionicons';
import I18n from "./i18n/i18n"

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SelectLanguageScreenStyle'
import { Colors, Images, Fonts } from '../Themes';
import AsyncStorage from '@react-native-community/async-storage';

const { width } = Dimensions.get('window');

class SelectLanguageScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: I18n.t('select_language'),
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
      select: null,
    }
  }

  async componentDidMount() {
    const language = await AsyncStorage.getItem('language');
    this.setState({ select: language })
  }

  handleOnclick(item) {
    this.setState({ select: item.id });
    I18n.locale = item.id;
    AsyncStorage.setItem("language", item.id);
    this.props.navigation.goBack();
  }

  _renderItems(item, index) {
    return (
      <TouchableOpacity
        onPress={() => this.handleOnclick(item)}
        activeOpacity={.7}
        style={styles.touch}
      >
        <View style={styles.viewLeft}>
          <Image source={item.img} style={{ width: 35, height: 35 }} />
        </View>
        <View
          style={styles.viewRight}
        >
          <Text style={styles.txtItem}>{item.name}</Text>
          {item.id === this.state.select ?
            <IconIon name="md-checkmark" color={Colors.main} size={25} />
            : <Text></Text>
          }
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const data = [
      {
        name: 'English (United States)',
        id: 'us',
        img: Images.us,
      },
      {
        name: 'Tiếng Việt',
        id: 'vn',
        img: Images.vn
      }
    ]
    return (
      (!this.state.select) ?
        <View style={styles.view_loading}>
          <ActivityIndicator size={'large'} color={Colors.main} />
        </View>
        :
        <FlatList

          extraData={this.state}
          style={{ backgroundColor: '#EFF3F6' }}
          showsVerticalScrollIndicator={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguageScreen)
