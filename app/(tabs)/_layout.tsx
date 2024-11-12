import FullScreenWebView from "./index";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const TabLayout = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WebView" component={FullScreenWebView} />
    </Stack.Navigator>
  );
};

export default TabLayout;
