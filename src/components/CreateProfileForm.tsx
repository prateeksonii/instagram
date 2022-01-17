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
import { privateApi } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FormValues {
  name: string;
  username: string;
  bio?: string;
}

const CreateProfileForm: FC<{ onAfterCreateProfile: () => void }> = ({
  onAfterCreateProfile,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      bio: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log(values);
    try {
      // create profile
      const res = await privateApi.post("/api/v1/profiles", values);
      console.log(res);

      return onAfterCreateProfile();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        rules={{
          required: "This is required",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Feather name="user" size={24} />
            <TextInput
              placeholder="Full name"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.input}
            />
          </View>
        )}
        name="name"
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <View style={{ padding: 5 }} />

      <Controller
        control={control}
        rules={{
          required: "This is required",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Feather name="key" size={24} />
            <TextInput
              placeholder="Username"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.input}
            />
          </View>
        )}
        name="username"
      />
      {errors.username && (
        <Text style={styles.error}>{errors.username.message}</Text>
      )}

      <View style={{ padding: 5 }} />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Feather name="book" size={24} />
            <TextInput
              placeholder="Bio"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.input}
            />
          </View>
        )}
        name="bio"
      />
      {errors.bio && <Text style={styles.error}>{errors.bio.message}</Text>}

      <View style={{ padding: 5 }} />
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text style={styles.button}>Create profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateProfileForm;

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
