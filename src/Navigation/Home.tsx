import {createDrawerNavigator} from "@react-navigation/drawer";
import Feed from "../Screens/Feed";
import MyOrder from "../Screens/MyOrder";
import CustomDrawer from "../Components/custom/CustomDrawer";
import {SafeAreaView} from "react-native-safe-area-context";
import {useQuery} from "@tanstack/react-query";
import {API} from "../lib/API";
import {useEffect} from "react";
import {addDetails, addProducts} from "../Redux/productSlice";
import WishList from "../Screens/WishList";
import OrderHistory from "../Screens/OrderHistory";
import {useAppDispatch, useAppSelector} from "../lib/redux";

const Drawer = createDrawerNavigator();

const Home = () => {
 const {user} = useAppSelector(state => state.user);
 const {products} = useAppSelector(state => state.product);
 const dispatch = useAppDispatch();

 const {refetch, data,} = useQuery({
  queryKey: ["products"],
  queryFn: async () => {
   const res = await API.get("/product/fetchproducts");
   return res.data;
  },
  enabled: false,
 });

 const {refetch: fetchUserData, data: userData} = useQuery({
  queryKey: ["userdata"],
  queryFn: async () => {
   const res = await API.get(`/product/getuserdata?id=${user.id}`);
   return res.data;
  },
  enabled: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
 });

 useEffect(() => {
  if(!data && !products.length) refetch();
 }, [products]);

 useEffect(() => {
  if(!products.length && data) dispatch(addProducts(data));  
 }, [data]);

 useEffect(() => {
  if(!user.email) fetchUserData();
 }, [user]);

 useEffect(() => {
  if(userData && user.email) dispatch(addDetails(userData))
 }, [userData, user]);

 return (
  <SafeAreaView style={{flex: 1}}>
   <Drawer.Navigator
	 drawerContent={(props) => <CustomDrawer {...props} />}
	 screenOptions={{ headerShown: false, drawerStyle: { width: "80%",}}}
   >
	<Drawer.Screen name='Feed' component={Feed} />
	<Drawer.Screen name='Wishlist' component={WishList} />
	<Drawer.Screen name='OrderHistory' component={OrderHistory} />
	<Drawer.Screen name='Orders' component={MyOrder} />
   </Drawer.Navigator>
  </SafeAreaView>
 );
};

export default Home;