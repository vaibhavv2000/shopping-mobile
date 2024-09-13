import {useEffect,useState} from "react";
import {View,Text,ScrollView} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {DrawerActions,useNavigation} from "@react-navigation/native";
import List from "../Components/Feed/List";
import SlideImages from "../Components/Feed/SlideImages";
import type {product} from "../utils/types";
import {useAppSelector} from "../lib/redux";

const Feed = () => {
 const [randomProducts,setRandomProducts] = useState<product[]>([]);
 const [watches,setWatches] = useState<product[]>([]);
 const [mobiles,setMobiles] = useState<product[]>([]);
 const [clothes,setClothes] = useState<product[]>([]);

 const navigation = useNavigation()
 const {products} = useAppSelector(state => state.product);

 useEffect(() => {
  setRandomProducts([...products].sort(() => Math.random() - 0.5).slice(0,4));
 }, [products]);

 useEffect(() => {
  const pro = (type: "watch" | "clothes" | "mobile") => {
   return products.filter((item) => item.type === type).sort(() => Math.random() - 0.5).slice(0,4);
  };

  const watches = pro("watch");
  const clothes = pro("clothes");
  const mobilesData = pro("mobile");

  if(mobiles.length < 1) {
   setWatches(watches);
   setClothes(clothes);
   setMobiles(mobilesData);
  };
 }, [products]);

 const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

 return (
  <View className='bg-white flex-1'>
   <ScrollView showsVerticalScrollIndicator={false}>
	<View
	 className='bg-primary dark:bg-black p-2 py-3 flex-row justify-between'
	 style={{backgroundColor: "rgb(82, 137, 192)"}}
	>
	 <View className='flex-row items-center space-x-2 px-1'>
	  <Octicons
	   name='three-bars'
	   size={24}
	   color={"#fff"}
	   onPress={openDrawer}
	  />
	  <Text className='text-white font-inter/700 text-xl'>
	   ShoppingCart
 	  </Text>
     </View>
	 <FontAwesome5
	  name='shopping-cart'
	  color={"#fff"}
	  size={22}
	  // @ts-ignore
	  onPress={() => navigation.navigate("Home",{screen: "Orders"})}
	 />
	</View>
	<SlideImages />
	<List
	 title='Recommended For you'
	 bg='bg-green-200'
	 products={[...randomProducts]}
	/>
	<List
	 title='Brand New Watches'
	 bg='bg-red-200'
	 products={watches}
	/>
	<List
	 title='Clothes For you'
	 bg='bg-white'
	 products={clothes}
	/>
	<List
	 title='Mobiles & Accessories'
	 bg='bg-yellow-200'
	 products={mobiles}
	/>
   </ScrollView>
  </View>
 );
};

export default Feed;