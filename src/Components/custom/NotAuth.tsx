import {View,Text} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

interface props {
 title?: string
};

const NotAuth = ({title = "Not Logged In"}: props) => {
 return (
  <View className="flex-1 justify-center items-center">
   <FontAwesome5 name="shopping-bag" size={70} />
   <Text className="font-inter/500 text-2xl text-center my-3">
    {title}
   </Text>
  </View>
 );
};

export default NotAuth;