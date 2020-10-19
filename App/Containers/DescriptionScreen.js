import React, { Component } from 'react'
import {
  ScrollView, Text, KeyboardAvoidingView,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import IconIon from 'react-native-vector-icons/Ionicons';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DescriptionScreenStyle'
import { Colors, Images, Fonts } from '../Themes';
import AsyncStorage from '@react-native-community/async-storage';

class DescriptionScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: "Chỉnh sửa",
      headerStyle: {
        backgroundColor: Colors.main,
        shadowOpacity: 0,
        elevation: 0,
        fontFamily: Fonts.type.title_navigation,
        fontWeight: "200",
      },
      headerTitleStyle: {
        fontFamily: Fonts.type.title_navigation,
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
        <TouchableOpacity activeOpacity={.7} style={{ paddingHorizontal: 15, paddingVertical: 5 }} onPress={() => { navigation.state.params.handleChangeDescription(), navigation.goBack() }}>
          <IconIon name="ios-checkmark-circle-outline" size={30} color="white" />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      description: props.navigation.getParam("description"),
      index: JSON.parse(props.navigation.getParam("index")),
      dataWheel: [],
    }
  }

  componentDidMount() {
    this.getDataWheel();
    this.props.navigation.setParams({ handleChangeDescription: this.handleChangeDescription });
  }

  async getDataWheel() {
    const dataWheel = JSON.parse(await AsyncStorage.getItem("dataWheel"));
    this.setState({ dataWheel });
  }

  handleChangeDescription = () => {
    AsyncStorage.setItem("dataWheel", JSON.stringify(this.state.dataWheel));
  }

  handleChangeTextinput = (value) => {

    let dataWheel = [...this.state.dataWheel];
    let b = this.state.dataWheel[this.state.index];
    b.description = value;
    dataWheel[this.state.index] = b;
    this.setState({ description: value, dataWheel });

  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.txtInput}
          value={this.state.description}
          maxLength={300}
          onChangeText={(value) => this.handleChangeTextinput(value)}
          multiline
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

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionScreen)
