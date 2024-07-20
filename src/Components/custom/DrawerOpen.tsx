import {DrawerActions, useNavigation} from "@react-navigation/native";
import {Pressable, View} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";

const DrawerOpen = () => {
 const {dispatch} = useNavigation();
 const openDrawer = () => dispatch(DrawerActions.openDrawer());

 return (
  <View className="px-1 border-b border-gray-100 bg-white">
   <Pressable 
    android_ripple={{color: "#d5d5d5", borderless: true, foreground: true, radius: 24}} 
    className="h-12 w-12 justify-center items-center rounded-full"
    onPress={openDrawer}
   >
    <Octicons name="three-bars" size={24} color={"#666"} />	
   </Pressable>
  </View>
 );
};

export default DrawerOpen;