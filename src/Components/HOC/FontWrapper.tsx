import {
 useFonts,
 Inter_100Thin,
 Inter_200ExtraLight,
 Inter_300Light,
 Inter_400Regular,
 Inter_500Medium,
 Inter_600SemiBold,
 Inter_700Bold,
 Inter_800ExtraBold,
 Inter_900Black,
} from "@expo-google-fonts/inter";
import {ReactNode,useEffect} from "react";
import {ActivityIndicator} from "react-native";
import * as SecureStore from "expo-secure-store";
import {AppDispatch} from "../../lib/store";
import {useDispatch} from "react-redux";
import {login} from "../../Redux/userSlice";
import {API} from "../../lib/API";

const FontWrapper = ({children}: {children: ReactNode}) => {
 let [fontsLoaded] = useFonts({
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
 });

 const dispatch: AppDispatch = useDispatch();

 useEffect(() => {
  async function checkAuth() {
   try {
    const token = await SecureStore.getItemAsync("shopping-token");
    if(!token) return;
    
    const res = await API.get(`/auth/checkauth`);
    dispatch(login(res.data));
   } catch (error) {
    SecureStore.deleteItemAsync("shopping-token");
   };
  };

  checkAuth();
 }, []);

 if(!fontsLoaded) return <ActivityIndicator color={"purple"} />;

 return children;
};

export default FontWrapper;