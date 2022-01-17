import { FC } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../utils/constants";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { publicApi } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: FC<{ onAfterSignup: () => void }> = ({ onAfterSignup }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    // register user
    await publicApi.post("/api/v1/users", values);

    // login user
    const { data } = await publicApi.post("/api/v1/users/login", values);
    const { user, token } = data;

    // persist response (user, token)
    await AsyncStorage.setItem("instagram_clone_user", JSON.stringify(user));
    await AsyncStorage.setItem("instagram_clone_token", token);

    return onAfterSignup();
  };

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        rules={{
          required: "This is required",
          pattern: {
            value:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Invalid email format",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Feather name="mail" size={24} />
            <TextInput
              placeholder="Email address"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.input}
            />
          </View>
        )}
        name="email"
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <View style={{ padding: 5 }} />

      <Controller
        control={control}
        rules={{
          required: "This is required",
          minLength: {
            value: 4,
            message: "Password is too short",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Feather name="key" size={24} />
            <TextInput
              placeholder="Password (min 4 characters)"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.input}
              secureTextEntry
            />
          </View>
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <View style={{ padding: 5 }} />

      <Controller
        control={control}
        rules={{
          required: "This is required",
          validate: (value) => {
            return value === password || "Passwords do not match";
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Feather name="key" size={24} />
            <TextInput
              placeholder="Confirm password"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.input}
              secureTextEntry
            />
          </View>
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword.message}</Text>
      )}

      <View style={{ padding: 5 }} />
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text style={styles.button}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 16,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#929292",
  },
  input: {
    flex: 1,
    marginLeft: 5,
    fontFamily: "CocoSharpLRegular",
  },
  button: {
    backgroundColor: Colors.primary,
    color: "white",
    fontFamily: "CocoSharpLBold",
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
  },
  error: {
    color: "red",
  },
});
