let lastTime;
import { BackHandler, Platform } from 'react-native';

function listenerExit(navigation){

    if (Platform.OS === 'android') {

      BackHandler.addEventListener('hardwareBackPress', function(){

        if (navigation.state.routeName == 'Home') {

            if (lastTime + 1000 >= Date.now()) {

              BackHandler.exitApp();
            } else {

                navigation.goBack();
                return true;
            }
            lastTime = Date.now();
        } else {
            navigation.goBack();
            return true;
        }
        return false;
      } );
    }
}

export default listenerExit;

