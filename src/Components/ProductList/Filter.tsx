import type {Dispatch,SetStateAction} from "react";
import {View,Text,Pressable,Modal} from "react-native";
import Feather from "react-native-vector-icons/Feather";

interface props {
 rating: number;
 order: string;
 setRating: Dispatch<SetStateAction<number>>;
 setOrder: Dispatch<SetStateAction<string>>;
 handleClose: () => void;
};

const Filter = (props: props) => {
 const {order,rating,setOrder,setRating, handleClose} = props;

 return (
  <Modal transparent animationType='fade'>
   <View className='flex-1' style={{backgroundColor: "rgba(0,0,0,0.4)"}}>
	<Pressable className='flex-1' onPress={handleClose}></Pressable>
    <View
     className="rounded-tl-2xl rounded-tr-2xl bg-white p-4"
     style={{
      shadowColor: "#666",
      shadowOffset: {
       width: 0,
       height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
     }}
    >
     <View className="flex-row items-center justify-between">
      <Text className="font-inter/600 text-xl text-black/80">Filters</Text>
      <Feather name="x" size={28} color={"#888"} onPress={handleClose} />
     </View>
     <View className="mt-3 space-y-1">
      <Text className="font-inter/600 text-black/80">Ratings</Text>
      <View>
      {[4.5,4.0,3.0,2.0,1.0].map((rate, index) => (
       <View key={`${rate}-${index}`} className="my-1.5 flex-row items-center space-x-2">
        <Pressable
         className="border border-gray-400 rounded-full h-5 w-5 items-center justify-center"
         onPress={() => setRating(rate)}
        >
         {rating === rate && <Pressable className="h-3 w-3 rounded-full bg-blue-500">
         </Pressable>}
        </Pressable>
        <Text className="text-black/60 font-inter/500">{rate} & above</Text>
       </View>
      ))}
      </View>
     </View>
     <View className="mt-2 space-y-1">
      <Text className="font-inter/600 text-black/80">Price</Text>
      <View>
      {["Ascending","Descending"].map((item, index) => (
       <View key={`${item}-${index}`} className="my-1.5 flex-row items-center space-x-2">
        <Pressable
         className="border border-gray-400 rounded-full h-5 w-5 justify-center items-center"
         onPress={() => setOrder(item)}
        >
        {order === item && <Pressable className="w-3 h-3 bg-blue-500 rounded-full"></Pressable>}
        </Pressable>
        <Text className="text-black/60 font-inter/500">{item}</Text>
       </View>
       ))}
      </View>
     </View>
    </View>
   </View>
  </Modal>
 );
};

export default Filter;