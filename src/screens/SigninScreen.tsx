import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { FC } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SigninForm from "../components/SigninForm";
import { RootStackParamList } from "../types";
import { Colors } from "../utils/constants";

const SigninScreen: FC<
  NativeStackScreenProps<RootStackParamList, "Signin">
> = ({ navigation }) => {
  const [loaded] = useFonts({
    CocoSharpLBold: require("../assets/fonts/CocoSharpL-Bold.otf"),
    CocoSharpLRegular: require("../assets/fonts/CocoSharpL-Regular.otf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  const onAfterSignin = (hasProfile: boolean) => {
    navigation.navigate(hasProfile ? "Dashboard" : "CreateProfile");
  };

  return (
    <ImageBackground
      source={require("../assets/pattern.png")}
      style={styles.container}
      imageStyle={styles.bg}
    >
      <View style={styles.header}>
        <Text style={styles.headingText}>Welcome back</Text>
        <Text style={styles.leadText}>Continue your journey</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={{ flexGrow: 1 }}>
          <View style={styles.main}>
            <Text style={styles.signinText}>Sign in now</Text>
            <SigninForm onAfterSignin={onAfterSignin} />
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.footText}>
                Not registered? <Text style={styles.signupLink}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  bg: {
    resizeMode: "repeat",
  },
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    padding: 36,
    justifyContent: "center",
  },
  main: {
    height: "100%",
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 36,
  },
  headingText: {
    fontFamily: "CocoSharpLBold",
    fontSize: 36,
  },
  leadText: {
    fontFamily: "CocoSharpLRegular",
    marginTop: 16,
    fontSize: 20,
  },
  signinText: {
    fontFamily: "CocoSharpLBold",
    fontSize: 24,
  },
  footText: {
    marginTop: 20,
    fontFamily: "CocoSharpLRegular",
  },
  signupLink: {
    color: Colors.primary,
    fontFamily: "CocoSharpLBold",
  },
});
