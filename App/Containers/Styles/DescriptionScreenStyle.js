import { StyleSheet } from 'react-native'
import { ApplicationStyles,Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingTop: 15,
    alignItems:'center'
  },
  txtInput: {
    width: '90%',
    fontSize: 20,
    fontFamily: Fonts.type.title_carousel,
    fontWeight:'normal'
  }
})
