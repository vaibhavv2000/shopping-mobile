import {useEffect,useState} from "react";
import {
 Pressable,
 TextInput,
 TouchableOpacity,
 ToastAndroid,
 ActivityIndicator,
} from "react-native";
import {View,Text,Modal} from "react-native";
import PagerView from "react-native-pager-view";
import Feather from "react-native-vector-icons/Feather";
import {API} from "../../lib/API";
import {login as loginUser, toggleAuthModal} from "../../Redux/userSlice"
import * as SecureStore from "expo-secure-store";
import {useAppDispatch, useAppSelector} from "../../lib/redux";
import {validateEmail} from "../../utils/emailValidator";

let input = "p-3 border border-gray-300 w-full font-inter/400 rounded-sm";

const Auth = () => {
 const [currentPage,setCurrentPage] = useState<number>(0);
 const [register,setRegister] = useState({
  name: "",
  email: "",
  password: "",
 });
 const [login,setLogin] = useState({
  email: "",
  password: "",
 });
 const [loginError,setLoginError] = useState<string>("");
 const [registerError,setRegisterError] = useState<string>("");
 const [loading,setLoading] = useState(false);
 const [showLoginPwd, setShowLoginPwd] = useState(false);
 const [showRegisterPwd, setShowRegisterPwd] = useState(false);

 const {showAuthModal} = useAppSelector(state => state.user);
 const dispatch = useAppDispatch();

 useEffect(() => {
  if(loginError) setTimeout(() => setLoginError(""),5000);
  if(registerError) setTimeout(() => setRegisterError(""),5000);
 }, [loginError,registerError]);

 const handleSubmit = async () => {
  if(loading) return;
  setLoading(true);

  try {
   if(currentPage === 1) {
	const {email,name,password} = register;

	if(!name || !email || !password) return setRegisterError("All fields are necessary");
	if(name.length < 3) return setRegisterError("Name should have atleast 3 characters");
	if(!validateEmail(email)) return setRegisterError("Invalid Email");
	if(password.length < 8) return setRegisterError("Password must  be atleast 8 characters");
	if(password.includes(" ")) return setRegisterError("Password should not include spaces");

	const res = await API.post(`/auth/register`,register);
	await SecureStore.setItemAsync("shopping-token", res.data.token);
	dispatch(loginUser(res.data.user));
    ToastAndroid.show("Registered Successfully",ToastAndroid.LONG);
	dispatch(toggleAuthModal());
   } else {
	const {email,password} = login;

	if(!email || !password) return setLoginError("All fields are necessary");
	if(!validateEmail(email)) return setLoginError("Invalid Email");
	if(password.length < 8) return setLoginError("Password must  be atleast 8 characters");
	if(password.includes(" ")) return setLoginError("Password should not include spaces");

	const res = await API.post(`/auth/login`,login);
	await SecureStore.setItemAsync("shopping-token", res.data.token);

	dispatch(loginUser(res.data.user));
	ToastAndroid.show("Logged In Successfully",ToastAndroid.LONG);
	dispatch(toggleAuthModal());
   };
  } catch(error: any) {
   const message = error?.response?.data?.message || error?.message;	
   if(currentPage === 1) setRegisterError(message);
   else setLoginError(message);
  } finally {
   setLoading(false);
  };
 };

 const handleLogin = (val: string, type: string) => {
  setLogin((prev) => ({...prev,[type]: val}));
 };

 const handleRegister = (val: string, type: string) => {
  setRegister((prev) => ({...prev,[type]: val}));
 };

 return (
  <Modal visible={showAuthModal} transparent animationType='slide'>
   <View className='flex-1' style={{backgroundColor: "rgba(0,0,0,0.1)"}}>
	<Pressable className='flex-1' onPress={() => dispatch(toggleAuthModal())}></Pressable>
	<View className='bg-white dark:bg-black rounded-tr-[30px] rounded-tl-[30px] p-2'>
 	 <View className='flex-row py-4'>
	  <Text className='font-inter/600 text-lg pl-6 flex-1 text-black/70'>
	   Please SignIn first
	  </Text>
	 <Feather name='x' size={28} color={"#777"} onPress={() => dispatch(toggleAuthModal())} />
	</View>
	<View className='flex-row items-center relative'>
	<Text className={`flex-1 p-4 text-center font-inter/600 ${currentPage === 0 && "bg-gray-50"}`}>
	 Login
	</Text>
	<Text className={`flex-1 p-4 text-center font-inter/600 ${currentPage === 1 && "bg-gray-50"}`}>
     Sign Up
	</Text>
	<View className={`absolute w-[50%] bottom-0 h-0.5`}
	 style={{backgroundColor: "rgb(82, 137, 192)",left: currentPage === 0 ? "0%" : "50%",}}>
	</View>
   </View>
   <PagerView
	className='h-80'
	initialPage={0}
	onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}>
    <View key='1'>
	 <View className='w-[90%] mx-auto p-2 space-y-3 justify-center flex-1'>
	 <TextInput
	  className={input}
	  cursorColor={"#999"}
	  placeholder='Email'
	  autoCapitalize="none"
	  onChangeText={(text) => handleLogin(text,"email")}
	 />
	 <View className="relative">
	  <TextInput
	   className={input}
	   cursorColor={"#999"}
	   placeholder='Passsword'
	   autoCapitalize="none"
	   onChangeText={(text) => handleLogin(text,"password")}
	   secureTextEntry={showLoginPwd}
	  />
	  <Pressable 
	   className="h-full w-12 right-0 top-0 absolute justify-center items-center"
	   onPress={() => setShowLoginPwd(prev => !prev)}
	  >
	   {showLoginPwd ? <Feather name="eye" size={20} color={"#999"} /> : <Feather name="eye-off" size={20} color={"#999"} />}
	  </Pressable>
	 </View>
	 {loginError && <Text className='font-inter/500 text-red-500'>{loginError}</Text>}
 	 <TouchableOpacity
 	  className='p-4 rounded-md shadow-lg flex-row justify-center space-x-2'
	  style={{backgroundColor: "rgb(82, 137, 192)"}}
	  onPress={handleSubmit}
	 >
	  {!loading && <Text className='text-center text-white font-inter/600'>Login</Text>}
	  {loading && <ActivityIndicator size={"small"} color={"#fff"} />}
	 </TouchableOpacity>
     </View>
 	</View>
	<View key='2'>
	 <View className='w-[90%] mx-auto p-2 space-y-3 justify-center flex-1'>
	  <TextInput
	   className={input}
	   cursorColor={"#999"}
	   autoCapitalize="none"
	   placeholder='Name'
	   onChangeText={(text) => handleRegister(text,"name")}
	  />
	  <TextInput
	   className={input}
	   cursorColor={"#999"}
	   autoCapitalize="none"
	   placeholder='Email'
	   onChangeText={(text) => handleRegister(text,"email")}
	  />
	  <View className="relative">
	   <TextInput
	    className={input}
	    cursorColor={"#999"}
	    placeholder='Password'
	    autoCapitalize="none"
	    onChangeText={(text) => handleRegister(text,"password")}
	    secureTextEntry={showRegisterPwd}
	   />
	  <Pressable 
	   className="h-full w-12 right-0 top-0 absolute justify-center items-center"
	   onPress={() => setShowRegisterPwd(prev => !prev)}
	  >
	   {showRegisterPwd ? <Feather name="eye" size={20} color={"#999"} /> : <Feather name="eye-off" size={20} color={"#999"} />}
	  </Pressable>
	  </View>
	  {registerError && <Text className='font-inter/500 text-red-500'>{registerError}</Text>}
	  <TouchableOpacity
 	   className='p-4 rounded-md shadow-lg'
	   style={{backgroundColor: "rgb(82, 137, 192)"}}
	   onPress={handleSubmit}
	  > 
	   {!loading && <Text className='text-center text-white font-inter/600'>Sign Up</Text>}
	   {loading && <ActivityIndicator size={"small"} color={"#fff"} />}
	  </TouchableOpacity>
	 </View>
	</View>
   </PagerView>
  </View>
  </View>
  </Modal>
 );
};

export default Auth;