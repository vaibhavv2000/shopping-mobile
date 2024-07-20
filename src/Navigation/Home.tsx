import {createDrawerNavigator} from "@react-navigation/drawer";
import Feed from "../Screens/Feed";
import MyOrder from "../Screens/MyOrder";
import CustomDrawer from "../Components/custom/CustomDrawer";
import {SafeAreaView} from "react-native-safe-area-context";
import {useQuery} from "@tanstack/react-query";
import {API} from "../utils/API";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../Redux/store";
import {addProducts} from "../Redux/Slices/productSlice";
import {addDetails, setDataFetched} from "../Redux/Slices/userSlice";
import WishList from "../Screens/WishList";
import OrderHistory from "../Screens/OrderHistory";

const Drawer = createDrawerNavigator();

const Home = () => {
 const {user, isAuth} = useSelector((state: RootState) => state.auth);
 const {products} = useSelector((state: RootState) => state.product);
 const {isDataFetched} = useSelector((state: RootState) => state.user);
 const dispatch: AppDispatch = useDispatch();

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
  if(!products.length) refetch();
 }, [products]);

 useEffect(() => {
  if(!isDataFetched && isAuth) fetchUserData();
 }, [isDataFetched, isAuth]);
 
 useEffect(() => {
  if(data) dispatch(addProducts(data));
 }, [data]);
 
 useEffect(() => {
  if(!isDataFetched && userData && isAuth) {
   const order_history = userData?.historylist;
   const wishlist = userData?.wishlist;
   const my_orders = userData?.orderlist;
   dispatch(addDetails({order_history, wishlist, my_orders}));
   dispatch(setDataFetched());
  };
 }, [userData, isDataFetched, isAuth]);

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