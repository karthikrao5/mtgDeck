import {Dimensions, Platform} from "react-native";

export const IS_IOS = Platform.OS === 'ios';
export const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export const wp = (percentage) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};