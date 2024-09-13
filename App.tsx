import "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";
import Main from "./src/Navigation/Main";
import {Provider} from "react-redux";
import FontWrapper from "./src/Components/HOC/FontWrapper";
import {store} from "./src/lib/store";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function App() {
 return (
  <GestureHandlerRootView style={{flex:1}}>
   <Provider store={store}>
    <FontWrapper>
     <StatusBar backgroundColor='rgb(82, 137, 192)' style='light' />
     <Main />
    </FontWrapper>
   </Provider>
  </GestureHandlerRootView>
 );
};