import {useState,useEffect} from "react";
import {View,Text,TouchableOpacity,Image,ScrollView} from "react-native";
import NotAuth from "../Components/custom/NotAuth";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import {API} from "../lib/API";
import {useNavigation} from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import DrawerOpen from "../Components/custom/DrawerOpen";
import {addToHistory, changeQuantity, emptyBag, removeFromBag} from "../Redux/productSlice";
import {useAppDispatch, useAppSelector} from "../lib/redux";

const MyOrders = () => {
 const [totalPrice,setTotalPrice] = useState(0);
 const {myOrders} = useAppSelector(state => state.product);
 const {user} = useAppSelector(state => state.user);

 const dispatch = useAppDispatch();
 const navigation = useNavigation();

 const removeFromOrder = async (id: number) => {
  dispatch(removeFromBag((id)));
  await API.delete(`/product/removefromorder?id=${id}&del=true`);
 };

 useEffect(() => {
  let total = 0;
  for(let order of myOrders) {
   const price = order.quantity * order.price;
   total += price;
  };

  setTotalPrice(total);
 },[myOrders]);

 const changeProductQuantity = async (id: number,opt: "incr" | "decr") => {
  const data = {opt,id};

  try {
   if(opt === "incr") {
	dispatch(changeQuantity(data));
	await API.post("/product/addorder",{
	 productId: id,
	 incr: true,
	});
   };

   if(opt === "decr") {
	dispatch(changeQuantity(data));
	await API.post("/product/addorder",{
	 productId: id,
	 decr: true,
	});
   };
  } catch(error) {
   console.log(error);
  };
 };

 const checkout = async () => {
  try {
   const res = await API.post("/product/confirmorder",{userId: user.id});
   const data = await res.data;
   dispatch(addToHistory(myOrders));
   dispatch(emptyBag());
   setTotalPrice(0);
  } catch(error) {
   console.log(error);
  };
 };

 return (
  <View className='flex-1 bg-white pb-2'>
   <DrawerOpen />
   {!user ? <NotAuth /> : (myOrders.length < 1 ? <NotAuth title="Empty Bag" /> : <><ScrollView
	showsVerticalScrollIndicator={false}
	className='flex-1 bg-white'
   >
	{myOrders.map((item,index) => (
	<TouchableOpacity
	 activeOpacity={0.8}
	 key={`order-${index}`}
	 className={`flex-1 ${index % 2 && "border-l border-gray-100"} border-b border-gray-100 flex-row items-start`}
	>
	 <TouchableOpacity
	  className='p-2'
	  // @ts-ignore
	  onPress={() => navigation.navigate("SingleProduct",{id: item.id})}
	 >
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
	   <Text className='font-inter/600 text-[12px]'>
		{item.rating}
	   </Text>
	  </View>
	  <View className='my-2 flex-row items-center space-x-2'>
	   <Ionicons name='pricetag' size={20} color={"limegreen"} />
	   <Text className='font-inter/600 text-[12px]'>{item.price}</Text>
	  </View>
	  <View className='flex-row items-center space-x-2 py-2'>
	   <TouchableOpacity className='h-7 w-7 bg-black justify-center items-center'>
		<Entypo name='minus' size={24} color={"#fff"} 
		 onPress={() => changeProductQuantity(item.id,"decr")} />
	   </TouchableOpacity>
	   <Text>{item?.quantity}</Text>
	   <TouchableOpacity className='h-7 w-7 bg-black justify-center items-center'>
		<Entypo name='plus' size={22} color={"#fff"} 
		 onPress={() => changeProductQuantity(item.id,"incr")} 
		/>
	   </TouchableOpacity>
	  </View>
	  <View className='flex-row justify-end pt-2'>
	   <TouchableOpacity
		className='rounded-md bg-blue-500 p-2'
		onPress={() => removeFromOrder(item.id)}
	   >
		<Text className='font-inter/600 text-white'>
		 Remove From Orders
		</Text>
	   </TouchableOpacity>
	  </View>
   	 </View>
	</TouchableOpacity>
	))}
	</ScrollView>
	<View className='flex-row bg-white items-center w-full p-1 absolute bottom-1 space-x-2'>
	 <View>
	  <Text className='font-inter/400 text-sm'>Total</Text>
	  <Text className='font-inter/600 text-2xl'>{totalPrice}</Text>
	 </View>
	 <View className='flex-1'>
	  <TouchableOpacity className='bg-black p-3 rounded-md' onPress={checkout}>
	   <Text className='text-center text-white text-[16px] font-inter/700'>
	    Checkout
	   </Text>
	  </TouchableOpacity>
	 </View>
    </View>
   </>)}
  </View>
 );
};

export default MyOrders;