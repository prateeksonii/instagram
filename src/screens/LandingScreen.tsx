import { FC, useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { privateApi } from "../services/api";

const LandingScreen: FC<
  NativeStackScreenProps<RootStackParamList, "Landing">
> = ({ navigation }) => {
  const [loadedState, setLoadedState] = useState(false);

  const [loadedFonts] = useFonts({
    CocoSharpLBold: require("../assets/fonts/CocoSharpL-Bold.otf"),
    CocoSharpLRegular: require("../assets/fonts/CocoSharpL-Regular.otf"),
  });

  useEffect(() => {
    const initApp = async () => {
      const token = await AsyncStorage.getItem("instagram_clone_token");
      if (!token) {
        return setLoadedState(true);
      }

      await privateApi
        .post("/api/v1/users/me")
        .catch((err) => setLoadedState(true));

      navigation.navigate("Dashboard");
    };

    initApp();
  }, []);

  if (!loadedFonts || !loadedState) {
    return <AppLoading />;
  }

  return (
    <ImageBackground source={require("../assets/bg.jpg")} style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.heading}>Instagram</Text>
        <Text style={styles.lead}>Live experiences to the fullest</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Feather
            style={styles.start}
            name="arrow-right-circle"
            size={48}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000080",
  },
  heading: {
    fontFamily: "CocoSharpLBold",
    fontSize: 36,
    color: "white",
  },
  lead: {
    fontFamily: "CocoSharpLRegular",
    color: "white",
    fontSize: 14,
  },
  start: {
    marginTop: 32,
  },
});
