import {View,Text,ImageBackground,ScrollView} from "react-native";
import NotAuth from "../Components/custom/NotAuth";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import {API} from "../lib/API";
import {useNavigation} from "@react-navigation/native";
import DrawerOpen from "../Components/custom/DrawerOpen";
import {useAppDispatch, useAppSelector} from "../lib/redux";
import {removeFromWishlist} from "../Redux/productSlice";

const WishList = () => {
 const {wishlist} = useAppSelector(state => state.product);
 const {user} = useAppSelector(state => state.user);
 const navigation = useNavigation();

 const dispatch = useAppDispatch();

 const removeFromWish = async (id: number) => {
  await API.put(`/product/updatewishlist?id=${id}`);
  dispatch(removeFromWishlist((id)));
 };

 return (
  <View className="flex-1 bg-white">
   <DrawerOpen />
   {!user ? <NotAuth /> : (wishlist.length < 1 ? <NotAuth title="Empty List" /> : <>
   <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-white">
   <View className="flex-1 bg-white flex-row flex-wrap p-2">
    {wishlist.map((product,index) => ( 
    <View key={`wish-${index}`}
     className={`w-[50%] border-b-0.5 border-gray-200 ${index % 2 === 0 && "border-r-0.5 border-gray-200"}`}
    >
     <ImageBackground
      source={{uri: product.image}}
      className="w-full h-32 p-2 items-end mt-2"
      resizeMode="contain"
     >
      <Ionicons name="heart" size={25} color={"red"} onPress={() => removeFromWish(product.id)} />
     </ImageBackground>
     <View className="p-2">
      <Text className="font-inter/600 text-[16px] text-black/90"
       // @ts-ignore
       onPress={() => navigation.navigate("SingleProduct", {id: product.id})}
      >
       {product.title}...
      </Text>
      <View className="mt-1 flex-row items-center space-x-2">
       <Text className='font-inter/400 text-black/60'>
  	   {product.description.slice(0,50)}...
	   </Text>
      </View>
      <View className="mt-1 flex-row items-center space-x-2">
       <Fontisto name="star" color={"#FFA900"} size={18} />
       <Text className="font-inter/500 text-[12px]">{product.rating}</Text>
      </View>
      <View className="my-2 flex-row items-center space-x-2">
       <Ionicons name="pricetag" size={20} color={"limegreen"} />
       <Text className="font-inter/500 text-[12px]">{product.price}</Text>
      </View>
     </View>
    </View>
    ))}
   </View>
  </ScrollView>
  </>)}  
  </View>
 );
};

export default WishList;