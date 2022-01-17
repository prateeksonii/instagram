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
import SignupForm from "../components/SignupForm";
import { RootStackParamList } from "../types";
import { Colors } from "../utils/constants";

const SignupScreen: FC<
  NativeStackScreenProps<RootStackParamList, "Signup">
> = ({ navigation }) => {
  const [loaded] = useFonts({
    CocoSharpLBold: require("../assets/fonts/CocoSharpL-Bold.otf"),
    CocoSharpLRegular: require("../assets/fonts/CocoSharpL-Regular.otf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  const onAfterSignup = () => {
    navigation.navigate("CreateProfile");
  };

  return (
    <ImageBackground
      source={require("../assets/pattern.png")}
      style={styles.container}
      imageStyle={styles.bg}
    >
      <View style={styles.header}>
        <Text style={styles.headingText}>Create better together.</Text>
        <Text style={styles.leadText}>Join our community</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={{ flexGrow: 1 }}>
          <View style={styles.main}>
            <Text style={styles.signupText}>Sign up now</Text>
            <SignupForm onAfterSignup={onAfterSignup} />
            <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
              <Text style={styles.footText}>
                Already registered?{" "}
                <Text style={styles.signinLink}>Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignupScreen;

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
  signupText: {
    fontFamily: "CocoSharpLBold",
    fontSize: 24,
  },
  footText: {
    marginTop: 20,
    fontFamily: "CocoSharpLRegular",
  },
  signinLink: {
    color: Colors.primary,
    fontFamily: "CocoSharpLBold",
  },
});
