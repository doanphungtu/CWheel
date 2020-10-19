import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TouchableOpacity, View, FlatList, Image, Linking } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import I18n from './i18n/i18n'
import firebase from 'react-native-firebase'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/OtherAppScreenStyle'
import { Colors, Images, Fonts } from '../Themes'

class OtherAppScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: I18n.t('other_app'),
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
        <TouchableOpacity activeOpacity={.7} style={{ paddingHorizontal: 15 }} onPress={() => navigation.goBack()}>
          <Icon name="ios-arrow-back" size={25} color="white" />
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
      data: null,
    }
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const appRef = rootRef.child('otherApp').once('value', data => {
      this.setState({ data: data.val() });
    });
  }

  render() {
    const { data } = this.state;
    // console.tron.log("dataRender", data)
    return (
      <FlatList
        extraData={this.state}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) =>
          item.id != 1 ?
            <TouchableOpacity
              style={styles.touchItems}
              activeOpacity={.7}
              onPress={() => Linking.openURL(item.link)}
            >
              <View style={styles.viewItems}>
                <Image style={{ width: 30, height: 30 }} source={{ uri: item.urlImage }} />
                <Text style={styles.txtItems}>{item.name}</Text>
              </View>
            </TouchableOpacity>
            : null
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(OtherAppScreen)
