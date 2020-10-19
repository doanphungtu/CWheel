import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  touchItems: {
    height: 65,
    width: Dimensions.get('window').width,
    marginBottom: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  viewItems: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  img: {
    width: 30,
    height: 30
  },
  txtItems: {
    fontSize: 17,
    fontFamily:Fonts.type.setting
  },
  viewImage: {
    height: '100%',
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewTxtItems: {
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    width: Dimensions.get('window').width-65,
  },
  switch: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    right: 15,
  }
})
