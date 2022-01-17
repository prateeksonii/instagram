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
import CreateProfileForm from "../components/CreateProfileForm";
import { RootStackParamList } from "../types";
import { Colors } from "../utils/constants";

const CreateProfileScreen: FC<
  NativeStackScreenProps<RootStackParamList, "Signup">
> = ({ navigation }) => {
  const [loaded] = useFonts({
    CocoSharpLBold: require("../assets/fonts/CocoSharpL-Bold.otf"),
    CocoSharpLRegular: require("../assets/fonts/CocoSharpL-Regular.otf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  const onAfterCreateProfile = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <ImageBackground
      source={require("../assets/pattern.png")}
      style={styles.container}
      imageStyle={styles.bg}
    >
      <View style={styles.header}>
        <Text style={styles.headingText}>We just need few more details</Text>
        <Text style={styles.leadText}>Join our community</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={{ flexGrow: 1 }}>
          <View style={styles.main}>
            <Text style={styles.signupText}>Complete your profile</Text>
            <CreateProfileForm onAfterCreateProfile={onAfterCreateProfile} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};

export default CreateProfileScreen;

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
