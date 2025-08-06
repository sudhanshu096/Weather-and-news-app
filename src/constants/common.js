import { Dimensions } from "react-native";

const {height:deviceHeight, width:deviceWidth} = Dimensions.get('window');

export const apiKey = 'c89bb6b97b0240ea97d52335251206'
export const newsApiKey ='6c50c3274ce74ade81daa1ac0e395b08'


export const hp = percentage =>{
  return (percentage *deviceHeight)/100;
}

export const wp = percentage =>{
    return (percentage *deviceWidth)/100;
  }


  export const weatherImages = {
    'Partly cloudy':require('../assets/images/partlycloudy.png'),
    'Partly Cloudy':require('../assets/images/partlycloudy.png'),
    'Moderate rain':require('../assets/images/moderaterain.png'),
    'Patchy rain nearby':require('../assets/images/moderaterain.png'),
    'Sunny':require('../assets/images/sun.png'),
    'Clear':require('../assets/images/sun.png'),
    'Overcast':require('../assets/images/cloud.png'),
    'Cloudy':require('../assets/images/cloud.png'),
    'Light rain':require('../assets/images/moderaterain.png'),
    'Moderate rain at times':require('../assets/images/moderaterain.png'),
    'Heavy rain':require('../assets/images/heavyrain.png'),
    'Heavy rain at times':require('../assets/images/heavyrain.png'),
    'Moderate or heavy freezing rain':require('../assets/images/heavyrain.png'),
    'Moderate or heavy rain shower':require('../assets/images/heavyrain.png'),
    'Moderate or heavy rain with thunder':require('../assets/images/heavyrain.png'),
    'other':require('../assets/images/moderaterain.png'),

  }