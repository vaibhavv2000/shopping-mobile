import {useRoute} from "@react-navigation/native";
import {View,Text,Image,useWindowDimensions} from "react-native";
import {useState,useEffect} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import {TouchableOpacity} from "react-native";
import Feather from "react-native-vector-icons/Feather"
import {API} from "../lib/API";
import type {product} from "../utils/types";
import {useAppDispatch, useAppSelector} from "../lib/redux";
import {toggleAuthModal} from "../Redux/userSlice";
import {addToBag, addToWishlist, removeFromBag, removeFromWishlist} from "../Redux/productSlice";

const SingleProduct = () => {
 const [product,setProduct] = useState<product>();
 const [isWished,setIsWished] = useState<boolean>(false);
 const [isInCart,setIsInCart] = useState<boolean>(false);

 const {id} = useRoute().params as {id: number};
 const {width} = useWindowDimensions();

 const {products, wishlist, myOrders} = useAppSelector(state => state.product);
 const {user} = useAppSelector(state => state.user);

 const dispatch = useAppDispatch();

 useEffect(() => {
  setProduct(products.find(product => String(product.id) === String(id)));
 }, [products,id]);

 useEffect(() => {
  setIsWished(wishlist.some(product => String(product.id) === String(id)));
 }, [wishlist,id]);

 useEffect(() => {
  setIsInCart(myOrders.some(product => String(product.id) === String(id)));
 }, [myOrders, id]);

 const addToCart = async (option: boolean) => {
   if(!user.email) return dispatch(toggleAuthModal());
   setIsInCart(option);
   dispatch(option ? addToBag({...product, quantity: 1}) : removeFromBag(product?.id));
 
   if(option) await API.post(`/product/addorder`, {productId: id});
   else await API.delete(`/product/removefromorder?id=${id}&del=true`);
 };

 const updateWishlist = async (option: boolean) => {
  if(!user.email) return dispatch(toggleAuthModal());
  setIsWished(option);
  dispatch(option ? addToWishlist(product) : removeFromWishlist(product?.id));
  await API.put(`/product/updatewishlist?id=${product?.id}&${option && "add=true"}`);
 };

 return (
  <View className='flex-1 bg-white py-5'>
   <View style={{height: width}} className='p-5'>
	<Image source={{uri: product?.image}} className='h-full w-full' resizeMode='cover' />
   </View>
   <View className='p-2'>
	<View className='flex-row items-center justify-between pr-5'>
 	 <Text className='text-xl font-inter/700'>
	  {product?.title}
 	 </Text>
	 {isWished ? <Ionicons 
     name='heart' 
     size={25} 
     color={"red"} 
     onPress={() => updateWishlist(false)} 
    /> : <EvilIcons 
    name='heart' 
    size={32} 
    color={"#777"} 
    onPress={() => updateWishlist(true)}
    />}
	</View>
	<View className='mt-1 flex-row items-center space-x-2'>
	 <Fontisto name='star' color={"#FFA900"} size={18} />
	 <Text className='font-inter/400'>{product?.rating}</Text>
	</View>
	<View className='my-2 flex-row items-center space-x-2'>
	 <Ionicons name='pricetag' size={20} color={"limegreen"} />
	 <Text className='font-inter/400'>{product?.price}</Text>
	</View>
	<Text className='font-inter/500 text-black/60'>
	 {product?.description}
    </Text>
   </View>
   <View className='absolute bottom-2 left-0 w-full'>
	<TouchableOpacity
	 className='bg-black w-[90%] mx-auto rounded-md flex-row items-center p-3.5 justify-center space-x-4'
	 activeOpacity={0.8}
    onPress={() => addToCart(!isInCart)}
	>
	 <Feather name='shopping-bag' size={20} color={"#fff"} />
	 <Text className='font-inter/600 text-white'>
	  {isInCart ? "Remove From Bag" : "Add To Bag"}
	 </Text>
	</TouchableOpacity>
   </View>
  </View>
 );
};

export default SingleProduct;