import {View,Text,TouchableOpacity,Image} from "react-native";
import NotAuth from "../Components/custom/NotAuth";
import {ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import DrawerOpen from "../Components/custom/DrawerOpen";
import {useAppSelector} from "../lib/redux";

const OrderHistory = () => {
 const {orderHistory} = useAppSelector(state => state.product);
 const {user} = useAppSelector(state => state.user);

 const navigation = useNavigation();

 return (
  <View className='flex-1 bg-white'>
   <DrawerOpen />
   {!user ? <NotAuth /> : (orderHistory.length < 1 ? <NotAuth title="No previous orders" /> : <>
   <ScrollView
	showsVerticalScrollIndicator={false}
	className='flex-1 bg-white'>
	{orderHistory.map((item,index) => (
	<TouchableOpacity key={`order-${index}`} activeOpacity={0.8}
	 // @ts-ignore
	 onPress={() => navigation.navigate("SingleProduct",{id: item.id})}
	 className={`flex-1 ${index % 2 && "border-l border-gray-100"} border-b border-gray-100 flex-row items-start`}
	>
	 <TouchableOpacity className='p-2'>
	  <Image
	   source={{uri: item.image}}
	   className='h-40 w-32 rounded-md'
	   resizeMode='contain'
	  />
	 </TouchableOpacity>
	 <View className='py-1 flex-1 pr-2'>
	  <View className='items-center justify-between flex-row'>
	   <Text className='font-inter/600'>{item.title}</Text>
	  </View>
	  <Text className='font-inter/400 text-black/60'>
	   {item.description.slice(0,50)}...
	  </Text>
	  <View className='mt-1 flex-row items-center space-x-2'>
	   <Fontisto name='star' color={"#9b77f0"} size={18} />
	   <Text className='font-inter/600 text-[12px]'>{item.rating}</Text>
	  </View>
	  <View className='my-2 flex-row items-center space-x-2'>
	   <Ionicons name='pricetag' size={20} color={"limegreen"} />
	   <Text className='font-inter/600 text-[12px]'>{item.price}</Text>
	  </View>
	  <View className='flex-row items-center space-x-2 py-2'>
	   <Text className='font-inter/500 text-black/60'>Quantity:</Text>
	   <Text className='font-inter/600'>{item.quantity}</Text>
	  </View>
	 </View>
	</TouchableOpacity>
	))}
   </ScrollView>
   </>)}
  </View>
 );
};

export default OrderHistory;