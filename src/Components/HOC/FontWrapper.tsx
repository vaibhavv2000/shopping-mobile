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
import {AppDispatch} from "../../Redux/store";
import {useDispatch} from "react-redux";
import {login,toggleDarkMode} from "../../Redux/Slices/authSlice";

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
   const user = await SecureStore.getItemAsync("shopping-user");
   const darkMode = await SecureStore.getItemAsync("shopping-darkmode");

   if(user) dispatch(login(JSON.parse(user)));
   if(darkMode) dispatch(toggleDarkMode("yes"));
  };

  checkAuth();
 }, []);

 if(!fontsLoaded) return <ActivityIndicator color={"purple"} />;

 return children;
};

export default FontWrapper;