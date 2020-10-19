import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles, Fonts } from '../../Themes/'
import { Colors } from '../../Themes';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  Card: {
    width: 0.975 * width,
    height: 120,
    backgroundColor: 'white',
    marginBottom: 15
  },
  cardTitle: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.main
  },
  txtTitle: {
    fontSize: 15,
    color: 'white',
    fontFamily: Fonts.type.title_carousel
  },
  bottomCard: {
    width: '100%',
    height: 75,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  img: {
    width: 30,
    height: 30
  },
  btnAdd: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container_Wheel: {
    height: width / 2,
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  viewTopLeft: {
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 0.95 * width / 2
  },
  viewTitle: {
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 8,
    borderRadius: 8
  },
  topTitle: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.main,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bottomTitle: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  inputTitle: {
    height: 50,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'normal',
    fontFamily: Fonts.type.setting
  },
  cardWheel: {
    width: 0.95 * width / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  top: {
    width: width,
    flexDirection: 'row',
    height: 0.05 * width + width / 2 + 125,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewTopRight: {
    width: width / 2,
    height: width / 2 + 125,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardItem: {
    width: 0.94 * width / 2,
    height: '100%'
  },
  modalContainer: {
    width: '80%',
    height: 510,
    borderRadius: 8,
    backgroundColor: 'white',
    position: 'absolute',
    top: height / 2 - 255,
    left: width / 2 - 0.4 * width,
    margin: 0
  },
  viewTitleModal: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.main,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'relative'
  },
  titleModal: {
    fontSize: 20,
    color: 'white',
    fontFamily: Fonts.type.title_navigation
  },
  viewContent: {
    width: '100%',
    height: 400,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 2
  },
  viewBottomModal: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  itemReview: {
    width: 0.90 * width / 2,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  txtItemReview: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: Fonts.type.title_carousel,
  },
  viewTitleItemModal: {
    height: 45,
    width: '100%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c2c2c3'
  },
  txtTitleItemModal: {
    fontSize: 17,
    color: 'white',
    fontFamily: Fonts.type.title_carousel
  },
  view_ngoai: {
    width: '90%',
    height: 90,
    alignItems: 'center',
  },
  viewItemColor: {
    width: '90%',
    height: 120,
    alignItems: 'center',

  },
  txt_option: {
    width: '100%',
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    fontFamily: Fonts.type.setting
  },

  modal_alert_Container: {
    width: '80%',
    height: 200,
    borderRadius: 8,
    backgroundColor: 'white',
    position: 'absolute',
    top: height / 2 - 125,
    left: width / 2 - 0.4 * width,
    margin: 0
  },
  view_alert_Title: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  txt_alert_Title: {
    color: 'white',
    fontSize: 17,
    fontFamily: Fonts.type.title_navigation
  },
  view_alert_Content: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt_alert_Content: {
    fontSize: 15,
    width: '90%',
    fontFamily: Fonts.type.setting
  },
  view_alert_BtnNext: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  view_loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
