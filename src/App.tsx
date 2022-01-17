import { FC } from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./screens/LandingScreen";
import SignupScreen from "./screens/SignupScreen";
import CreateProfileScreen from "./screens/CreateProfileScreen";
import SigninScreen from "./screens/SigninScreen";
import DashboardScreen from "./screens/DashboardScreen";

const App: FC = () => {
  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Landing"
        screenOptions={{ headerShown: false }}
      >
        <Screen name="Landing" component={LandingScreen} />
        <Screen name="Signup" component={SignupScreen} />
        <Screen name="CreateProfile" component={CreateProfileScreen} />
        <Screen name="Signin" component={SigninScreen} />
        <Screen name="Dashboard" component={DashboardScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default registerRootComponent(App);
