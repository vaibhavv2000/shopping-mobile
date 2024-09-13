import {memo} from "react";
import {Image} from "react-native";
import {View, Text} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";
import type {product} from "../../utils/types";

interface props {
 title: string;
 bg: string;
 products: product[];
};

function List(props: props) {
 const {title, bg, products} = props;
 const navigation = useNavigation();

 return (
  <View className={bg}>
   <View className={`p-2`}>
	<Text className={`text-xl font-inter/600 pl-5 text-black ${bg && "/50"}`}>
	 {title}
	</Text>
	<View className='flex-wrap flex-row justify-center'>
	 {products.map((product) => (
	  <TouchableOpacity
	   key={`product-list-${product.id}`}
	   activeOpacity={0.8}
	   // @ts-ignore
	   onPress={() => navigation.navigate("Products",{type: product.type})}
	  >
	   <Image source={{uri: product.image}} className='h-40 w-40 m-1 rounded-md'/>
	  </TouchableOpacity>
	   )
      )}
    </View>
   </View>
  </View>
 );
};

export default memo(List);