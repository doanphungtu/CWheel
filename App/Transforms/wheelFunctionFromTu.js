import * as d3Shape from 'd3-shape';
import color from 'randomcolor';
import { Dimensions } from 'react-native';
import I18n from "../Containers/i18n/i18n"

const { width, height } = Dimensions.get('window');
const fonst_size_define = 17;
const repeat_option = 1;
const velocity = 8;

export function get_text_color_define(length) {
  let a = [];
  for (var i = 0; i < length; i++)
    a.push("#FFFFFF");
  return a;
}

export let color_option = [
  "#28B0EE", "#257FED", "#5968BB", "#7853BA",
  "#A645B6", "#E53E76", "#D8554B", "#F76C41", "#F7A126",
  "#F7C42B", "#97C562", "#66B36A", "#24A095", "#99C563", "#4EB51B", "#CED956",
  "#FFFFFF", "#000000"
];

export function getColor(length) {
  let a = [];
  for (var i = 0; i < length; i++)
    a.push(color_option[i]);
  return a;
}

// export let dataWheel = [
//   {
//     title: I18n.t('eat'),
//     description: I18n.t('description_1'),
//     text_color_option: get_text_color_define(),
//     background_color_option: getColor(),
//     text_size: fonst_size_define,
//     repeat_option: repeat_option,
//     velocity: velocity,
//     data: [
//       I18n.t("coffee"),
//       I18n.t("chicken"),
//       I18n.t("sandwitch"),
//       I18n.t("sausage"),
//       I18n.t("egg"),
//       I18n.t("bread"),
//       I18n.t("tea"),
//       I18n.t("chocolate"),
//       I18n.t("cheese"),
//       I18n.t("salad"),
//       I18n.t("pizza"),
//       I18n.t("soup")
//     ],
//   },
//   {
//     title: I18n.t('score'),
//     text_color_option: get_text_color_define(),
//     background_color_option: getColor(),
//     description: I18n.t('description_2'),
//     text_size: fonst_size_define,
//     repeat_option: repeat_option,
//     velocity: velocity,
//     data: [
//       I18n.t('100'),
//       I18n.t('200'),
//       I18n.t('400'),
//       I18n.t('600'),
//       I18n.t('1000'),
//       I18n.t('1600'),
//       I18n.t('2000'),
//       I18n.t('2800'),
//       I18n.t('3500'),
//       I18n.t('4200'),
//       I18n.t('5000'),
//       I18n.t('6000'),
//     ],
//   },
//   {
//     title: I18n.t('decision'),
//     text_color_option: get_text_color_define(),
//     background_color_option: getColor(),
//     description: I18n.t('description_3'),
//     text_size: 18,
//     repeat_option: repeat_option,
//     velocity: velocity,
//     data: [
//       I18n.t('yes'),
//       I18n.t('no'),
//       I18n.t('yes'),
//       I18n.t('no'),
//       I18n.t('yes'),
//       I18n.t('no'),
//       I18n.t('yes'),
//       I18n.t('no'),
//     ],
//   },
//   {
//     title: I18n.t('custom'),
//     text_color_option: get_text_color_define(),
//     background_color_option: getColor(),
//     description: I18n.t('description_4'),
//     text_size: fonst_size_define,
//     repeat_option: repeat_option,
//     velocity: velocity,
//     data: [
//       '',
//       '',
//       '',
//       '',
//       '',
//       ''
//     ],
//   },
// ];

export const makeWheel = (dataWheel) => {
  const data = Array.from({ length: dataWheel.length }).fill(1);
  const arcs = d3Shape.pie()(data);

  return arcs.map((arc, index) => {
    const instance = d3Shape
      .arc()
      .padAngle(0.01)
      .outerRadius(width / 2)
      .innerRadius(20);

    return {
      path: instance(arc),
      value: dataWheel[index],
      centroid: instance.centroid(arc)
    };
  });
};
