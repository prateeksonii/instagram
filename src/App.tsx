import { FC } from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./screens/LandingScreen";
import SignupScreen from "./screens/SignupScreen";

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
      </Navigator>
    </NavigationContainer>
  );
};

export default registerRootComponent(App);
