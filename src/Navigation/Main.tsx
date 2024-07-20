import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import Home from "./Home";
import Products from "./Products";
import SingleProduct from "../Screens/SingleProduct";
import Auth from "../Components/custom/Auth";

const {Navigator, Screen} = createNativeStackNavigator();

const client = new QueryClient();

const Main = (): JSX.Element => {
 return (
  <QueryClientProvider client={client}>
   <NavigationContainer>
    <Navigator screenOptions={{headerShown: false}}>
     <Screen name='Home' component={Home} />
     <Screen name='Products' component={Products} />
     <Screen name='SingleProduct' component={SingleProduct} />
    </Navigator>
   </NavigationContainer> 
   <Auth />
  </QueryClientProvider>
 );
};

export default Main;